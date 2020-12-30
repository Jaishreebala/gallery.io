import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ImageCard from '../components/UserImageCard'
import { useParams } from 'react-router';

function UserFeed({ isLoggedIn }) {
    const { id } = useParams();

    const [photosData, setPhotosData] = useState([]);
    const [query, setQuery] = useState(`/api/v1/photo/user/${id}`);
    useEffect(() => {
        getPhotos();
    }, [query])
    const bearer = `Bearer ${localStorage.getItem('token')}`
    console.log(bearer)
    const getPhotos = async () => {
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
            setPhotosData(data.data);
            console.log(data)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <> {photosData.firstName && <>
            <div className="heading"><Link to={`/feed`}> Back</Link> <h1>Pictures uploaded by {photosData.firstName} {photosData.lastName}</h1></div>
            <div className="feed">
                {!isLoggedIn ? <Redirect to="/login" /> : ""}
                {
                    photosData.images.map(photoData => { return <ImageCard key={photoData._id} id={photoData._id} photo={photoData.photo} description={photoData.description} tags={photoData.workType} rating={photoData.averageRating} /> })
                }
            </div>
        </>
        }
        </>
    )
}

export default UserFeed
