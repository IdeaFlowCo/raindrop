var React   = require('react');

class Section extends React.Component {
    render() {
        let imageElement = (
            <div className="section-image">
                <img className={ this.props.imageClassName} src={ this.props.imageUrl }/>
            </div>
        );

        let titleElement = (
            <div className="section-title">
                { this.props.title }
            </div>
        );
        return (
            <div className={ `container-fluid ${this.props.className ? this.props.className : ''}` }>
                <div className="container section-container">
                    { this.props.title ? titleElement : null }
                    { this.props.imageBottom ? null : imageElement }
                    <div className="section-content">
                        { this.props.children }
                    </div>
                    { this.props.imageBottom ? imageElement : null }
                </div>
            </div>
        );
    }
}

module.exports = Section;
