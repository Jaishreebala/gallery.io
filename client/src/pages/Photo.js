import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import emptyStar from '../images/empty_star.svg';
import filledStar from '../images/filled_star.svg';
import { useHistory } from 'react-router-dom'
import Error from '../components/Error';

function Photo({ isLoggedIn }) {
    const { id } = useParams();
    const history = useHistory()
    const [photoData, setPhotoData] = useState([]);
    const [userRating, setUserRating] = useState([0, 0, 0, 0, 0]);
    const [rerender, setRerender] = useState(false)
    const [errors, setErrors] = useState("");
    const [query, setQuery] = useState(`/api/v1/photo/${id}`);

    const bearer = `Bearer ${localStorage.getItem('token')}`
    const commentRef = useRef();
    useEffect(() => {
        loadPhoto();
    }, [query, rerender])
    const loadPhoto = async () => {
        try {
            const response = await fetch(query, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setPhotoData(data.data);
        } catch (err) {
            console.log(err)
        }
    }
    const starRenderer = (rating) => {
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
    const submitCommentHandler = async () => {
        if (isLoggedIn) {
            if (commentRef.current.value.length) {
                try {
                    const response = await fetch(`/api/v1/comments/${id}`, {
                        method: "POST",
                        body: JSON.stringify({
                            comment: commentRef.current.value
                        }),
                        headers: {
                            'Authorization': bearer,
                            'Content-Type': "application/json; charset=UTF-8"
                        }
                    })
                    const data = await response.json();
                    setErrors("");
                    if (data.success) {
                        setQuery(query)
                        setRerender(!rerender)
                    }
                    else {
                        setErrors(data.error)
                    }

                } catch (err) {
                    setErrors(err)
                }
            }
            else {
                setErrors("Comments can't be empty")
            }
            commentRef.current.value = ""
        }
        else {
            history.push("/login");
        }
    }
    const submitReviewHandler = async (rating) => {
        if (isLoggedIn) {

            try {
                const response = await fetch(`/api/v1/comments/${id}`, {
                    method: "POST",
                    body: JSON.stringify({
                        rating: rating
                    }),
                    headers: {
                        'Authorization': bearer,
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json();
                if (data.success) {
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            history.push("/login");
        }
    }
    const mouseOverStar = (index) => {
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                userRating[i] = 1;
            }
            else {
                userRating[i] = 0;
            }
        }
        setUserRating(userRating)
        setRerender(!rerender)
    }

    return (
        <>
            {photoData.user &&
                <div className="photo">

                    <img src={`${process.env.PUBLIC_URL}/uploadedImages/${photoData.photo}`} alt="Image" />
                    <div className="menu">
                        <div className="desc"> {photoData.description} </div>
                        <div className="user"> Clicked By {photoData.user.firstName} {photoData.user.lastName}  </div>
                        <div className="desc"><a href={`${process.env.PUBLIC_URL}/uploadedImages/${photoData.photo}`} download>Download</a></div>
                        <div className="star"> {starRenderer(photoData.averageRating)}</div>
                        <h1>Comments</h1>
                        {photoData.comments.map(comment => {
                            if (comment.comment) {
                                return <div key={comment._id} className="comment">
                                    <div className="commentName">
                                        {comment.user.firstName} {comment.user.lastName}
                                    </div>
                                    <div className="commentDesc">
                                        {comment.comment}
                                    </div>
                                </div>
                            }
                            return "";
                        }
                        )}
                        <div className="userInputSection">
                            <Error error={errors} />
                            <div className="borderInput">
                                <input type="text" placeholder="Leave A Comment" ref={commentRef} />
                                <div onClick={submitCommentHandler}>Post</div>
                            </div>

                            <div className="inputRating">
                                <span>Leave A Rating:</span>

                                {userRating.map((rating, i) =>
                                    <img onClick={() => submitReviewHandler(i + 1)}
                                        onMouseOver={() => mouseOverStar(i)} key={i} src={rating ? filledStar : emptyStar}
                                        onMouseLeave={() => {
                                            setUserRating([0, 0, 0, 0, 0]); setRerender(!rerender);
                                        }}
                                        alt="empty star" />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Photo
