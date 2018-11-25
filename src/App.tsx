import * as React from 'react';
import './styles/App.css';
import "prismjs/themes/prism.css"
import {HashRouter, Link, Route} from "react-router-dom";
import About from "./page/About";
import Releases from "./page/Releases";
import Contacts from "./page/Contacts";
import Footer from "./Footer";
import Overlay from "./component/Overlay";
import {MouseEvent} from "react";
import Start from "./page/Start";
import Strategy from "./page/Strategy";
import Service from "./page/Service";
import Grouping from "./page/Grouping";

class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.onAPIBtnClick = this.onAPIBtnClick.bind(this);
    }

    public render() {
        return (
            <HashRouter>
                <>
                    <div className="w3-top">
                        <div className="w3-bar w3-theme w3-left-align w3-large">
                            <a className="w3-hide-medium w3-hide-large w3-bar-item w3-button w3-right w3-hover-white w3-large w3-theme-l1"
                               onClick={this.toggleSidebar}><i className="fa fa-bars"/></a>
                            <Link className="w3-bar-item w3-button w3-hover-white w3-theme-l1" to="/">Advanced Logger</Link>
                            <div className="w3-dropdown-hover">
                                <button className="w3-button w3-hide-small w3-hover-white">API <i className="fa fa-caret-down"/></button>
                                <div className="w3-dropdown-content w3-bar-block w3-dark-grey">
                                    <Link className="w3-bar-item w3-button w3-hover-black" to="/api/start">Getting started</Link>
                                    <Link className="w3-bar-item w3-button w3-hover-black" to="/api/strategy">Strategy</Link>
                                    <Link className="w3-bar-item w3-button w3-hover-black" to="/api/service">Service</Link>
                                    <Link className="w3-bar-item w3-button w3-hover-black" to="/api/grouping">Grouping</Link>
                                </div>
                            </div>
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
                        <div className="w3-dropdown-click w3-mobile">
                            <button onClick={this.onAPIBtnClick} className="w3-bar-item w3-button w3-hover-black api-nav-button">API</button>
                            <div className="w3-dropdown-content w3-bar-block w3-border">
                                <Link className="w3-bar-item w3-button w3-hover-black" to="/api/start">Getting started</Link>
                                <Link className="w3-bar-item w3-button w3-hover-black" to="/api/strategy">Strategy</Link>
                                <Link className="w3-bar-item w3-button w3-hover-black" to="/api/service">Service</Link>
                                <Link className="w3-bar-item w3-button w3-hover-black" to="/api/grouping">Grouping</Link>
                            </div>
                        </div>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/releases">Releases</Link>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/contacts">Contacts</Link>
                    </nav>

                    <Overlay handleClick={this.closeSidebar}/>

                    <div className="w3-main w3-padding-32 main-container w3-container">
                        <Route path="/" exact={true} component={About}/>
                        <Route path="/api/start" component={Start}/>
                        <Route path="/api/strategy" component={Strategy}/>
                        <Route path="/api/service" component={Service}/>
                        <Route path="/api/grouping" component={Grouping}/>
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

    private closeSidebar(e: MouseEvent) {
        const targetEl = (e.target as HTMLElement);

        if (!targetEl.classList.contains("api-nav-button")) {
            const mySidebar = document.getElementById("mySidebar");
            const overlayBg = document.getElementById("myOverlay");

            if (mySidebar && overlayBg) {
                mySidebar.classList.add("w3-hide");
                overlayBg.classList.remove("w3-show");
            }
        }
    }

    private onAPIBtnClick(e: MouseEvent){
        const targetEl = (e.target as HTMLElement);

        if (targetEl.classList.contains("api-nav-button") && targetEl.parentElement) {
            const dropDownMenu = targetEl.parentElement.querySelector(".w3-dropdown-content");
            if (dropDownMenu) {
                this.toggleAPIDropDown(dropDownMenu);
            }
        }
    }

    private toggleAPIDropDown(el: Element){
        if (el) {
            const cls = "w3-show";
            const clsList = el.classList;
            clsList.contains(cls) ? clsList.remove(cls) : clsList.add(cls);
        }
    }
}

export default App;
