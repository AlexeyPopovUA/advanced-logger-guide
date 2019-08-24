import React from "react";
import marked from "marked";

interface IState {
    content: string
}

export default class Releases extends React.Component<any, IState> {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };

        Releases.configureMDParser();
    }

    async componentDidMount() {
        const content = await Releases.fetchReleases();
        this.setState({content: marked(content)});
    }

    public render() {
        if (this.state.content) {
            return (
                <>
                    <section className="hero is-light">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">Releases</h1>
                            </div>
                        </div>
                    </section>
                    <section className="section page-content page-about">
                        <div className="container">
                            <div className="page-content content">
                                <div dangerouslySetInnerHTML={{__html: this.state.content}}/>
                            </div>
                        </div>
                    </section>
                </>
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
            //level++;
            return text !== "Changelog" ? `<h${level} class="title">${text}</h${level}>` : "";
        };

        marked.setOptions({renderer});
    }
}