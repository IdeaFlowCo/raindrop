var Backbone        = require('backbone');
var React           = require('react');
var ReactDOM        = require('react-dom');
var Home            = require('../pages/home');
var Tutorial        = require('../pages/tutorial');
var navigationItems = require('../utils/navigationItems');

window.jQuery = require('jquery');
require('bootstrap');

var routes = {};
Object.keys(navigationItems).forEach(key => {
    routes[key] = key
});

routes[""] = "index";

var routerInstance;

var Router = Backbone.Router.extend({
    routes : routes,
    index: () => {
        ReactDOM.render(
            <Home router={ routerInstance } />,
            document.getElementById('react-root')
        );
    },
    about: () => {
        ReactDOM.render(
            <Home router={ routerInstance } active="about" />,
            document.getElementById('react-root')
        );
    },
    product: () => {
        ReactDOM.render(
            <Home router={ routerInstance } active="product" />,
            document.getElementById('react-root')
        );
    },
    contact: () => {
        ReactDOM.render(
            <Home router={ routerInstance } active="contact" />,
            document.getElementById('react-root')
        );
    },
    tutorial: () => {
        window.scrollTo(0, 0);
        ReactDOM.render(
            <Tutorial router={ routerInstance } />,
            document.getElementById('react-root')
        );
    }
});

routerInstance = new Router();

Backbone.history.start({ pushState: true });
