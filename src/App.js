import React, { Component } from "react";
import "./App.css";
import movieApi from "./api/moveReviews";
import SearchForm from "./components/SearchForm";
import ReviewList from "./components/ReviewList";
import ShowMore from "./components/ShowMore";
import ErrorStatus from "./components/ErrorStatus";

const POLL_INTERVAL = 1000 * 90;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            searchDone: false,
            loading: false,
            offset: 0,
            hasMore: true,
            errStatus: "",
            reviews: []
        };
    }
    componentDidMount() {
        this.getReviews();
        this.intervalId = setInterval(this.pollReviews.bind(this), POLL_INTERVAL);
    }
    onQueryChange(event) {
        this.setState({ searchString: event.target.value });
    }
    async pollReviews() {
        try{
            const res = await movieApi.getReviews(this.state.offset, this.state.searchString);
            const latestReview = res.body.results[0];
            if (latestReview.display_title !== this.state.reviews[0].display_title) {
                this.setState((s) => {
                    return {reviews: [latestReview, ...s.reviews]};
                });
            }
        }
        catch(err){
            console.log("Silently failed while polling for new reviews! :(");
        }
    }
    async getReviews() {
        this.setState({ loading: true, offset: 0 });
        try {
            const res = await movieApi.getReviews(0, this.state.searchString);
            let headerText = this.state.searchString ?
                `Results for '${this.state.searchString}'` : "Latest reviews";
            this.setState({
                hasMore: res.body.has_more,
                loading: false,
                searchDone: true,
                headerText: headerText,
                reviews: res.body.results,
                errStatus: ""
            });
        } catch (err) {
            this.setState({
                errStatus: err.message,
                loading: false
            });
        }
    }
    async onShowMore() {
        if (!this.state.hasMore) return;

        this.setState({ loading: true });
        try {
            const res = await movieApi.getReviews(this.state.offset + 20, this.state.searchString);
            this.setState((s) => {
                s.reviews.push(...res.body.results);
                return {
                    hasMore: res.body.has_more,
                    loading: false,
                    reviews: s.reviews,
                    offset: s.offset + 20
                };
            });
        } catch (err) {
            this.setState({ errStatus: err.message, loading: false });
        }
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="main">
                        <h1 className="title is-1">NY Times movie reviews</h1>
                        <ErrorStatus error={this.state.errStatus}/>
                        {
                            !this.state.errStatus && <div>
                                <SearchForm
                                    loading={this.state.loading}
                                    onSubmit={this.getReviews.bind(this)}
                                    onChange={this.onQueryChange.bind(this)}
                                    value={this.state.searchString} />
                                <ReviewList
                                    headerText={this.state.headerText}
                                    searchDone={this.state.searchDone}
                                    reviews={this.state.reviews} />
                                <ShowMore
                                    loading={this.state.loading}
                                    enabled={this.state.hasMore}
                                    onShowMore={this.onShowMore.bind(this)} />
                            </div>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
