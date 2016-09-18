var React       = require('react');
var IdeaView    = require('./ideaView');
var GraphView   = require('./graphView');
var Selector    = require('./selector');

const INITIAL_IDEAS = {
    "ideas": [
        {
            "text": "Dogs"
        },
        {
            "text": "Cats"
        },
        {
            "text": "Pets"
        }

    ],
    "connections": [
        {
            "source": 0,
            "target": 2
        },
        {
            "source": 1,
            "target": 2
        }
    ]
};

class IdeaflowDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_IDEAS;
        this.state.selectAddIdea = true;
    }

    render() {
        return (
            <div className="ideaflow-demo">
                <Selector onFirstStepSelected={this.getOnIdeaSelectHandler()}
                          onSecondStepSelected={this.getOnConnectSelectHandler()}
                          onThirdStepSelected={this.getOnGraphSelectHandler()} />
                {
                    this.state.graphVisible ?
                    <GraphView nodes={this.state.ideas}
                               edges={this.state.connections} /> :
                    <IdeaView ref="ideaView"
                              ideas={this.state.ideas}
                              connections={this.state.connections}
                              newIdeaHandler={this.getNewIdeaHandler()}
                              addConnectionHandler={this.getAddConnectionHandler()}
                              removeConnectionHandler={this.getRemoveConnectionHandler()}
                              deleteItemHandler={this.getDeleteItemHandler()}
                              selectAddIdea={this.state.selectAddIdea}
                              selectFirstConnectIdeaField={this.state.selectFirstConnectIdeaField} />
                }
            </div>
        );
    }

    getDeleteItemHandler() {
        return (item) => {
            let itemIndex = this.state.ideas.indexOf(item);
            if (itemIndex === -1) {
                return;
            }
            let connections = this.state.connections.filter((connection, index, array) => {
                return connection.source !== itemIndex && connection.target !== itemIndex;
            });
            connections.forEach((connection, index, array) => {
                if (connection.source > itemIndex) {
                    connection.source -= 1;
                }
                if (connection.target > itemIndex) {
                    connection.target -= 1;
                }
            });
            let ideas = this.state.ideas;
            ideas.splice(itemIndex, 1);
            this.setState({
                ideas: ideas,
                connections: connections
            });
        }
    }

    getOnIdeaSelectHandler() {
        return () => {
            this.setState({
                "graphVisible": false,
                "selectAddIdea": true,
                "selectFirstConnectIdeaField": false
            });
            if (!this.refs.ideaView) {
                return;
            }
            this.refs.ideaView.selectAddIdea();
        }
    }

    getOnConnectSelectHandler() {
        return () => {
            this.setState({
                "graphVisible": false,
                "selectAddIdea": false,
                "selectFirstConnectIdeaField": true
            });
            if (!this.refs.ideaView) {
                return;
            }
            this.refs.ideaView.selectFirstConnectIdeaField();
        }
    }

    getOnGraphSelectHandler() {
        return () => {
            this.setState({
                "graphVisible": true,
                "selectAddIdea": false,
                "selectFirstConnectIdeaField": false
            });
        }
    }

    getNewIdeaHandler() {
        return (idea) => {
            let ideasList = this.state.ideas;
            ideasList.push({
                "text": idea
            });
            this.setState({
                "nodes": ideasList
            });
        }
    }

    getAddConnectionHandler() {
        return (idea1, idea2) => {
            let ideaIndex1 = this.state.ideas.indexOf(idea1);
            let ideaIndex2 = this.state.ideas.indexOf(idea2);
            let connections = this.state.connections;
            connections.push({
                'source': ideaIndex1,
                'target': ideaIndex2
            });
            this.setState({
                'connections': connections
            });
        }
    }

    getRemoveConnectionHandler() {
        return (idea1, idea2) => {
            let connection = this.findConnectionWithIdeaTexts(idea1, idea2);
            let connections = this.state.connections;
            connections.splice(this.state.connections.indexOf(connection), 1);
            this.setState({
                'connections': connections
            });
        }
    }

    findConnectionWithIdeaTexts(idea1, idea2) {
        let ideaIndex1 = this.state.ideas.indexOf(idea1);
        let ideaIndex2 = this.state.ideas.indexOf(idea2);
        let foundConnection = null;
        this.state.connections.forEach((connection, index, array) => {
            if (connection.source === ideaIndex1 && connection.source === ideaIndex2) {
                foundConnection = connection;
            } else if (connection.target === ideaIndex1 && connection.target === ideaIndex2) {
                foundConnection = connection;
            }
            return connection;
        });
    }

}

module.exports = IdeaflowDemo;
