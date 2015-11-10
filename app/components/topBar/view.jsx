import React from 'react';
import LocalisationComponent from '../localisation/view.jsx';

class TobBarComponent extends React.Component {
    render() {
        return(
            <nav className="navbar">
                <a className="navbar-brand" href="/">
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

export default TobBarComponent;
