var React           = require('react');
var HeaderGraph     = require('../components/headerGraph');
var NavigationBar   = require('../components/navigationBar');
var Section         = require('../components/section');
var navigationItems = require('../utils/navigationItems');
var $               = require('jquery');
var Modal           = require('react-modal');

const MODAL_STYLE = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.5)',
        zIndex            : 999999
    },
    content : {
        position                   : 'absolute',
        top                        : '50%',
        bottom                     : 'auto',
        left                       : '50%',
        right                      : 'auto',
        transform                  : 'translateX(-50%) translateY(-50%)',
        border                     : 'none',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '0px',
        outline                    : 'none',
        padding                    : '0px',
        marginLeft                 : 'auto',
        marginRight                : 'auto',
        width                      : 'auto'
    }
};

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            active: props.active,
            modalOpen: false
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
                <Modal
                    isOpen={this.state.modalOpen}
                    onRequestClose={() => {this.setState({"modalOpen": false})}}
                    style={MODAL_STYLE}>
                    <iframe width="600" height="338" src="https://www.youtube.com/embed/Y7kEWftAUsY?autoplay=1" frameborder="0" allowfullscreen></iframe>
                </Modal>
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
                            <button className="play-button clear-button header-button" onClick={() => {this.setState({"modalOpen": true})}}>
                                <div className="play-button-icon"></div>
                                Watch video
                            </button>
                        </div>
                    </div>
                </div>
                <div ref="product">
                    <Section className="grey-background" ref="product" title="IdeaFlow powers everybody to be a superconnector" imageWidth={350} imageHeight={275} imageUrl="/assets/graph_demo.png">
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
                <div ref="about">
                    <Section title="A shared brain for organizations" imageWidth={344} imageHeight={282} imageUrl="/assets/collaboration.png">
                        Let's face it, we like to work together. Collaboratively build and manage your networks &mdash; of people, ideas, and knowledge.
                    </Section>
                </div>
                <Section className="grey-background" title="Connect information on the Web like you do in your brain" imageWidth={404} imageHeight={72} imageUrl="/assets/linked_ideas.svg">
                    Human semantic memory stores knowledge in graphs, but text documents can't represent them.
                    <div className="call-to-action-container">
                        <img className="person-image" height={78} src="/assets/person.png" />
                        <a href="https://ideapad.io/augmented-reality-industry/graph">
                            <button className="button yellow-button">
                                Get Started<div className="inline-spacing"></div>
                                <img src="/assets/arrow.svg" height="10px" />
                            </button>
                        </a>
                    </div>
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
