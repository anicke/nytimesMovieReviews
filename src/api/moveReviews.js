import superagent from "superagent";

const API_URL = "http://api.nytimes.com/svc/movies";
const API_KEY = process.env.REACT_APP_API_KEY;


class MovieApi {
    constructor() {
        this.api = "v2";
    }
    async getReviews(offset = 0, query = "") {
        let queryObj = {
            "api-key": API_KEY,
            offset: offset
        };
        if (query) {
            queryObj["query"] = query;
        }
        return await superagent
            .get(this.baseUrl())
            .query(queryObj)
            .accept("json");
    }
    baseUrl() {
        return `${API_URL}/${this.api}/reviews/search.json`;
    }
}

export default new MovieApi();
