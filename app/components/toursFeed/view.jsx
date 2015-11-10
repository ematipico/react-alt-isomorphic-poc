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
        let locale = this.state.locale;
        for (var tour in allTours) {
            let img = {
                backgroundImage: 'url(' + allTours[tour].previewImage + ')'
            };
            tours.push(
                <article className="col-sm-12" key={tour}>
                    <div className="row tour-card">
                        <div className="col-sm-12 first-row">
                            <div className="col-xl-4 col-lg-6 col-md-5 col-sm-6 image" style={img}>
                            </div>
                            <div className="col-xl-8 col-lg-6 col-md-5 hidden-sm-down hidden-xs-down description">
                                <p className="title">{allTours[tour].title}</p>
                                <span className="hidden-sm-down">{allTours[tour].description}</span>
                            </div>
                        </div>
                        <div className="col-sm-12 second-row">
                            <div className="col-sm-6 price">
                                <span className="price label label-pill label-success">{allTours[tour].price.euro} €</span>
                            </div>

                            <div className="col-sm-6 detail-button">
                                <a href={ (locale !== "en" ? '/' + locale : '') + allTours[tour].seoURL} className="btn btn-primary btn-lg">More info</a>
                            </div>
                        </div>
                    </div>
                </article>
            )
        }
        return (
            <div className="row tours-list">
                <h1>The tours</h1>
                <aside className="col-lg-3 col-md-3">
                    <CategoryFilterComponent />
                </aside>
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
