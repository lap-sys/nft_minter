import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/1.png";
import i2 from "./assets/images/2.png";
import i3 from "./assets/images/3.png";
import appconfig from "./appconfig";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  margin:auto;
  display:flex;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: column;
  }
`;

export const StyledImg = styled.img`
  max-width: 100%;
  height: 200px;
  @media (min-width: 767px) {
    max-width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const images = [i1, i2, i3]
  const [token, setToken] = useState(appconfig.tokens[0])
  const [tokenId, setTokenId] = useState(0)
  const handleChange = (idx) => {
    setTokenId(idx)
    setToken(appconfig.tokens[idx])
    // dispatch(connect(idx))
    getData(idx);
  }


  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    console.log("claiming NFT")
    setFeedback(`Minting your ${token.collectionName} item(s)...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "485000",
        to: appconfig.ownerAddress,
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((token.mintCost * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          `WOW, you own ${token.itemName}. go visit ${token.collectionURL} to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = (idx) => {
    if (blockchain.account !== "" && blockchain.smartContract[idx] !== null) {
      dispatch(fetchData(blockchain.account, idx));
    }
  };

  useEffect(() => {
    getData(tokenId);
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          {appconfig.projectName}
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper style={{ padding: 24 }}>
        <div>
            <s.Container flex={1} jc={"center"} ai={"center"}>
              <div style= {{maxWidth: '350'}} >
          <Carousel onChange={handleChange} style={{fontSize: '14'}} >
            {appconfig.tokens.map((t, i) => {
              return (
                <div>
                   <s.TextTitle
                    style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
                  >
                    {`Mint ${t.collectionName}`}
                  </s.TextTitle>
                  <s.SpacerMedium />

                  <div><StyledImg alt={"example"} src={images[i]} /></div>
                  <s.SpacerMedium />
                  <s.TextTitle
                    style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
                  >
                    {data.totalSupply[tokenId]}/{t.totalSupply}
                  </s.TextTitle>
                  <s.SpacerMedium />
                  <s.SpacerMedium />
                </div>
              )
            })}
            
               </Carousel>
               </div>
                </s.Container>
        </div>
           
         
          
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
            <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerSmall />
            {blockchain.account === "" ||
                blockchain.smartContract[tokenId] === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      {`Connect to ${appconfig.network}`}
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect(tokenId));
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    <s.SpacerSmall />
                
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData(tokenId);
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 1"}
                    </StyledButton>
                  </s.Container>
                )}
                <s.SpacerSmall />
            {Number(data.totalSupply) == token.totalSupply ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {`You can still find ${appconfig.projectName} on{" "}`}
                  <a
                    target={"_blank"}
                    href={"https://testnets.opensea.io/collection/369-arkives"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  {`1 ${token.tokenSymbol } costs ${token.mintCost } ${appconfig.mintCostCurrency}`}
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                
                <s.SpacerMedium />
                
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            Please make sure you are connected to the right network and the correct address. Please note: Once you make the
            purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            We have set the gas limit to 285000 for the contract to successfully
            mint your NFT. We recommend that you don't change the gas limit.
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
