import React from 'react';
import CategoryFilterComponent from '../categoryFilter/view.jsx'
import SorterComponent from '../sorter/view.jsx'

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
    }

    componentDidMount() {
        this.ToursFeedStore.listen(this._onChange);
    }

    componentWillUnmount() {
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
                        <div className="col-xl-4 col-lg-5 col-md-5 col-sm-6">
                            <img src={allTours[tour].previewImage} />
                        </div>
                        <div className="col-xl-8 col-lg-7 col-md-7 col-sm-6">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-8">
                                    <p className="title">{allTours[tour].title}</p>
                                    <p>{allTours[tour].description}</p>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4">
                                    <p className="price">{allTours[tour].price.euro} €</p>
                                    <a href={allTours[tour].seoURL} className="btn btn-primary">More info</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="row tours-list">
                <h2>The tours</h2>
                <div className="col-lg-3 col-md-3">
                    <CategoryFilterComponent />
                </div>
                <div className="col-lg-9 col-md-9">
                    <div className="col-sm-12">
                        <div className="">
                            <SorterComponent criteria={this.state.criteria} />
                        </div>
                    </div>
                    {tours}
                </div>
            </div>

        )
    }

}

ToursFeed.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

export default ToursFeed
