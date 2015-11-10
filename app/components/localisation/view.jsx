import React from 'react';

class LocalisationComponent extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._getInitialState = this._getInitialState.bind(this);
        this._onChangeLanguage = this._onChangeLanguage.bind(this);
    }

    _getInitialState() {
        return {
            currentLocale: this.LocalisationStore.getCurrentLocale(),
            availableLanguages: this.LocalisationStore.getAvailableLanguages(),
            currentLabel : this.LocalisationStore.getCurrentLabel()
        }
    }


    componentWillMount() {
        this.flux = this.context.flux;
        this.AppActions = this.flux.getActions('AppActions');
        this.LocalisationStore = this.flux.getStore('LocalisationStore');
        this.state = this._getInitialState();
    }

    componentDidMount() {
        this.LocalisationStore.listen(this._onChange);
    }

    componentWillUnmount() {
        this.LocalisationStore.unlisten(this._onChange);
    }

    _onChange() {
        this.setState(this._getInitialState());
    }

    _onChangeLanguage(evt) {
        this.AppActions.changeLanguage(JSON.parse(evt.target.dataset.language));
    }

    render() {
        let currentLocale = this.state.currentLocale;
        let availableLanguages =  this.state.availableLanguages;
        let clicFn = this._onChangeLanguage;
        return (
            <div className="btn-group lang-label">
              <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Current language: {this.state.currentLabel}
              </button>
              <div className="dropdown-menu">
                {availableLanguages.map(function(lang, idx) {
                    if (currentLocale !== lang.locale) {
                        return <a key={idx} className="dropdown-item" href="#" onClick={clicFn} data-language={JSON.stringify(lang)}>{lang.label}</a>
                    }
                })}
              </div>
            </div>
        )
    }

}

LocalisationComponent.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

export default LocalisationComponent;
