var React           = require('react');
var NavigationBar   = require('../components/navigationBar');
var Section         = require('../components/section');
var navigationItems = require('../utils/navigationItems');

class Tutorial extends React.Component {
    render() {
        return (
            <div>
                <div className="blue-background container-fluid no-padding">
                    <NavigationBar router={ this.props.router } />
                    <div className="tutorial-header-background">
                        <div className="title tutorial-title">
                            IdeaPad Tutorial
                        </div>
                    </div>
                </div>
                <Section className="grey-background" imageUrl="/assets/map.jpg" imageClassName="light-border" imageBottom={true}>
                    <div className="text-left">
                        IdeaPad enables you to collaboratively make graphs (networks) to brainstorm ideas, model networks, and pool
                        knowledge, to find insights you don’t have enough information to possibly see alone. It supports this process
                        with smart algorithms to suggest connections.
                    </div>
                </Section>
                <Section title="Create a Graph" imageUrl="/assets/create.jpg" imageClassName="light-border">
                    <div className="full-width text-left">
                        <ol>
                            <li>Go to ideapad.io (or, if already on site, first click "List" view in upper right, then click
                                "IdeaFlow" in upper left to go to the top-level).</li>
                            <li>Add a new "idea" at this top level to create a new graph. Press enter to submit.</li>
                            <li>Click on the title of the newly created "idea" to zoom inside it.</li>
                            <li>Click "Graph" in the upper right to change to Graph view.</li>
                        </ol>
                    </div>
                </Section>
                <Section className="grey-background" title="Edit a graph" imageUrl="/assets/edit.jpg" imageClassName="light-border">
                    <div className="text-left">
                        <ul className="tutorial-list">
                            <li>Double-click on the canvas to create a new node</li>
                            <li>Drag to connect nodes</li>
                            <li>To enter "move nodes mode," tap and release shift key. The cursor will change to a move icon, and
                                you can now drag nodes around. Tap shift key again to change back. You may need to click in blank
                                space to unfocus text you are editing first.</li>
                            <li>Click and drag on canvas to pan</li>
                            <li>Scroll wheel or move 2 fingers up and down on trackpad (not pinch) to zoom</li>
                            <li>To delete an edge (a connection), label it __x (we know it's janky; new UI coming soon)</li>
                            <li>Click "Allow graph to move" on the right sidebar to run an automatic layout algorithm (sidebar only
                                appears when your window is the width of the screen)</li>
                        </ul>
                    </div>
                </Section>
                <div className="container-fluid tutorial-footer-background">
                    <div className="container footer-content tutorial-footer-content">
                        <div className="footer-top">
                            <div className="footer-title">
                                About Project
                            </div>
                            <div className="tutorial-footer-section">
                                <div>
                                    <a target="_blank" href="http://home.ideapad.io">home.ideapad.io</a>
                                </div>
                                <div>
                                    <a target="_blank" href="http://ideaflow.jacobcole.net">ideaflow.jacobcole.net</a>
                                </div>
                            </div>
                            <div className="footer-title">Feature requests and bugs</div>
                            <div className="tutorial-footer-section">
                                <a target="_blank" href="http://ideapad.io/feature-requests">ideapad.io/feature-requests</a>
                            </div>
                            <div className="footer-title">Contact</div>
                            <div className="tutorial-footer-section">
                                <div>
                                    <a target="_blank" href="mailto:jacob@ideapad.io">jacob@ideapad.io</a><br />
                                    Have feedback? Got big ideas? Want a private graph? Poke me!
                                </div>
                            </div>
                            <div>
                                <a target="_blank" href="mailto:pleasecontact@ideapad.io" className="footer-button-link">
                                    <i className="footer-icon fa fa-envelope" />
                                </a>
                                <a target="_blank" href="https://twitter.com/IdeaFlowGraphs" className="footer-button-link">
                                    <i className="footer-icon fa fa-twitter-square" />
                                </a>
                            </div>
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

module.exports = Tutorial;

