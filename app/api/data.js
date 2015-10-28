import tourDetails from './tourDetails.json';
import toursData from './tours.json';
import fs from 'node-fs';

let obj

class Api {
    constructor() {

    }

    getToursData() {

        return new Promise((resolve, reject) => {
            fs.readFile('./app/api/tours.json', 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                resolve(obj.tours);
            });
        })
    }

    getTourDetailData(city, tourName) {
        return new Promise((resolve, reject) => {
            fs.readFile('./app/api/tourDetails.json', 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                resolve(obj['data'][city][tourName]);
            });

        })
    }
}

export default new Api();
