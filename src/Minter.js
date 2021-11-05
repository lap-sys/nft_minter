import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import ReactPlayer from 'react-player/lazy';
import i1 from "./assets/images/1.mp4";
import i0 from "./assets/images/1.png";
import i2 from "./assets/images/3.mp4";
import logo from './assets/images/load.gif'
import projectTitle from "./assets/images/logoweb369.png"
import appconfig from "./appconfig";
import background from "./assets/images/fond.png";
import connectbutton from './assets/images/connectwalletbutton.png';
import buynowbutton from './assets/images/buynowbutton.png';
import opensea from './assets/images/openseabutton.png';
import lostindextitle from './assets/images/TITRE lostindex.png';
import lostmemoriestitle from './assets/images/TITRE lostmemories.png';
import thearkonautstitle from './assets/images/TITRE thearkonauts.png';
// import "./assets/fonts/Ryomen.woff"
// import "./assets/fonts/PilatRegular.woff"
import "@fontsource/chakra-petch";


export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 0px;
  border: 3px;
  background-color: #ffffff;
  padding: 5px;
  font-weight: bold;
  color: white;
  width: 100px;
  cursor: pointer;
  opacity: 0.8;
  box-shadow: 5px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: 6px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  flex: 1;
  object-fit: 'cover';
  overflow: 'hidden';
  height: 100%;
  flex-direction: column;
  text-align: center;
  justify-content: stretched;
  align-items: stretched;
  max-width: 430px;
  @media (min-width: 200px) {
    flex-direction: column;
  }
`;

export const ResponsiveWrapper2 = styled.div`
  display: flex;
  flex: 1;
  line-height:18px; 
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  display:flex;
  opacity: 0.;
  justify-content: stretched;
  align-items: stretched;
  @media (min-width: 100%) {
    flex-direction: column;
  }
