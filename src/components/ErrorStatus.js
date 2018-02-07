import React from "react";
import PropTypes from "prop-types";

const ErrorStatus = ({ error }) => {
    if (!error) return null;

    return <article className="message is-warning">
        <div className="message-header">
            <strong><p>Failed to fetch movie reviews</p></strong>
        </div>
        <div className="message-body">
            <pre>{error}</pre>
            <div
                style={{paddingTop: "20px"}}
                className="level-item has-text-centered">
                <a
                    onClick={() => location.reload()}
                    className={"button custom-primary"}>
                    Reload
                </a>
            </div>
        </div>
    </article>;
};

ErrorStatus.prototypes = {
    error: PropTypes.string.isRequired
};

export default ErrorStatus;