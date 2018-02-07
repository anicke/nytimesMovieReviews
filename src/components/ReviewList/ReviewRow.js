import React from "react";
import PropTypes from "prop-types";
import MovieImage from "./MovieImage";

const ReviewRow = ({ review }) => {
    return <article className="media">
        <MovieImage image={review.multimedia}/>
        <div className="media-content">
            <div className="content">
                <p>
                    <a href={review.link.url}>
                        <strong>{review.display_title}</strong>
                    </a>
                    <br />
                    {review.summary_short}
                </p>
            </div>
        </div>
    </article>;
};

ReviewRow.prototypes = {
    review: PropTypes.object.isRequired
};

export default ReviewRow;