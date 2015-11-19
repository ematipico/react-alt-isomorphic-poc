import React from 'react';
import ToursFeedComponent from './components/toursFeed/view.jsx';
import TourDetailComponent from './components/tourDetail/view.jsx';
import connectToStores from 'alt/utils/connectToStores';
import RouteStore from './stores/routeStore.js';
import TobBarComponent from './components/topBar/view.jsx';
import locales from './components/localisation/intl-loader.js';
import locales2 from './components/localisation/intl-polyfill.js';
import { IntlProvider, FormattedMessage} from 'react-intl';

class InnerApp  extends React.Component {
    render() {
        return (
            <div>
                <TobBarComponent />
                <h1><FormattedMessage {...this.props.mex} /></h1>
                <div className="container">
                    {this.props.page}
                </div>
            </div>
        )

    }
}

class App extends React.Component {
    getChildContext() {
        return {
            flux: this.props.flux || new Error('flux not found!'),
            messages: this.LocalisationStore.getCurrentMessages()
        };
    }

    _getInitialState() {
        return {
            currentView: this.RouteStore.getCurrentView(),
            currentLocale: this.LocalisationStore.getCurrentLocale(),
            currentMessages: this.LocalisationStore.getCurrentMessages()
        }
    }

    constructor(props) {
        super(props);
        this.RouteStore = this.props.flux.getStore('RouteStore');
        this.ToursFeedStore = this.props.flux.getStore('ToursFeedStore');
        this.LocalisationStore = this.props.flux.getStore('LocalisationStore');
        this.state = this._getInitialState();

        this._onChange = this._onChange.bind(this);


    }

    componentDidMount() {
        // this.state = this._getInitialState();
    }


    componentWillMount() {
        this.RouteStore.listen(this._onChange);
    }

    componentWillUnMount() {
        this.RouteStore.unlisten(this._onChange);
    }

    _onChange() {

    }

    render() {
        let page = null;
        if (this.state.currentView == 'master') {
            page = <ToursFeedComponent />
        } else {
            page = <TourDetailComponent />
        }
        return (
            <IntlProvider locale={this.state.currentLocale} messages={this.state.currentMessages}>
                <InnerApp page={page} mex={this.state.currentMessages.home} />
            </IntlProvider>
        )
    }
}
App.childContextTypes = {
    flux: React.PropTypes.object.isRequired,
    messages: React.PropTypes.object.isRequired
};
export default App;
