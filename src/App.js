import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import ReactPlayer from 'react-player/lazy';
import i1 from "./assets/images/1.mp4";
import i2 from "./assets/images/1.png";
import i3 from "./assets/images/3.mp4";
import logo from './assets/images/load.gif'
import projectTitle from "./assets/images/logoweb369.png"
import appconfig from "./appconfig";
// import 'react-responsive-carousel/main.scss';
// import 'react-responsive-carousel/examples/presentation/presentation.scss';
import background from "./assets/images/fond.png";
// import "./assets/fonts/Ryomen.ttf"

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: white;
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
  max-width: 450px;
  @media (min-width: 300px) {
    flex-direction: column;
  }
`;

export const ResponsiveWrapper2 = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  margin:auto;
  display:flex;
  justify-content: stretched;
  align-items: stretched;
  @media (min-width: 350) {
    flex-direction: row;
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

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState({0:"Maybe it's your lucky day.", 1:"Maybe it's your lucky day.", 2:"Maybe it's your lucky day."});
  const [claimingNft, setClaimingNft] = useState({0:false, 1:false, 2:false});
  const [amount, setAmount] = useState({0: 1, 1:1, 2:1})
  const images = [i1, i2, i3]
  // const handleChange = (idx) => {
  //   setTokenId(idx)
  //   setToken(appconfig.tokens[idx])
  //   // dispatch(connect(idx))
  //   getData(idx);
  //   setFeedback("Maybe it's your lucky day.")
  // }


  const claimNFTs = (tokenId, _amount) => {
    if (_amount <= 0) {
      return;
    }
    console.log("claiming NFT")
    setFeedback({ ...feedback, [tokenId]:`Minting ${appconfig.tokens[tokenId].collectionName} ...` });
    setClaimingNft({ ...claimingNft, [tokenId]: true});
    blockchain.smartContract[tokenId].methods
      .mint(blockchain.account, _amount)
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
          { ...feedback, [tokenId]:`WOW, you own ${appconfig.tokens[tokenId].itemName}` }
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

  return (
    <div style={{'fontFamily': 'Ryomen'}}>
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
           
             
        <ResponsiveWrapper2 style={{ padding: 24 }}>
            {appconfig.tokens.map((t, i) => {
              return (
                <ResponsiveWrapper style={{ padding: 24 }}>
                <s.Container flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}>
                <s.TextTitle
                        style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
                      >
                        {`${t.collectionName}`}
                      </s.TextTitle>
                     
                </s.Container>
                
                <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
              {t.isanim
              ? <ReactPlayer loop playing url={images[i]} />
            :<StyledImg src={images[i]} />}
            
            <s.TextTitle
                    style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
                  >
                    {data.totalSupply[i]}/{t.totalSupply}
                  </s.TextTitle>
            <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback[i]}
                </s.TextDescription>
                <s.SpacerSmall />
            {blockchain.account === "" ||
                blockchain.smartContract[i] === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      {`Connect to ${appconfig.network}`}
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                    style={{backgroundColor: 'orange'}}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect(i));
                        getData(i);
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
                ) : 
                  claimingNft[i]
                  ? <img src={logo} style={{width:30, height:30}}  alt="loading..." />
                :<s.Container ai={"center"} jc={"center"} fd={"row"}>
                <StyledButton
                  style={{backgroundColor: 'steelblue'}}
                  disabled={claimingNft[i] ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    claimNFTs(i, 1);
                    getData(i);
                  }}
                >
                  BUY
                </StyledButton>
              </s.Container>
                  
                }
                <s.SpacerSmall />
            {Number(data.totalSupply[i]) == t.totalSupply ? (
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
                  {`1 ${t.tokenSymbol } costs ${t.mintCost } ${appconfig.mintCostCurrency}`}
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                <s.SpacerSmall />
                   <a target={"_blank"} style={{color: 'white'}}  href={`${t.collectionURL}`}>Visit Collection</a>
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
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
          © 369 Project 2021
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

export default App;
