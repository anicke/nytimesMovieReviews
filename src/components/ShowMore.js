import React from "react";
import PropTypes from "prop-types";

const ShowMore = ({ onShowMore, enabled, loading}) => {
    let buttonState = loading ? "is-loading" : "custom-primary";
    return <div style={{padding: "5px"}} className="level-item">
        <a
            onClick={() => onShowMore()}
            disabled={!enabled}
            className={"button " + buttonState}>
            Show More
        </a>
    </div>;
};

ShowMore.proptypes = {
    onShowMore: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ShowMore;