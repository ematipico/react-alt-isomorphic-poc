import React from 'react';

class ToursFeed extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        this.flux = this.context.flux;
        this.AppActions = this.flux.getActions('AppActions');
        this.ToursFeedStore = this.flux.getStore('ToursFeedStore');
        this.state = this.ToursFeedStore.getState();
        this.ToursFeedStore.listen(this._onChange);
    }

    componentWillUnMount() {
        this.ToursFeedStore.unlisten(this._onChange);
    }

    _onChange() {
        this.setState(this.ToursFeedStore.getState());
    }

    render() {

        let tours = [];
        let allTours = this.state.tours;
        for (var tour in allTours) {
            tours.push(
                <div className="col-sm-12" key={tour}>
                    <div className="row tour-card">
                        <div className="col-sm-3">
                            <img src={allTours[tour].previewImage} />
                        </div>
                        <div className="col-sm-9">
                            <p className="title">{allTours[tour].title}</p>
                            <p>{allTours[tour].description}</p>
                            <a href={allTours[tour].seoURL} className="btn btn-primary">More info</a>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="row tours-list">
                <h2>The tours</h2>
                {tours}
            </div>

        )
    }

}

ToursFeed.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

export default ToursFeed
