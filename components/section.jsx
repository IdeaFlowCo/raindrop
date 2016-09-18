var React       = require('react');
var classNames  = require('classnames');

class Section extends React.Component {
    render() {
        let imageClickable = this.props.imageOnClick !== undefined && this.props.imageOnClick !== null;
        let imageElement = this.props.imageUrl ? (
            <div className="section-image">
                <img onClick={this.props.imageOnClick}
                    className={classNames({
                        "pointer": imageClickable,
                        "hover": imageClickable
                    })}
                    width={this.props.imageWidth}
                    height={this.props.imageHeight}
                    src={ this.props.imageUrl }/>
            </div>
        ) : null;

        let titleElement = (
            <div className="section-title">
                { this.props.title }
            </div>
        );
        return (
            <div className={ `container-fluid ${this.props.className ? this.props.className : ''}` }>
                <div className="container section-container">
                    { this.props.title ? titleElement : null }
                    { imageElement }
                    <div className="section-content">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Section;
