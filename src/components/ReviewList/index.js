import React from "react";
import ReviewRow from "./ReviewRow";
import PropTypes from "prop-types";

const ReviewList = ({ reviews, searchDone, headerText }) => {
    if (reviews.length === 0 && searchDone) {
        return (
            <div className="notification is-warning">
                <strong>
                    No movies were found
                </strong>
            </div>
        );
    }
    return (
        <div className="reviewList">
            <h3 className="title is-3">
                {headerText}
            </h3>
            {reviews.map((r, i) => {
                return <ReviewRow
                    key={i}
                    review={r} />;
            })}
        </div>
    );
};


ReviewList.prototypes = {
    reviews: PropTypes.array
};

export default ReviewList;
