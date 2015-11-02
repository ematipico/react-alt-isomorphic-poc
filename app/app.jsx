import React from 'react';
import ToursFeedComponent from './components/toursFeed/view.jsx';
import TourDetailComponent from './components/tourDetail/view.jsx';
import connectToStores from 'alt/utils/connectToStores';
import RouteStore from './stores/routeStore.js';
import TobBarComponent from './components/topBar/view.jsx';


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
            <div>
                <TobBarComponent />
                <div className="container">
                    {page}
                </div>
            </div>
        )
    }
}
App.childContextTypes = {
    flux: React.PropTypes.object.isRequired
};
export default App;
