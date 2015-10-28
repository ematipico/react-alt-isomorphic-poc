import React from 'react';

class TourDetailDescription extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <p>{this.props.data}</p>;
    }
}

class TourDetailImage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <img src={this.props.srcImg} />;
    }
}

class TourDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }
    componentWillMount() {
        this.flux = this.context.flux;
        this.AppActions = this.flux.getActions('AppActions');
        this.TourDetailStore = this.flux.getStore('TourDetailStore');
        this.state = this.TourDetailStore.getState();

    }

    _onChange() {

    }

    render() {
        var images = [];
        var allImages = this.state.tour.images;
        for (var img in allImages) {
            images.push(<img src={allImages[img]} />)
        }
        return (
            <div className="content">
                <h1>{this.state.tour.title}</h1>
                {this.state.tour.description.map((result, idx) => {
                    return <TourDetailDescription key={idx}  data={result} />
                })}
                {this.state.tour.images.map((result, idx) => {
                    return <TourDetailImage key={idx}  srcImg={result} />
                })}
            </div>
        )
    }
}

TourDetailComponent.contextTypes = {
    flux: React.PropTypes.object.isRequired
}
export default TourDetailComponent
