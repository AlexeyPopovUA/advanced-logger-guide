import React, {Suspense} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './App.scss';
import Header from "./Header";
import Footer from "./Footer";
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

export default () => <BrowserRouter>
    <>
        <Header/>
        <div className="main-container">
            <Suspense fallback={<Loader/>}>
                <Switch>
                    <Route path="/" exact={true} component={About}/>
                    <Route path="/api/start" exact={true} component={Start}/>
                    <Route path="/api/strategy" exact={true} component={Strategy}/>
                    <Route path="/api/service" exact={true} component={Service}/>
                    <Route path="/api/grouping" exact={true} component={Grouping}/>
                    <Route path="/releases" exact={true} component={Releases}/>
                    <Route path="/contacts" exact={true} component={Contacts}/>
                    <Route path="/contribution" exact={true} component={Contribution}/>
                    <Route path="/devpage" exact={true} component={DevPage}/>
                    <Route component={Page404}/>
                </Switch>
            </Suspense>
        </div>
        <Footer/>
    </>
</BrowserRouter>;