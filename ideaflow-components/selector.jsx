var React   = require('react');

class Selector extends React.Component {
    render() {
        return (
            <div className="ideaflow-selector">
                <button className="ideaflow-step" onClick={this.props.onFirstStepSelected}>1</button>
                <button className="ideaflow-step ideaflow-step-middle" onClick={this.props.onFirstStepSelected}>2</button>
                <button className="ideaflow-step ideaflow-step-right" onClick={this.props.onSecondStepSelected}>3</button>
                <div className="ideaflow-line"></div>
                <div className="ideaflow-line-right"></div>
                <div className="ideaflow-selector-label-container">
                    <div className="left-label">Idea</div>
                    <div className="middle-label">Connect</div>
                    <div className="right-label">Flow</div>
                </div>
            </div>
        );
    }
}

module.exports = Selector;
