import React from 'react'
import { Link } from 'react-router-dom'
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';
function Imagecard({ id, photographer, photo, description, tags, rating, photographerId }) {
    const starRenderer = () => {
        let ratingRenderer = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.round(parseInt(rating))) {
                ratingRenderer.push(<img key={i} src={filledStar} alt="filled star" />)
            }
            else {
                ratingRenderer.push(<img key={i} src={emptyStar} alt="empty star" />)
            }
        }
        return ratingRenderer;
    }

    return (
        <div className="imageCard">
            <div className="card-desc">
                <Link to={`/feed/${photographerId}`}>{photographer}</Link>
                <div className="star"> {starRenderer()}</div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/uploadedImages/${photo}`} alt="Image" />
        </div>
    )
}

export default Imagecard
