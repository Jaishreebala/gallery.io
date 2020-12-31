import React from 'react'
import { Link } from 'react-router-dom'
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';

function ProfileCard({ id, photo, rating }) {
    const starRenderer = () => {
        let ratingRenderer = [];
        for (let i = 0; i < 5; i++) {
            console.log(photo)
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
                <div className="error">Delete</div>
                <div className="star"> {starRenderer()}</div>
            </div>
            <Link to={`/photo/${id}`}><img src={`${process.env.PUBLIC_URL}/uploadedImages/${photo}`} alt="Image" /></Link>
        </div>
    )
}

export default ProfileCard
