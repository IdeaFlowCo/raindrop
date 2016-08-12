var React               = require('react');
var navigationItems     = require('../utils/navigationItems');

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        {
                            Object.keys(navigationItems).map((key) => <li key={key}><a onClick={this.getItemHandler(key)}>{navigationItems[key]}</a></li>)
                        }
                    </ul>
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

module.exports = NavigationBar;


