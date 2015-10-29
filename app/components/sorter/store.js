/* The store of the Sorter. Not needed at the moment */
export default class SorterStore {
    constructor() {
        this.AppActions = this.alt.getActions('AppActions');
        this.bindActions(this.AppActions);
    }

}
