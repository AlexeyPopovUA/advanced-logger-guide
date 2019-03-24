import React from "react";
import marked from "marked";

export default class Releases extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            content: ""
        };

        Releases.configureMDParser();
        Releases.fetchReleases().then(content => this.setState({content: marked(content)}));
    }

    public render() {
        if (this.state.content) {
            return (
                <div className="page-content page-releases">
                    <h1 className="w3-text-teal">Releases</h1>
                    <div className="page-content">
                        <p dangerouslySetInnerHTML={{__html: this.state.content}}/>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }

    private static async fetchReleases() {
        let response, content = "";

        try {
            response = await fetch("https://raw.githubusercontent.com/AlexeyPopovUA/advanced-logger/master/CHANGELOG.md");
        } catch {
            // It's a plan B :)
            response = await fetch("CHANGELOG.md");
        } finally {
            if (response) {
                content = await response.text();
            }
        }

        return content;
    }

    private static configureMDParser(): void {
        const renderer = new marked.Renderer();

        renderer.heading = (text: string, level: number) => {
            level++;
            return text !== "Change Log" ? `<h${level}>${text}</h${level}>` : "";
        };

        marked.setOptions({renderer});
    }
}

interface IState {
    content: string
}
