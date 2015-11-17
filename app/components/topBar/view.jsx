import React from 'react';
import LocalisationComponent from '../localisation/view.jsx';

class TobBarComponent extends React.Component {

    _getInitialState() {
        return {
            locale: this.LocalisationStore.getCurrentLocale()
        }
    }

    componentWillMount() {
        this.flux = this.context.flux;
        this.LocalisationStore = this.flux.getStore('LocalisationStore');
        this.state = this._getInitialState();
    }

    render() {
        console.log(this.state.locale)
        return(
            <nav className="navbar">
                <a className="navbar-brand" href={this.state.locale !== "en" ? '/' + this.state.locale : '/'}>
                    <img className="logo" src="https://www.citywonders.com/images/logo-retina.png" alt="City Wonders" />
                </a>
                <ul className="nav navbar-nav pull-right">
                  <li className="nav-item">
                    <LocalisationComponent />
                  </li>
                </ul>
            </nav>
        )
    }
}

TobBarComponent.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

export default TobBarComponent;
