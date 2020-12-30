import React from 'react'
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';

function UserImageCard({ id, photo, description, tags, rating }) {
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
                <div className="star"> {starRenderer()}</div>
                <a href={`${process.env.PUBLIC_URL}/uploadedImages/${photo}`} download>Download</a>
            </div>
            <img src={`${process.env.PUBLIC_URL}/uploadedImages/${photo}`} alt="Image" />
        </div>
    )
}

export default UserImageCard
