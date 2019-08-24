import React, {MouseEvent, Suspense} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

import './../styles/App.scss';
import Footer from "./Footer";
import Overlay from "./component/Overlay";
import Loader from "./component/Loader";
import Page404 from "./page/404";

const About = React.lazy(() => import("./page/About"));
const Start = React.lazy(() => import("./page/Start"));
const Strategy = React.lazy(() => import("./page/Strategy"));
const Service = React.lazy(() => import("./page/Service"));
const Grouping = React.lazy(() => import("./page/Grouping"));
const Releases = React.lazy(() => import("./page/Releases"));
const Contribution = React.lazy(() => import("./page/Contribution"));
const Contacts = React.lazy(() => import("./page/Contacts"));
const DevPage = React.lazy(() => import("./page/DevPage"));

const ApiNavigationLinks = () => (
    <>
        <Link className="w3-bar-item w3-button w3-hover-black" to="/api/start">Getting started</Link>
        <Link className="w3-bar-item w3-button w3-hover-black" to="/api/strategy">Strategy</Link>
        <Link className="w3-bar-item w3-button w3-hover-black" to="/api/service">Service</Link>
        <Link className="w3-bar-item w3-button w3-hover-black" to="/api/grouping">Grouping</Link>
    </>
);

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <>
                    <div className="w3-top">
                        <div className="w3-bar w3-theme w3-left-align w3-large">
                            <a className="w3-hide-medium w3-hide-large w3-bar-item w3-button w3-right w3-hover-white w3-large w3-theme-l1"
                               onClick={this.toggleSidebar}><i className="fa fa-bars"/></a>
                            <Link className="w3-bar-item w3-button w3-hover-white w3-theme-l1" to="/">Advanced Logger</Link>
                            <div className="w3-dropdown-hover">
                                <button className="w3-button w3-hide-small w3-hover-white">API <i className="fa fa-caret-down"/></button>
                                <div className="w3-dropdown-content w3-bar-block w3-dark-grey">
                                    <ApiNavigationLinks/>
                                </div>
                            </div>
                            <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/releases">Releases</Link>
                            <Link className="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/contribution">Contribution</Link>
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
                            <button onClick={this.onAPIBtnClick} className="w3-bar-item w3-button w3-hover-black api-nav-button"><strong>&gt;</strong>&nbsp;API</button>
                            <div className="w3-dropdown-content w3-bar-block w3-border">
                                <ApiNavigationLinks/>
                            </div>
                        </div>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/releases">Releases</Link>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/contribution">Contribution</Link>
                        <Link className="w3-bar-item w3-button w3-hover-black" to="/contacts">Contacts</Link>
                    </nav>

                    <Overlay handleClick={this.closeSidebar}/>

                    <div className="main-container w3-main w3-container">
                        <Suspense fallback={<Loader/>}>
                            <Switch>
                                <Route path="/" exact={true} component={About}/>
                                <Route path="/api/start" exact={true} component={Start}/>
                                <Route path="/api/strategy" exact={true} component={Strategy}/>
                                <Route path="/api/service" exact={true} component={Service}/>
                                <Route path="/api/grouping" exact={true} component={Grouping}/>
                                <Route path="/releases/" exact={true} component={Releases}/>
                                <Route path="/contacts/" exact={true} component={Contacts}/>
                                <Route path="/contribution/" exact={true} component={Contribution}/>
                                <Route path="/devpage/" exact={true} component={DevPage}/>
                                <Route component={Page404}/>
                            </Switch>
                        </Suspense>
                    </div>

                    <Footer/>
                </>
            </BrowserRouter>
        );
    }

    private toggleSidebar(): void {
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

    private closeSidebar(e: MouseEvent): void {
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

    private onAPIBtnClick = (e: MouseEvent) => {
        const targetEl = (e.target as HTMLElement);

        if (targetEl.classList.contains("api-nav-button") && targetEl.parentElement) {
            const dropDownMenu = targetEl.parentElement.querySelector(".w3-dropdown-content");
            if (dropDownMenu) {
                this.toggleAPIDropDown(dropDownMenu);
            }
        }
    };

    private toggleAPIDropDown(el: Element): void {
        if (el) {
            const cls = "w3-show";
            const clsList = el.classList;
            clsList.contains(cls) ? clsList.remove(cls) : clsList.add(cls);
        }
    }
}
