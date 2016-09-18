var React       = require('react');
var classNames  = require('classnames');

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "selected": 1
        };
    }

    render() {
        return (
            <div className="ideaflow-selector">
                <button className={classNames("non-highlightable", "ideaflow-step",
                            {"selected": this.state.selected == 1})}
                        onClick={this.getOnFirstStepSelectedHandler()}>
                  1
                </button>
                <button className={classNames("non-highlightable", "ideaflow-step", "ideaflow-step-middle",
                            {"selected": this.state.selected == 2})}
                        onClick={this.getOnSecondStepSelectedHandler()}>
                  2
                </button>
                <button className={classNames("non-highlightable", "ideaflow-step", "ideaflow-step-right",
                            {"selected": this.state.selected == 3})}
                        onClick={this.getOnThirdStepSelectedHandler()}>
                  3
                </button>
                <div className="ideaflow-line"></div>
                <div className="ideaflow-line-right"></div>
                <div className="ideaflow-selector-label-container">
                    <div className="non-highlightable left-label">Idea</div>
                    <div className="non-highlightable middle-label">Connect</div>
                    <div className="non-highlightable right-label">Flow</div>
                </div>
            </div>
        );
    }

    getOnFirstStepSelectedHandler() {
        return () => {
            this.setState({
                "selected": 1
            });
            this.props.onFirstStepSelected();
        }

    }

    getOnSecondStepSelectedHandler() {
        return () => {
            this.setState({
                "selected": 2
            });
            this.props.onSecondStepSelected();
        }
    }

    getOnThirdStepSelectedHandler() {
        return () => {
            this.setState({
                "selected": 3
            });
            this.props.onThirdStepSelected();
        };
    }
}

module.exports = Selector;
