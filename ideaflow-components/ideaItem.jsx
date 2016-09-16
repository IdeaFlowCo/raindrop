var React   = require('react');
var Select  = require('react-select');

class IdeaItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let values = this.optionsFromIdeas(this.getConnectedIdeas()).map((option, index, array) => {
            return option.value;
        });
        return (
            <div className="idea-item">
                <div className="delete-item" onClick={this.getOnDeleteClickHandler()}>×</div>
                <div className="idea-text">
                    {this.props.idea.text}
                </div>
                Connected ideas
                <Select
                    ref="select"
                    value={values}
                    multi={true}
                    placeholder=""
                    options={this.optionsFromIdeas(this.getSuggestedIdeas())}
                    onChange={this.getOnChangeHandler()} />
            </div>
        )
    }

    getOnDeleteClickHandler() {
        return () => {
            this.props.onDeleteItem(this.props.idea);
        }
    }

    getOnChangeHandler() {
        return (currentConnectedOptions) => {
            let existingConnectedIdeas = this.getConnectedIdeas();
            let existingConnectedOptions = this.optionsFromIdeas(existingConnectedIdeas);
            if (existingConnectedOptions.length > currentConnectedOptions.length) {
                existingConnectedOptions.forEach((option, index, array) => {
                    if (!this.containsOption(currentConnectedOptions, option)) {
                        this.props.onRemoveConnection(this.props.idea, existingConnectedIdeas[index]);
                    }
                });
            } else if (existingConnectedOptions.length < currentConnectedOptions.length) {
                currentConnectedOptions.forEach((option, index, array) => {
                    if (!this.containsOption(existingConnectedOptions, option)) {
                        this.props.onAddConnection(this.props.idea, this.ideaFromIdeaText(option.value));
                    }
                });
            }
        };
    }

    containsOption(searchOptions, searchOption) {
        let found = false;
        searchOptions.forEach((option, index, options) => {
            if (option.value === searchOption.value) {
                found = true;
            }
        });
        return found;
    }

    ideaFromIdeaText(text) {
        for (let i = 0; i < this.props.ideas.length; i++) {
            if (this.props.ideas[i].text === text) {
                return this.props.ideas[i];
            }
        }
    }

    optionsFromIdeas(ideas) {
        return ideas.map((idea, index, array) => {
            return { 'value': idea.text, 'label': idea.text};
        });
    }
    
    getSuggestedIdeas() {
        let ideas = [];
        this.props.ideas.forEach((idea, index, array) => {
            if (idea.text !== this.props.idea.text) {
                ideas.push(idea);
            }
        });
        return ideas;
    }

    getConnectedIdeas() {
        let ideas = [];
        let indexOfCurrentIdea = this.props.ideas.indexOf(this.props.idea);
        this.props.connections.forEach((connection, index, array) => {
            if (connection.source === indexOfCurrentIdea) {
                ideas.push(this.props.ideas[connection.target]);
            } else if (connection.target == indexOfCurrentIdea) {
                ideas.push(this.props.ideas[connection.source]);
            }
        });
        return ideas;
    }
}

module.exports = IdeaItem;
