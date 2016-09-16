var React     = require('react');
var IdeaItem  = require('./ideaItem');

class IdeaView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="idea-view">
                <input className="idea-input"
                             ref="newIdeaInput" type="text"
                             placeholder="Add an Idea" onKeyPress={this.getNewIdeaInputHandler()} />
                {
                    this.props.ideas.concat().reverse().map((element, index, array) => {
                        return (
                            <IdeaItem key={index} idea={element} ideas={this.props.ideas}
                                                connections={this.props.connections}
                                                onAddConnection={this.props.addConnectionHandler}
                                                onRemoveConnection={this.props.removeConnectionHandler}
                                                onDeleteItem={this.props.deleteItemHandler} />
                        );
                    })
                }
            </div>
        )
    }

    getNewIdeaInputHandler() {
        return (event) => {
            if (event.key == "Enter" && this.refs.newIdeaInput.value !== "") {
                this.props.newIdeaHandler(this.refs.newIdeaInput.value);
                this.refs.newIdeaInput.value = "";
            }
        }
    }
}

module.exports = IdeaView;
