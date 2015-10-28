import Alt from '../alt';
import API from '../api/data.js';

class AppActions {
    constructor() {
        this.generateActions(
			'loadAllTours',
			'loadOneTour'
		);
    }

    toursFeeds() {
        var self = this;
        return API.getToursData().then(
            function success(tours) {
                self.alt.getActions('AppActions').loadAllTours(tours);
            }
        );
    }


    tourDetail(city, tourName, resolve) {
        var self = this;
        return API.getTourDetailData(city, tourName).then(
            function success(tour) {
                self.alt.getActions('AppActions').loadOneTour(tour);
                return new Promise((resolve) => {
                    resolve(tour.SEO)
                });
            }
        );
    }

}
export default AppActions;
