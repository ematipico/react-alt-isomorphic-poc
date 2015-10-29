'use strict'
/*
    I had to create static funcionts because for some reason,
    the store transforms the class into a normal object, losing the functions
*/
/**
*   @class Sorter
*   It implements the logic of the sorters 
*/
class Sorter {

    static MinPriceOrder(objects) {
        objects.sort((a, b) => {
            return a.price.euro - b.price.euro;
        });
        return objects;
    }

    static MaxPriceOrder(objects) {
        objects.sort((a, b) => {
            return b.price.euro - a.price.euro;
        });
        return objects;
    }

}
export default Sorter;
