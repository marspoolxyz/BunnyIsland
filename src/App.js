//import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState } from "react";

import Header from './component/Header';

import RoadMap from './component/RoadMap';


function App() {

  const [walletAddress, setWalletAddress] = useState(false);
  const [isAccountChanged, setIsAccountChanged] = useState(false);

  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState(false);
  const [chainName, setChainName] = useState(false);
  //const [messages, setmessages] = useState(false);
  const [cssClassName, setCssClassName] = useState(false);
  const [counter, setCounter] = useState(0);

  const [walletStatus, setWalletStatus] = useState("Connect");

  const [totalSupply, setTotalSupply] = useState(0);
  const [supplyCss, setSupplyCss] = useState("hidedisplay");
  const [adminCss, setAdminCss] = useState("hidedisplay");

  //0xde8ceFd1a9347eA2A6F5741D6DC44d6bE195672B
  //0xee75be79361c78e8235d41168738d0c842cf154a
  //0x419565f607C13af946A117ebCd66eAaFE992DB5F
  const MAX_SUPPLY = 5555;
  const contractAddress = "0xd51cd9dacdcf9a1de148c129cc32c40ddf658cea";
  const mainNet = true;
  var isExecutionRequired = false;


  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "customBaseURI_",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "proxyRegistryAddress_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "customBaseURI_",
          "type": "string"
        }
      ],
      "name": "setBaseURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "PRICE_",
          "type": "uint256"
        }
      ],
      "name": "setMintPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "saleIsActive_",
          "type": "bool"
        }
      ],
      "name": "setSaleIsActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tokenURI_",
          "type": "string"
        }
      ],
      "name": "setTokenURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_MULTIMINT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_SUPPLY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRICE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "saleIsActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  async function requestAccount() {
    consoleMessage("580" + 'Requesting account...');

    setAdminCss("hidedisplay");

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        consoleMessage("590"+accounts[0]);
        if(walletAddress !== "")
        {
          setIsAccountChanged(true);
        }        

        if(accounts[0] === walletAddress)
        {
          setmessage("");
          setCssClassName(""); 
        }


        setWalletAddress(accounts[0]);
        setWalletStatus("Connected");



        if(accounts[0] === "0x6470c4d86b062ff4e1030d5615c4b04cd78bf9cf") //Main Net
        {
          setAdminCss("showdisplay");
        }
        else
        {
          setAdminCss("hidedisplay");
        }

        setConnected(true);
      } catch (error) {

        setWalletStatus("Connect");
        if(error.code === 4001)
        {
          setmessage("You need to connect the MetaMask !");
          setCssClassName("error");    
        }  
        else
        {
          setmessage(error.message);
          setCssClassName("error");           
        }      
        consoleMessage('617 Error connecting...'+error);
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  async function consoleMessage(msg)
  {
    if(!mainNet)
    {
      console.log(msg);
    }
  }

  async function setmessage(msg)
  {
    
    const error = document.getElementById("error");
    error.innerHTML = msg;

  }
  async function withdrawEth() {

    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const balance = await provider.getBalance(walletAddress);
  
      const contract = new ethers.Contract(contractAddress, abi, signer);
  
      var cost = await contract.withdraw();    
    }
    catch(e)
    {
      console.log(e);
    }

  }
  async function execute() {
    
    setmessage("");
    setCssClassName("");       
    if(!connected)
    {
      consoleMessage(" 646 Not connected");
      setmessage("You need to connect the MetaMask !");
      setCssClassName("error");       
      return 0;
    }

    const icp = document.getElementById("icp");

    var icpButton = icp.innerHTML;
    icp.disabled=true;
    icp.innerHTML='Transaction initiated...';


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const balance = await provider.getBalance(walletAddress);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    var cost = await contract.PRICE();

    consoleMessage("671"+ cost);  
    //cost = cost * 2;

    var counterTag = document.getElementById("counter");
    var NFTCount = 1;
    try{
      NFTCount = Number.parseInt(counterTag.innerHTML);
    }
    catch(e)
    {
      NFTCount = 1;
    }



    const balanceWei = (balance / 1000000000000000000);
    var costWei = (cost / 1000000000000000000);
    var OneNFTCost = costWei;

    costWei = OneNFTCost * NFTCount;

    consoleMessage("691 " + OneNFTCost);


    consoleMessage("694 " + balanceWei.toString());
    consoleMessage("695 " + costWei.toString());

    


    if(balanceWei < costWei) // User selected Number of NFT is not buyable
    {
      consoleMessage("703 " + (balanceWei/OneNFTCost));

      consoleMessage("702 " + "Less balance or insufficient balance" );
      var minNFTCan = ((balanceWei/OneNFTCost));

      if(minNFTCan < 2 && minNFTCan > 1.1)
      {
        NFTCount = 1;
        minNFTCan =1;
        consoleMessage("711 " + minNFTCan);
        costWei = OneNFTCost * minNFTCan;
      }
      else
      {
        minNFTCan = Math.round(minNFTCan,2)   - 1;
        NFTCount  =  Math.round(minNFTCan,2)  - 1;
      }

      consoleMessage("704 " + minNFTCan);

      if(minNFTCan >= 1)
      {
        counterTag.innerHTML = minNFTCan;
        costWei = OneNFTCost * minNFTCan;   
        NFTCount =  minNFTCan; 
        setCounter(minNFTCan);

        const icp = document.getElementById("icp");

        if(costWei.length === 3)
          icp.innerHTML = "Total "+ costWei.toString()  + "0 Eth";
        else
          icp.innerHTML = "Total "+ costWei.toString()  + " Eth";
        
        
      }
    }


    consoleMessage("711 " + costWei.toString());
    consoleMessage("712 " + balanceWei.toString());

    if(balanceWei < costWei)
    {
      setmessage("Insufficient Balance");
      setCssClassName("error");    
      icp.disabled=false;
      icp.innerHTML=icpButton      
      return 0;
    }

    try {
      


        /*
        const estimation = await contract.estimateGas.mint(10, options);
        let gasPrice = await provider.getGasPrice()
        let  gasLimit = await contract.estimateGas.mint(10, options);
        let transactionFee = gasPrice * gasLimit;
        consoleMessage(transactionFee);
        */



        var options = {value: ethers.utils.parseEther(costWei.toString())}
        consoleMessage("716" + options);
        const reciept = await contract.mint(NFTCount, options);

        var link ="";
        if(mainNet)
        {
          link = "<br><a target='_' href='https://etherscan.io/tx/" + reciept.hash + ">Hash</a>"          
        }
        else
        {
          link = "<br><a target='_' href='https://rinkeby.etherscan.io/tx/" + reciept.hash + ">Hash</a>"
        }
        setmessage("Transaction Submitted " + link);
        setCssClassName("error"); 
        
        // const getAmount = await contract.withdraw();

    } catch (error) {
      consoleMessage("734" +error.code);
      consoleMessage("735" + error.message);

      if(error.code === "UNPREDICTABLE_GAS_LIMIT")
      {
        //setmessage("Maximum 20 LANDS can be minted in one transaction");
        setmessage("Mint is not live yet");
      }
      else if(error.code === "INSUFFICIENT_FUNDS")
      {
        setmessage("Insufficient Funds!");
      }
      else
      {
        if(error.code === 4001)
        {
          setmessage("You have cancelled the Transaction !");
        }
        else
        {
          setmessage(error.message);
        }
        
      }
      setCssClassName("error");      
    } 
    
    icp.disabled=false;
    icp.innerHTML=icpButton

  }

  function handleDecrement()
  {

      var icps = "";
      const cost = document.getElementById("cost").innerHTML;
      const icp = document.getElementById("icp");
      const counterTag = document.getElementById("counter");
      
      var count = counter;

      
      count--;

      if(count <= 1) count =1;
      icps = count * cost;

      var icpstring = icps + "";
      var with2Decimals = icpstring.substring(0, 5);
      icps = parseFloat(with2Decimals);
      icpstring = icps + "";         
    
      var leng = icpstring.length;  
      if(leng === 3)
      {
        icp.innerHTML = "Total " + icps + "0 Eth";
      }
      else
      {
        icp.innerHTML = "Total " + icps + " Eth";
      }
      counterTag.innerHTML = count;    
      setCounter(count)  
  }

  function handleIncrement() 
  {
      var icps = "";

      const cost = document.getElementById("cost").innerHTML;
      const icp = document.getElementById("icp");
      const counterTag = document.getElementById("counter");

      var count = counter;

      if(count < 20)
      {
        count++;
      }
      icps = count * cost;
    
      var icpstring = icps + "";
      var with2Decimals = icpstring.substring(0, 5);
      icps = parseFloat(with2Decimals); 
      icpstring = icps + "";  

      var leng = icpstring.length;
    
      if(leng === 3)
      {
        icp.innerHTML = "Total " + icps + "0 Eth";
      }
      else
      {
        icp.innerHTML = "Total " + icps + " Eth";
      }
      counterTag.innerHTML = count;    
      consoleMessage("820" + count);

      setCounter(count)
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {

    if(walletAddress === "0xe98b997f529f643bc67f217b1270a0f7d7a0ecb2")
    {
      setAdminCss("showdisplay");
    }
    else
    {
      setAdminCss("hidedisplay");
    }    
    if(walletStatus === "Connected")
    {
      consoleMessage("830"+ "Already connected");
      return;
    }

    if(typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getNetwork().then((result)=>{
        setChainId(result.chainId)
        setChainName(result.name)
      })      

      await requestAccount(); 
    }
  }

  const getData = async () => {
     
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
    
        var cost = await contract.totalSupply();
        
        var costString = cost + "";
        setTotalSupply(parseInt(costString));

        if(parseInt(costString) > 500)
        {
          setSupplyCss("showdisplay");
        }
  }
  //getData();
  setInterval(getData, 60*100);


   useEffect(() => {

    consoleMessage("848 " + walletStatus);
    if(walletStatus.length === false)
    {
      setWalletStatus("Connect");
    }
    

    if(window.ethereum) {
      window.ethereum.on('chainChanged', async () => {
        //window.location.reload();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.getNetwork().then((result)=>{
          setChainId(result.chainId)
          setChainName(result.name)
          
          var chainCheck=1;
          if(mainNet)
          {
            chainCheck = 1;
          }
          else
          {
            chainCheck = 4;    
          }
          if(result.chainId !== chainCheck) //RinkeyBy 4 // Main Net 1
          {
            setmessage("Wrong Network");
            setCssClassName("error");
          } 
          else
          {
            setCssClassName("");
            setmessage("");
          }         
        })

      })
      window.ethereum.on('accountsChanged', async () => {
        if(isAccountChanged)
        {
          setmessage("Account Id changed");
          setCssClassName("error");  
         
        }      
        await requestAccount(); 
      })
  }

  },[walletStatus,isAccountChanged])
  
  
  return (
    


    <div class="App">

      <Header/>


      <header class="App-header">

      </header>
       

      <div class="row ">
                    <div class="middle_cont">
                    <div class="container-fluid">
                        <div class="row">
                        <div class="col-md-12">
                            <div class="text-center mb-4 mt-5">
                                <div class="row mt-4 p-5 align-items-center justify-content-center">

                                    <div class="col-md-12">
                                    <div class="text-center mb-4 mt-5">
                                        <h1 class="main-heading">Mint <span>LAND</span>, become LAND-OWNER in the BunnyIsland</h1>
                                        <div class="details_box">
                                            <p class="w-75 m-auto">Only 5,555 LAND NFTs available in Ethereum Blockchain</p>
                                            <p class="w-75 m-auto">LAND Owners get airdrop of ICP NFTs, own property in the Meta-verse.</p>
                                            <p class="icp" id="cost" hidden>0.05</p>
                                        </div>
                                    </div>
                                    </div> 

                                    
                                    <div class="col-3 text-center">
                                    <div class="walet">
                                        <h5>CONNECT USING</h5>
                                    </div>
                                    <label>
                                        <img
                                        onClick={connectWallet}
                                        src="images/metamask.png"
                                        alt=""
                                        height="45px"
                                        width="45px"
                                        ></img>
                                    </label>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="walet text-center mb-3">                
                               <span id="error" class={cssClassName}></span>

                                <h4>Your Wallet</h4> 
                                <div class="mt-1">                                    
                                    <span>{walletAddress}</span>
                                </div>
                                
                                <div class={adminCss}>                                                                    
                                  <button onClick={withdrawEth} class="custom-btn" id="withdraweth">Withdraw</button>
                                </div>                                   
                                <div class={supplyCss}>                                                                    
                                    <span>{totalSupply}/5555 LANDS 🏝️</span>
                                </div>                                
                            </div>
                            <div class="counter_box">
                                <p class="heading">No of LANDs</p>
                                <p class="counter" id="counter">1</p>
                                <button onClick={handleIncrement} class="incr counter_btn">
                                <span class="plus">+</span>
                                </button>
                                <button  onClick={handleDecrement}  class="decr counter_btn"><span class="minus">-</span></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                        <div class="col-md-12">
                            <button onClick={execute} class="custom-btn" id="icp">Total 0.05 Eth</button>
                            <div class="mx-auto text-center mb-5  mt-5">
                                <img class="img-responsive gif_img" alt="Lands" src="lands/land.gif"/>
                            </div>
                            </div>
                        </div>
                    </div>    

                    <RoadMap></RoadMap>
                    </div>
                </div>
    </div>
  );
}

export default App;
