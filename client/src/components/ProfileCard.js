import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';

function ProfileCard({ id, photo, rating, isLoggedIn, rerender, setRerender, description }) {
    const history = useHistory()

    const bearer = `Bearer ${localStorage.getItem('token')}`

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
    const deletePictureHandler = async () => {
        if (isLoggedIn) {

            try {
                const response = await fetch(`/api/v1/photo/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json();
                if (data.success) {
                    setRerender(!rerender);
                    console.log("success")
                }

            } catch (err) {
                console.log(err);
            }
        }
        else {
            history.push("/login");
        }
    }
    return (
        <div className="imageCard">
            <div className="card-desc">
                <div className="error" onClick={deletePictureHandler}>Delete</div>
                <div className="star"> {starRenderer()}</div>
            </div>
            <Link to={`/photo/${id}`}><img src={`${process.env.PUBLIC_URL}/uploadedImages/${photo}`} alt="Image" /></Link>
            <div className="description"> {description}</div>
        </div>
    )
}

export default ProfileCard
