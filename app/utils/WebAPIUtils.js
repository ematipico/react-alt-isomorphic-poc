import AppActions from '../actions/appActions.js';

class Utils {
    getAllData() {
      return new Promise((resolve) => {
          AppActions.getData(resolve)
      });
    }

    getTourData(city, tourName) {
        return new Promise((resolve, reject) => {
            AppActions.getTourData({
                city: city,
                tourName: tourName,
                resolve: resolve,
                reject: reject
            });
        })
    }
}

export default new Utils();
