import React, {Component,useEffect } from 'react';
import { ethers } from 'ethers';

import RoadMap from './RoadMap';

class Mint extends Component {

 

    state = {count:0, icps:0, walletAddress:"", connected:false, chainId:0, chainName:"eth",message:"",cssclass:"", walletStatus:""};

    handleDecrement  = (event) =>
    {

        var count = this.state.count;
        var icps = this.state.icps;
        const cost = document.getElementById("cost").innerHTML;
        const icp = document.getElementById("icp");
        const counter = document.getElementById("counter");
        
        
        count--;
  
        if(count <= 1) count =1;
        icps = count * cost;

        var with2Decimals = icps.substring(0, 3);
        icps = parseFloat(with2Decimals);        
      
        var icpstring = icps + "";
        var leng = icpstring.length;  
        if(leng == 3)
        {
          icp.innerHTML = "Total " + icps + "0 Eth";
        }
        else
        {
          icp.innerHTML = "Total " + icps + " Eth";
        }
        counter.innerHTML = count;    
        this.setState({ count: count, icps:icps});
    
    }
    handleIncrement = (event) =>
    {
        var count = this.state.count;
        var icps = this.state.icps;
        const cost = document.getElementById("cost").innerHTML;
        const icp = document.getElementById("icp");
        const counter = document.getElementById("counter");

        if(count < 20)
        {
          count++;
        }
        icps = count * cost;

        var with2Decimals = icps.substring(0, 3);
        icps = parseFloat(with2Decimals);        
      
        var icpstring = icps + "";
        var leng = icpstring.length;
      
        if(leng == 3)
        {
          icp.innerHTML = "Total " + icps + "0 Eth";
        }
        else
        {
          icp.innerHTML = "Total " + icps + " Eth";
        }
        counter.innerHTML = count;    
        console.log(count);

        this.setState({ count: count, icps:icps});
    }

    requestAccount = async() => {
        console.log('Requesting account...');
    
        // ❌ Check if Meta Mask Extension exists 
        if(window.ethereum) {
          console.log('detected');
    
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(accounts[0]);

            this.setState({walletAddress:accounts[0],connected:true})

          } catch (error) {
            console.log('Error connecting...'+error);
          }
    
        } else {
          alert('Meta Mask not detected');
        }
      }

    connectWallet = async() => {
     
        if(this.state.walletStatus === "Connected")
        {
          console.log("Already connected" + this.walletAddress);
          //return;
        }
    
        if(typeof window.ethereum !== 'undefined') {
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          provider.getNetwork().then((result)=>{
            this.setState({chainId:result.chainId,chainName:result.name,walletStatus:"Connected"})
          })      
    
        
          await this.requestAccount(); 
          
        }     
        
        
        


    }


    useEffect = () => {

        console.log(this.state.walletStatus);
        if(this.state.walletStatus.length == false)
        {
          console.log("i ma here walletStatus");
          //setWalletStatus("Connect");
        }
        
    
        if(window.ethereum) {
          window.ethereum.on('chainChanged', async () => {
            //window.location.reload();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getNetwork().then((result)=>{
              //setChainId(result.chainId)
              //setChainName(result.name)
              
              if(result.chainId != 1)
              {
                //setmessage("Wrong Network");
                //setCssClassName("error");
              } 
              else
              {
                //setCssClassName("");
                //setmessage("");
              }         
            })
    
          })
          window.ethereum.on('accountsChanged', async () => {
            //setmessage("Account Id changed");
            //setCssClassName("error");   
            console.log("TEST accountsChanged");     
            await this.requestAccount(); 
          })
      }
    
      }

    render() {


	    return (
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
                                            <p class="icp" id="cost" hidden>0.08</p>
                                        </div>
                                    </div>
                                    </div>                        
                                    <div class="col-3 text-center">
                                    <div class="walet">
                                        <h5>CONNECT USING</h5>
                                    </div>
                                    <label>
                                        <img
                                        onClick={this.connectWallet}
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

                                <h4>Your Wallet</h4> 
                                <div class="mt-1">
                                    
                                    <span>{this.state.walletAddress}</span>
                                </div>
                            </div>
                            <div class="counter_box">
                                <p class="heading">No of LANDs</p>
                                <p class="counter" id="counter">1</p>
                                <button onClick={this.handleIncrement} class="incr counter_btn">
                                <span class="plus">+</span>
                                </button>
                                <button  onClick={this.handleDecrement}  class="decr counter_btn"><span class="minus">-</span></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                        <div class="col-md-12">
                            <button class="custom-btn" id="icp">Total 0.08 Eth</button>
                            <div class="mx-auto text-center mb-5  mt-5">
                                <img class="img-responsive gif_img" src="lands/land.gif"/>
                            </div>
                            </div>
                        </div>
                    </div>    

                    <RoadMap></RoadMap>
                    </div>
                </div>
               );
        }
    }
export default Mint;            