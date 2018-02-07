import React from "react";
import movieSvg from "./movie-placeholder.svg";


const MovieImage = ({ image }) => (
    <figure className="media-left">
        <p className="image">
            <img
                style={{ width: 210, height: 140 }}
                src={image ? image.src : movieSvg}/>
        </p>
    </figure>
);

export default MovieImage;