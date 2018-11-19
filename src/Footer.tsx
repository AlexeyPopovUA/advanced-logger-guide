import * as React from "react";

export default class Footer extends React.Component {
    public render() {
        return (
            <footer id="myFooter">
                <div className="w3-container w3-theme-l2 w3-padding-32">
                    <h4>Footer</h4>
                </div>

                <div className="w3-container w3-theme-l1">
                    <p>Developed by <a href="https://alexeypopovua.github.io/about-myself"
                                       target="_blank">Oleksii Popov</a></p>
                    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp"
                                     target="_blank">w3.css</a></p>
                </div>
            </footer>
        );
    }
}