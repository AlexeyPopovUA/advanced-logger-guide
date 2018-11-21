import * as React from 'react';
import './styles/App.css';
import {HashRouter, Link, Route} from "react-router-dom";
import About from "./page/About";
import Releases from "./page/Releases";
import Contacts from "./page/Contacts";
import API from "./page/API";
import Footer from "./Footer";
import Overlay from "./component/Overlay";

class App extends React.Component {
    public render() {
        return (
            <HashRouter>
                <>
                    <div className="w3-top">
                        <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
                            <a className="w3-hide-medium w3-hide-large w3-bar-item w3-button w3-right w3-hover-white w3-large w3-theme-l1"
                               onClick={this.toggleSidebar}><i className="fa fa-bars"/></a>
                            <Link className="w3-bar-item w3-button w3-hover-white w3-theme-l1" to="/">Advanced Logger</Link>
                            <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/api">API</Link>
                            <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/releases">Releases</Link>
                            <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/contacts">Contacts</Link>
                        </div>
                    </div>

                    <nav onClickCapture={this.closeSidebar} className="left-sidebar w3-hide w3-sidebar w3-hide-medium w3-hide-large w3-bar-block w3-large w3-theme-l5"
                         id="mySidebar">
                        <a  className="w3-right w3-xlarge w3-padding-large w3-hover-black"
                           title="Close Menu">
                            <i className="fa fa-remove"/>
                        </a>
                        <h4 className="w3-bar-item"><b>Menu</b></h4>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/">About</Link>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/api">API</Link>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/releases">Releases</Link>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/contacts">Contacts</Link>
                    </nav>

                    <Overlay handleClick={this.closeSidebar}/>

                    <div className="w3-main w3-padding-32 main-container w3-container">
                        <Route path="/" exact={true} component={About}/>
                        <Route path="/api/" component={API}/>
                        <Route path="/releases/" component={Releases}/>
                        <Route path="/contacts/" component={Contacts}/>
                    </div>

                    <Footer/>
                </>
            </HashRouter>
        );
    }

    private toggleSidebar() {
        const mySidebar = document.getElementById("mySidebar");
        const overlayBg = document.getElementById("myOverlay");

        if (mySidebar && overlayBg) {
            if (mySidebar.style.display === 'block') {
                mySidebar.classList.add("w3-hide");
                overlayBg.classList.remove("w3-show");
            } else {
                mySidebar.classList.remove("w3-hide");
                overlayBg.classList.add("w3-show");
            }
        }
    }

    private closeSidebar() {
        const mySidebar = document.getElementById("mySidebar");
        const overlayBg = document.getElementById("myOverlay");

        if (mySidebar && overlayBg) {
            mySidebar.classList.add("w3-hide");
            overlayBg.classList.remove("w3-show");
        }
    }
}

export default App;