`;

export const StyledImg = styled.img`
  max-width: 100%;
  @media (min-width: 767px) {
    max-width: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function Minter() {
  const time0 = 1000;
  const time1 = 1000;
  const time2 = 1000;
  const fitSyle = {
    width:250,
    height:250,
    objectFit: 'cover',
    overflow: 'hidden'
  }
  const formStyle = {
    flex: 1,
    flexDirection: 'row'
  }
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState({0:"", 1:"", 2:""});
  const [claimingNft, setClaimingNft] = useState({0:false, 1:false, 2:false});
  const [amount, setAmount] = useState({0: 1, 1:1, 2:1})
  const [ismuted, setIsmuted] = useState({0: true, 1:true, 2:true})

  const [images, setImages] = useState({0:i0, 1:i1, 2:i2})
  const titleimagecollection = [thearkonautstitle, lostindextitle, lostmemoriestitle]
  const setImageUrl = () => {
    let idx = [0,1,2]
    let i = 0
    let t = appconfig.tokens[i]
    
      let N = data.totalSupply[i]
      let n = Math.floor(N * Math.random() + 1)
      let url = `https://gateway.pinata.cloud/ipfs/${t.CID}/${n.toString()}.${t.extension}`
      setImages({...images, [i]: url })

  }
  const setVideoUrl = () => {
    let idx = [0,1,2]
    let i = 2
    let t = appconfig.tokens[i]
    
      let N = data.totalSupply[i]
      let n = Math.floor(N * Math.random() + 1)
      let url = `https://gateway.pinata.cloud/ipfs/${t.CID}/${n.toString()}.${t.extension}`
      setImages({...images, [i]: url })

  }
  const setAnimUrl = () => {
    let idx = [0,1,2]
    let i = 1
    let t = appconfig.tokens[i]
    
      let N = data.totalSupply[i]
      let n = Math.floor(N * Math.random() + 1)
      let url = `https://gateway.pinata.cloud/ipfs/${t.CID}/${n.toString()}.${t.extension}`
      setImages({...images, [i]: url })

  }
  const switchMuted = (i) => {
    const currentmutestate = ismuted[i]
    setIsmuted({...ismuted, [i]:!currentmutestate})
  }
  // const handleChange = (idx) => {
  //   setTokenId(idx)
  //   setToken(appconfig.tokens[idx])
  //   // dispatch(connect(idx))
  //   getData(idx);
  //   setFeedback("Maybe it's your lucky day.")
  // }
  const handleChange = (i, event) => {
    setAmount({ ...amount, [i]:event.target.value})
  }

  const claimNFTs = (tokenId, _amount) => {
    if (_amount <= 0) {
      return;
    }
    console.log("claiming NFT")
    setFeedback({ ...feedback, [tokenId]:`Minting ${appconfig.tokens[tokenId].collectionName} ...` });
    setClaimingNft({ ...claimingNft, [tokenId]: true});
    blockchain.smartContract[tokenId].methods
      .mint(_amount)
      .send({
        gasLimit: "485000",
        to: appconfig.ownerAddress,
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((appconfig.tokens[tokenId].mintCost * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback({ ...feedback, [tokenId]:"Sorry, something went wrong please try again later."});
        setClaimingNft({ ...claimingNft, [tokenId]: false});
      })
      .then((receipt) => {
        setFeedback(
          { ...feedback, [tokenId]:`WOW, you own an item from ${appconfig.tokens[tokenId].collectionName}` }
        );
        setClaimingNft({ ...claimingNft, [tokenId]: false});
        dispatch(fetchData(blockchain.account, tokenId));
      });
  };
  
  const getData = (idx) => {
    if (blockchain.account !== "" && blockchain.smartContract[idx] !== null) {
      dispatch(fetchData(blockchain.account, idx));
    }
  };

  useEffect(() => {
    appconfig.tokens.map((t, i)=> {
      getData(i)
    })

    ;
  }, [blockchain.account]);
  useEffect(async () => {

    setInterval(setImageUrl, 10000)
    // setInterval(setVideoUrl, 30000)
    // setInterval(setAnimUrl, 5000)
   
  }, [])
  console.log(ismuted)
  return (
    <div style={{'fontFamily': 'Chakra Petch'}}>
    <s.Screen style={{ backgroundImage: `url(${background})`, backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
      <StyledImg src={projectTitle} />
        {/* <s.StyledText
          style={{ textAlign: "center", fontSize: 32, fontWeight: "bold" }}
        >
          {appconfig.projectName}
        </s.StyledText> */}
        <s.SpacerMedium />
        
        <div>
           
             
        <ResponsiveWrapper2 style={{ padding: 10 }}>
            {appconfig.tokens.map((t, i) => {
              return (
                <ResponsiveWrapper style={{ padding: 10 , opacity: 0.8}}>
                
                
                
                <s.Container
                    flex={1}
                    jc={"end"}
                    ai={"center"}
                    style={{ backgroundColor: "#383838", padding: 10}}>
              {t.isanim
               ? <ReactPlayer  loop playing muted={ismuted[i]}  url={images[i]} />
               :<StyledImg src={images[i]} />}
               {t.control
               ? 
                  <div style={{margin:3, justifyContent:'flex-end'}}>
                   {ismuted[i]
                   ? <Button style={{backgroundColor: "#383838"}} onClick={()=> switchMuted(i)}>
                       {'►'}
                   </Button>
                 :<Button onClick={()=> switchMuted(i)}>
                   {'mute'}
                  </Button>}
                 </div>
             
              : null}
               </s.Container>
               <s.Container
                    flex={1}
                    jc={"center"}
                    ai={"center"}
                    style={{  position: 'relative',backgroundColor: "#383838", padding: 10 }}>
                  <s.SpacerMedium />
                  {/* <s.TextDescription style={{ fontSize: "14px", textAlign: "center" }}>
                        Previously minted items
                      </s.TextDescription> */}
                  <s.TextTitle style={{ opacity: 1,fontFamily: "ryomen", color: "WhiteSmoke", textAlign: "center", fontSize: 30, fontWeight: "bold" }} >
                    {/* {`${t.collectionName}`} */}
                    <StyledImg src={titleimagecollection[i]} />
                  </s.TextTitle>

                <s.TextTitle style={{ paddingTop: "1px", paddingbottom: "1px",  textAlign: "center", fontSize: 35, fontWeight: "bold" }}>
                        {data.totalSupply[i]}/{t.totalSupply}
                  </s.TextTitle>
                  <s.TextDescription style={{ paddingBottom: "12px", fontWeight: "bold", textAlign: "center" }}>
                      {/* {feedback[i] || `${t.giftStep - data.totalSupply[i] % t.giftStep} to next reward`} */}
                      total minted items
                  </s.TextDescription>
                  <s.TextTitle style={{ paddingTop: "1px", paddingbottom: "1px",  textAlign: "center", fontSize: 35, fontWeight: "bold" }}>
                  
                  {data.nbOwned[i] === t.maxBalance ? "Maximum minted tokens reached for this address" : data.nbOwned[i] + "/" + t.maxBalance}
       
                  </s.TextTitle>
                  
                  <s.TextDescription style={{ paddingBottom: "12px", fontWeight: "bold", textAlign: "center" }}>
                      {/* {feedback[i] || `${t.giftStep - data.totalSupply[i] % t.giftStep} to next reward`} */}
                      mint limit per address
                  </s.TextDescription>
                <s.SpacerSmall />
                <hr/>
                <div style={formStyle} >
                  <div>
                <label>
                
                <input type="text" style={{width: 30, textAlign:'center'}} pattern="[0-9]*" value={amount[i]} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key) || !(amount[i] <= t.maxMint)) {
                          event.preventDefault();
                        }
                      }} onChange={(event)=>handleChange(i, event)} default={amount[i]}/>
                </label>
                </div>
                <div>
                <s.TextTitle style={{ color: '#fff',textAlign: "center", fontSize:'12px' }}>
                  {`${amount[i] * t.mintCost } ${appconfig.mintCostCurrency}`}
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{  fontSize: "12px", textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                </div>
                </div>
                <s.SpacerSmall />
            {blockchain.account === "" ||
                blockchain.smartContract[i] === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    
                    <s.SpacerSmall />
                    <StyledButton
                    style={{ backgroundImage: `url(${connectbutton})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width:150,
                    height:30,
                    textAlign:'center', border: "4px"}}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect(i));
                        getData(i);
                      }}
                    >
                      {/* <s.Container ai={"center"} jc={"center"}>
                      <StyledImg src={connectbutton} />
                      </s.Container > */}
                    </StyledButton>
                    <s.SpacerSmall />
                    <s.TextDescription style={{ padding: "1px", textAlign: "center" }}>
                      {`Connect to ${appconfig.network}`}
                    </s.TextDescription>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                        
                      </>
                    ) : null}
                    
                  </s.Container>
                ) : 
                  claimingNft[i]
                  ? <img src={logo} style={{width:30, height:30}}  alt="loading..." />
                :<s.Container ai={"center"} jc={"center"} fd={"row"}>
                <StyledButton
                style={{ backgroundImage: `url(${buynowbutton})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width:150,
                    height:30,
                    color: '#fff',
                  textAlign:'center', border: "4px"}}
                  disabled={claimingNft[i] ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    claimNFTs(i, 1);
                    getData(i);
                  }}
                >
                  {/* <s.Container ai={"center"} jc={"center"}>
                  <StyledImg src={buynowbutton} />
                  </s.Container> */}
                </StyledButton>
                
              </s.Container>
                  
                }
                <s.SpacerXSmall />
            {Number(data.totalSupply[i]) == t.totalSupply ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {`You can still find ${appconfig.projectName} on `}
                  <a
                    target={"_blank"}
                    href={"https://testnets.opensea.io/collection/369-arkives"}
                  >
                    <StyledImg src={opensea} />
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
              
                
                <s.SpacerMedium />
                   <a target={"_blank"} style={{textDecoration: "none", fontFamily: "Helvetica", fontSize: "18px", color: 'cornflowerblue'}}  href={`${t.collectionURL}`}> 
                   <StyledImg src={opensea} /></a>
                <s.SpacerMedium />
                
              </>
            )}
          </s.Container>
          </ResponsiveWrapper>
                  
              )
            })}
            </ResponsiveWrapper2>
               
              

        </div>
           
         
          
          
       
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ fontFamily: "ryomen", textAlign: "center", fontSize: 20 }}>
          © 369 ARKIVES 2021
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
    {/* <video autoplay loop poster={`url(${backgroundvid})`} id="bgvid">
      <source src={`url(${backgroundvid})`} type="video/mp4" />
    </video> */}
    </div>
  );
}

export default Minter;
