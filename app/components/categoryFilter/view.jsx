import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" value={this.props.name} name="category" onChange={this.props.action} checked={this.props.applied ? 'checked' : ''} /> {this.props.name}
                </label>
            </div>
        )
    }

}

class CategoryFilterComponent extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onInputChange = this._onInputChange.bind(this);

    }

    componentWillMount() {
        this.flux = this.context.flux;
        this.AppActions = this.flux.getActions('AppActions');
        this.CategoryFilterStore = this.flux.getStore('CategoryFilterStore');
        this.state = this.CategoryFilterStore.getState();
    }

    componentDidMount() {
        this.CategoryFilterStore.listen(this._onChange);
    }

    componentWillUnmount() {
        this.CategoryFilterStore.unlisten(this._onChange);
    }

    _onChange() {
        this.setState(this.CategoryFilterStore.getState())
    }

    _onInputChange(idx, evt) {
        this.AppActions.updateCategories({
            category: evt.target.value,
            checked: evt.target.checked,
            idx: idx
        })
    }

    render() {
        let allFilters = this.state.filters;
        let htmlFilters = [];

        return(
            <form className="inline-form sidebar">
                <fieldset>
                {allFilters.map((filter, idx) => {
                    var click = this._onInputChange.bind(this, idx);
                    return (
                        <Filter key={idx} name={filter.name} applied={filter.applied} action={click} />
                    )
                })}
                </fieldset>
            </form>
        )
    }
}

CategoryFilterComponent.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

export default CategoryFilterComponent;
