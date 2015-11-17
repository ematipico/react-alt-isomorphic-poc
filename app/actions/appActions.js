import Alt from '../alt';
import API from '../api/data.js';

class AppActions {
    constructor() {
        this.generateActions(
			'loadAllTours',
			'loadOneTour',
            'updateCategories',
            'sortToursList',
            'sortData',
            'changeLanguage'
		);
    }

    toursFeeds(locale) {
        var self = this;
        return API.serverGetToursData(locale).then(
            function success(tours) {
                self.alt.getActions('AppActions').loadAllTours({tours: tours, locale: locale});
            }
        );
    }


    tourDetail(city, tourName, locale) {
        var self = this;
        return API.serverGetTourDetailData(city, tourName, locale).then(
            function success(tour) {
                self.alt.getActions('AppActions').loadOneTour(tour);
                return new Promise((resolve) => {
                    resolve(tour.SEO);
                });
            }
        );
    }

    updateToursFeed(lang) {
        var self = this;
        API.ajaxGetToursData(lang).then(
            function success(tours) {
                self.alt.getActions('AppActions').loadAllTours({tours: tours, locale: lang});
            }
        );
    }

}
export default AppActions;
