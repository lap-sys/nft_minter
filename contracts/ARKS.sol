// SPDX-License-Identifier: GPL-3.0

// Amended by HashLips
/**
    !Disclaimer!
    These contracts have been used to create tutorials,
    and was created for the purpose to teach people
    how to create smart contracts on the blockchain.
    please review this code on your own before using any of
    the following code for production.
    HashLips will not be liable in any way if for the use
    of the code. That being said, the code has been tested
    to the best of the developers' knowledge to work as intended.
*/
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract ARKS369 is ERC721Enumerable, Ownable, VRFConsumerBase {
  using Strings for uint256;

  string baseURI;
  string public baseExtension = ".json";

  // uint256 public cost = 169 ether;
  // uint256 public maxSupply = 9963;
  uint256 public cost = 1 ether;
  uint256 public maxSupply = 36;

  uint256 public maxMintAmount = 6;
  uint256 public headStart = block.timestamp + 9 days;
  bool public paused = false;

 
  uint256 permillGiftMintONG = 13;
  uint256 percGiftMint = 6;
  uint256 percGiftEnd = 3;
  uint256 nbEndReward = 3;
  
  address payable giftAddressONG = payable(0xe86b5d5562bF50415A7455163525184f490b965f);
  mapping( bytes32 => uint256) public requestIdToSupply;
  mapping( bytes32 => uint256) public requestIdToGiftValue;

  mapping( address => uint256) public addressToCounter;
  uint256 public maxTokenPerAddress = 6;

  bytes32 internal keyHash;
  uint256 internal fee;
  uint256 public randomResult = 1;


  
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) VRFConsumerBase(
      0x8C7382F9D8f56b33781fE506E897a4F1e2d17255,
      0x326C977E6efc84E512bB9C30f76E30c160eD06FB
    )
    ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
    fee = 0.0001 * 10 ** 18; // 0.0001 LINK (Varies by network)
  }

  // internal
  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    address payable giftAddress = payable(msg.sender);
    uint256 supply = requestIdToSupply[requestId];
    uint256 giftValue = requestIdToGiftValue[requestId];
    
    randomResult = (randomness % supply) + 1;
    giftAddress = payable(ownerOf(randomResult));
    (bool success, ) = payable(giftAddress).call{value: giftValue}("");
    require(success, "Could not send final value!");
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
 
  // public

  function mint(uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused, "Contract is paused!");
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply, "Max supply reached!");
    require(msg.sender != owner(), "Owner can not mint!");
    require(msg.value >= cost * _mintAmount, "Not enough funds!");
    require(addressToCounter[msg.sender] + _mintAmount <= maxTokenPerAddress, "Token limit reached by this address");
    
    uint256 giftValue;
    uint256 giftValueONG;
   
    for (uint256 i = 1; i <= _mintAmount; i++) {
        _safeMint(msg.sender, supply + i);
    }
    
    if (supply > 0) {
        if (supply + _mintAmount == maxSupply) {

            giftValue = address(this).balance * percGiftEnd / 100 / nbEndReward;
            for (uint256 j = 1; j <= nbEndReward; j++ ) {
                require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
                bytes32 requestId = requestRandomness(keyHash, fee);
                requestIdToSupply[requestId] = totalSupply();
                requestIdToGiftValue[requestId] = giftValue;
            }
        } else {
    
            giftValue = msg.value * percGiftMint / 100;
            require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
            bytes32 requestId = requestRandomness(keyHash, fee);
            requestIdToSupply[requestId] = totalSupply();
            requestIdToGiftValue[requestId] = giftValue;
            
            giftValueONG = msg.value * permillGiftMintONG / 1000;
            (bool successONG, ) = payable(giftAddressONG).call{value: giftValueONG}("");
            require(successONG, "Could not send value to ONG!");
        }
    }
  
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }
 
  // function randomNum(uint256 _mod, uint256 _seed, uint256 _salt) public view returns(uint256) {
  //     uint256 num = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _seed, _salt))) % _mod;
  //     return num;
  // }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );


    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner

 
  function setCost(uint256 _newCost) public onlyOwner() {
    cost = _newCost;
  }


  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function withdraw() public payable onlyOwner {
    uint256 supply = totalSupply();
    require(supply == maxSupply || block.timestamp >= headStart, "Can not withdraw yet.");
    (bool s, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(s);
    uint assetBalance = LINK.balanceOf(address(this));
    (bool succ) = LINK.transfer(msg.sender, assetBalance);
    require(succ);
  }
}