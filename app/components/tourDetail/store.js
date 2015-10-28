class TourDetailStore {
    constructor() {
        this.AppActions = this.alt.getActions('AppActions');
        this.bindActions(this.AppActions);
    }


    onLoadOneTour(tourDetail) {
        this.setState({
            tour: tourDetail
        })
    }
}

export default TourDetailStore;
