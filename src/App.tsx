import * as React from 'react';
import './styles/App.css';

class App extends React.Component {
    public render() {
        const styleMain = {
            "marginLeft": "250px"
        };

        return (
            <>
                <div className="w3-top">
                    <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
                        <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1"
                           href="javascript:void(0)" onClick={this.w3_open}><i className="fa fa-bars"/></a>
                        <a href="#" className="w3-bar-item w3-button w3-theme-l1">Advanced Logger</a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-hover-white">About</a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-hover-white">API</a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Releases</a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Contact</a>
                    </div>
                </div>

                <nav className="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left"
                     id="mySidebar">
                    <a href="javascript:void(0)" onClick={this.w3_close}
                       className="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
                        <i className="fa fa-remove"/>
                    </a>
                    <h4 className="w3-bar-item"><b>API Menu</b></h4>
                    <a className="w3-bar-item w3-button w3-hover-black" href="#">Getting started</a>
                    <a className="w3-bar-item w3-button w3-hover-black" href="#">Services</a>
                    <a className="w3-bar-item w3-button w3-hover-black" href="#">Strategies</a>
                </nav>


                <div className="w3-overlay w3-hide-large" onClick={this.w3_close} title="close side menu"
                     id="myOverlay"/>

                <div className="w3-main" style={styleMain}>

                    <div className="w3-row w3-padding-64">
                        <div className="w3-container">
                            <h1 className="w3-text-teal">Heading</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>

                    <div className="w3-row">
                        <div className="w3-container">
                            <h1 className="w3-text-teal">Heading</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>

                    <div className="w3-row w3-padding-64">
                        <div className="w3-container">
                            <h1 className="w3-text-teal">Heading</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>

                    <footer id="myFooter">
                        <div className="w3-container w3-theme-l2 w3-padding-32">
                            <h4>Footer</h4>
                        </div>

                        <div className="w3-container w3-theme-l1">
                            <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp"
                                             target="_blank">w3.css</a></p>
                        </div>
                    </footer>
                </div>
            </>
        );
    }

    // Toggle between showing and hiding the sidebar, and add overlay effect
    private w3_open() {
        const mySidebar = document.getElementById("mySidebar");
        const overlayBg = document.getElementById("myOverlay");

        if (mySidebar && overlayBg) {
            if (mySidebar.style.display === 'block') {
                mySidebar.style.display = 'none';
                overlayBg.style.display = "none";
            } else {
                mySidebar.style.display = 'block';
                overlayBg.style.display = "block";
            }
        }
    }

    // Close the sidebar with the close button
    private w3_close() {
        const mySidebar = document.getElementById("mySidebar");
        const overlayBg = document.getElementById("myOverlay");
        if (mySidebar && overlayBg) {
            mySidebar.style.display = "none";
            overlayBg.style.display = "none";
        }
    }
}

export default App;
