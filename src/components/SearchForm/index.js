import React from "react";
import PropTypes from "prop-types";


const SearchForm = ({value, onChange, onSubmit, loading}) =>
    <nav className="level">
        <div className="level-item">
            <div className="field has-addons">
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Find a movie" />
                </p>
                <p className="control">
                    <a
                        onClick={onSubmit}
                        className={loading ? "button is-loading" : "button custom-primary"}>
                            Search
                    </a>
                </p>
            </div>
        </div>
    </nav>;


SearchForm.prototypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchForm;
