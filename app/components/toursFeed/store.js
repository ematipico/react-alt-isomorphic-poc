import Sorter from '../sorter/sorter.js';

class ToursFeedStore {
    constructor() {
        this.AppActions = this.alt.getActions('AppActions');
        this.CategoryFilterStore = this.alt.getStore('CategoryFilterStore');
        this.LocalisationStore = this.alt.getStore('LocalisationStore');
        this.bindActions(this.AppActions);
        this.cachedTours = {};
        this.currentCategories = [];
        this.currentCriteria = '';
        this.criteria = [
            {
                label: 'From min price',
                name: 'min-price'

            },
            {
                label: 'From max price',
                name: 'max-price'
            }
        ];

    }

    onLoadAllTours(opts) {
        this.cachedTours = opts.tours;
        this.setState({
            tours: opts.tours,
            locale: opts.locale
        })
    }

    onSortData(criteriaName) {
        var tours = this.tours;
        var self = this;
        this.criteria.some((crt) => {
            if (crt.name === criteriaName) {
                this.currentCriteria = crt;
                self._orderTours(crt);
                return true
            }
        })
        this.setState({
            tours: this.tours,
            locale: this.locale
        });
        this.emitChange();
    }

    onUpdateCategories(filter) {
        if (filter.checked) {
            this.currentCategories[filter.idx] = filter.category;
        } else {
            delete this.currentCategories[filter.idx]
        }
        var filteredTours = this._filterList();
        this.setState({
            tours: filteredTours,
            locale: this.locale
        });
        this._orderTours(this.currentCriteria);
        this.emitChange();
    }

    _filterList() {
        var finalTours = [];
        this.cachedTours.forEach((tour, idx) => {
            if (_.intersection(tour.categories, this.currentCategories).length > 0) {
                finalTours.push(tour);
            }
        });
        return finalTours.length == 0 ? this.cachedTours : finalTours;
    }

    _orderTours(crt) {
        if (crt.name == 'min-price') {
            this.tours = Sorter.MinPriceOrder(this.tours);
        } else if (crt.name == 'max-price') {
            this.tours = Sorter.MaxPriceOrder(this.tours);
        }
    }

}

export default ToursFeedStore;
