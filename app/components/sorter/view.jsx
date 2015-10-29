import React from 'react';

class SorterComponent extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onCriteriaChange = this._onCriteriaChange.bind(this);
    }

    componentWillMount() {
        this.flux = this.context.flux;
        this.AppActions = this.flux.getActions('AppActions');
        this.SorterStore = this.flux.getStore('SorterStore');
    }

    componentDidMount() {
        this.SorterStore.listen(this._onChange);
    }

    componentWillUnmount() {
        this.SorterStore.unlisten(this._onChange);
    }

    _onChange() {

    }
    /*
    It fires the action to sort the data    
    */
    _onCriteriaChange(evt) {
        this.AppActions.sortData(evt.target.value);
    }

    render() {
        return (
            <div>
                <select name="sortCriteria" onChange={this._onCriteriaChange}>
                    <option value=""></option>
                    {this.props.criteria.map((crt, idx) => {
                        return <option key={crt.name} value={crt.name}>{crt.label}</option>
                    })}
                </select>
            </div>
        )
    }
}

SorterComponent.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

export default SorterComponent;
