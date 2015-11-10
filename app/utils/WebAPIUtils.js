import AppActions from '../actions/appActions.js';
import xhr from './xhr.js';
class Utils {
    constructor() {
        this.Ajax = new xhr();
    }
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
