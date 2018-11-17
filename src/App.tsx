import * as React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

class App extends React.Component {
    public render() {
        const styleMain = {
            "marginLeft": "250px"
        };

        const About = () => <h2>About</h2>;
        const Api = () => <h2>Api</h2>;
        const Releases = () => <h2>Releases</h2>;
        const Contacts = () => <h2>Contacts</h2>;

        return (
            <Router>
                <>
                    <div className="w3-top">
                        <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
                            <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
                                <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1"
                                   href="javascript:void(0)" onClick={this.w3_open}><i className="fa fa-bars"/></a>
                                <a
                                    className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1"
                                    >Advanced Logger</a>
                                <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white"
                                      to="/api">API</Link>
                                <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white"
                                      to="/releases">Releases</Link>
                                <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white"
                                      to="/contacts">Contacts</Link>
                            </div>
                        </div>
                    </div>

                    <nav className="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left"
                         id="mySidebar">
                        <a href="javascript:void(0)" onClick={this.w3_close}
                           className="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large"
                           title="Close Menu">
                            <i className="fa fa-remove"/>
                        </a>
                        <h4 className="w3-bar-item"><b>API Menu</b></h4>
                        <a className="w3-bar-item w3-button w3-hover-black" href="#">Getting started</a>
                        <a className="w3-bar-item w3-button w3-hover-black" href="#">Services</a>
                        <a className="w3-bar-item w3-button w3-hover-black" href="#">Strategies</a>
                    </nav>


                    <div className="w3-overlay w3-hide-large" onClick={this.w3_close} title="close side menu"
                         id="myOverlay"/>


                    <div className="w3-main w3-padding-32" style={styleMain}>
                        <Route path="/" exact={true} component={About}/>
                        <Route path="/api/" component={Api}/>
                        <Route path="/releases/" component={Releases}/>
                        <Route path="/contacts/" component={Contacts}/>

                        <div className="w3-row w3-padding-24">
                            <div className="w3-container">
                                <h1 className="w3-text-teal">Heading</h1>
                                <p>text</p>
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
            </Router>
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
