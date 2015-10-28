import React from 'react';
import ToursFeedComponent from './components/toursFeed/view.jsx';
import TourDetailComponent from './components/tourDetail/view.jsx';
import connectToStores from 'alt/utils/connectToStores';
import RouteStore from './stores/routeStore.js';


class App extends React.Component {
    getChildContext() {
        return {
            flux: this.props.flux || new Error('flux not found!')
        };
    }

    constructor(props) {
        super(props);

        this.RouteStore = this.props.flux.getStore('RouteStore');
        this.ToursFeedStore = this.props.flux.getStore('ToursFeedStore');
        this.state = this.RouteStore.getState();

        this._onChange = this._onChange.bind(this);


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
        console.log('this is the current view ', this.RouteStore.getCurrentView() )
        if (this.state.currentView == 'master') {
            page = <ToursFeedComponent />
        } else {
            page = <TourDetailComponent />
        }
        return (
            <div className="container">
            {page}
            </div>

        )
    }
}
App.childContextTypes = {
    flux: React.PropTypes.object.isRequired
};
export default App;
