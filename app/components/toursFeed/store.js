class ToursFeedStore {
    constructor() {
        this.AppActions = this.alt.getActions('AppActions');
        this.bindActions(this.AppActions);
    }


    onLoadAllTours(tours) {
        this.setState({
            tours: tours
        })
    }

}

export default ToursFeedStore;
