import tourDetails from './tourDetails.json';
import toursData from './tours.json';
import fs from 'fs';
import Utils from '../utils/WebAPIUtils.js';

let obj

class Api {
    constructor() {

    }

    // SERVER SIDE METHOD
    serverGetToursData(locale) {
        return new Promise((resolve, reject) => {
            fs.readFile('./data/tours.'+locale+'.json', 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                resolve(obj.tours);
            });
        })
    }

    // SERVER SIDE METHOD
    serverGetTourDetailData(city, tourName, locale) {
        return new Promise((resolve, reject) => {
            fs.readFile('./data/tourDetails.'+locale+'.json', 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                resolve(obj['data'][city][tourName]);
            });

        })
    }

    ajaxGetToursData(lang) {
        var config = {
            url: './data/tours.'+ lang.locale +'.json'
        }
        return new Promise((resolve, reject) => {
            Utils.Ajax.get(config).then((obj) => {
                resolve(obj.tours);
           });
        })
    }

    ajaxGetTourDetailData() {

    }
}

export default new Api();
