import _ from 'lodash';
import flux from '../../flux.js';

class CategoryFilterStore {
    constructor() {
        this.AppActions = this.alt.getActions('AppActions');
        this.bindActions(this.AppActions);
        this.filters = [];
    }


    onLoadAllTours(opts) {
        this._fetchFilters(opts.tours);
        this.setState({
            filters: this.filters
        });
    }

    onUpdateCategories(filter) {
        this.filters[filter.idx].applied = filter.checked;
        var filtersToApply = [];
        this.filters.forEach((filter) => {
            if (filter.applied === true)  {
                filtersToApply.push(filter.category);
            }
        });
        this.setState({
            filters: this.filters
        });
    }


    _fetchFilters(tours) {
        var self = this;
        self.filters = [];
        var categories = [];
        if (tours.length > 0) {
            tours.forEach((tour) => {
                if (tour.categories) {
                    categories = _.union(categories, tour.categories);
                }
            });
            categories.forEach((category, idx) => {
                self.filters.push({
                    name: category,
                    applied: false
                });
            });
        }

    }
}

export default CategoryFilterStore;
