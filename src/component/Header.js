import React, {Component} from 'react';
class Header extends Component {
    render() {
	    return (
                <div class="row ">

                    <div class="main_wrapper d-flex align-items-center">
                        <div class="container">
                            <header id="masthead" class="row site-header">
                            <div class="col-md-2 site-branding">
                                <div class="logo"><a href="https://bit.ly/TheBunnyIsland" class="custom-logo-link" rel="home" aria-current="page">
                                    <img width="156" height="" src="images/logo.png"/></a>  
                                </div>
                            </div>


                            <div class="col-md-10 menu_wrpr d-flex align-items-center justify-content-end">

                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon">
                                        <div class="bar1"></div>
                                        <div class="bar2"></div>
                                        <div class="bar3"></div>
                                        </span>
                                    </button>
                                <nav class="navbar navbar-expand-lg">
                                    
                                    <div class="collapse navbar-collapse" id="navbarNav">
                                        <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="https://bit.ly/TheBunnyIsland">The Map 🗺️</a>
                                        </li>
                                        </ul>

                                        <ul class="navbar-nav">
                                        <li class="nav-item">&nbsp;&nbsp;&nbsp;</li>
                                        </ul> 
                                        <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <a href="https://opensea.io/collection/thebunnyisland" target='opensea'>&nbsp;<img width="25" height="25" src="images/opensea.png" /></a>
                                        </li>
                                        </ul>    
                                        <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <a href="https://raritysniper.com/nft-drops-calendar" target='raritysniper'>&nbsp;<img width="25" height="25" src="images/raritysniper.png" /></a>
                                        </li>
                                        </ul>                                                               
                                    </div>
                                    </nav>
                            </div>
                            </header>
                        </div>
                    </div>


                    <div class="home_slider_box_content">
                        <div class="Header" id="">
                            <div class="container-fluid p-0 h-100">
                            <div class="row align-items-center h-100">
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
               );
        }
    }
export default Header;            