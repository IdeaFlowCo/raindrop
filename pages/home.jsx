var React           = require('react');
var HeaderGraph     = require('../components/headerGraph');
var NavigationBar   = require('../components/navigationBar');
var Section         = require('../components/section');
var navigationItems = require('../utils/navigationItems');
var $               = require('jquery');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            active: props.active
        };

        this.resizeHandler = () => {
            this.setState({
                canvasWidth: $(this.refs.home).width(),
                canvasHeight: $(this.refs.home).height()
            });
        }
    }

    componentDidMount() {
        this.updateScrollState();
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.active !== this.props.active) {
            this.setState({
                active: this.props.active
            });
        } else if (prevState.active !== this.state.active) {
            this.updateScrollState();
        }
    }

    updateScrollState() {
        if (this.state.active) {
            $('html, body').animate({
                scrollTop: $(this.refs[this.props.active]).offset().top
            }, 500);
        } else {
            $('html, body').animate({
                scrollTop: $(this.refs.home).offset().top
            }, 500);
        }
    }

    render() {
        return (
            <div>
                <div className="full-window-height blue-background container-fluid no-padding">
                    <NavigationBar router={this.props.router} />
                    <div ref="home" className="header-container">
                        <HeaderGraph canvasWidth={ this.state.canvasWidth } canvasHeight={ this.state.canvasHeight }/>
                        <div className="section-container container header-content">
                            <div className="title">
                                IdeaFlow
                            </div>
                            <div className="subtitle">
                                A database of connected ideas
                            </div>
                            <a className="header-button-link" target="_blank" href="https://ideapad.io/augmented-reality-industry/graph">
                                <button className="clear-button header-button">
                                    Try it
                                </button>
                            </a>
                            <a className="header-button-link" target="_blank" href="https://www.youtube.com/watch?v=Y7kEWftAUsY">
                                <button className="play-button clear-button header-button">
                                    <div className="play-button-icon"></div>
                                    Watch video
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div ref="about">
                    <Section className="grey-background" title="A shared brain for organizations" imageUrl="/assets/shared-brain.svg">
                        Let's face it, we like to work together. Collaboratively build and manage your networks &mdash; of people, ideas, and knowledge.
                    </Section>
                </div>
                <div ref="product">
                    <Section ref="product" title="IdeaFlow powers everybody to be a superconnector" imageUrl="/assets/example_graph.svg">
                        <div className="full-width text-left">
                            People hold the pieces to each others' puzzles without knowing it. Connect ideas.
                            AI suggests more connections.
                            <div className="vertical-spacing"></div>
                            <span className="small-text">Check out the:<br />
                                <a target="_blank" href="https://ideapad.io/yclist/graph">Hackathon Brainstorming</a>
                                <span className="horizontal-text-spacing" />
                                <a target="_blank" href="https://ideapad.io/hackathon-ideas">YC Startup Graph</a>
                            </span>
                        </div>
                    </Section>
                </div>
                <Section className="grey-background" title="Connect information on the Web like you do in your brain" imageUrl="/assets/connect-ideas.png">
                    Human semantic memory stores knowledge in graphs, but text documents can't represent them.
                </Section>
                <div ref="contact" className="container-fluid footer-background">
                    <div className="container footer-content">
                        <div className="footer-top">
                            <div className="footer-title">
                                Connect to IdeaFlow
                            </div>
                            <a target="_blank" href="mailto:pleasecontact@ideapad.io" className="footer-button-link">
                                <i className="footer-icon fa fa-envelope" />
                            </a>
                            <a target="_blank" href="https://twitter.com/IdeaFlowGraphs" className="footer-button-link">
                                <i className="footer-icon fa fa-twitter-square" />
                            </a>
                        </div>
                        <div>
                            {
                                Object.keys(navigationItems).map((key) => <div className="footer-item" key={key}><a onClick={this.getItemHandler(key)}>{ navigationItems[key] }</a></div>)
                            }
                        </div>
                        <div className="copyright">Copyright © IdeaFlow, Inc. 2016. All Rights Reserved.</div>
                    </div>
                </div>
            </div>
        );
    }

    getItemHandler(key) {
        return () => {
            if (this.props.router) {
                this.props.router.navigate('/' + key, true);
            }
        }
    }
}

module.exports = Home;
