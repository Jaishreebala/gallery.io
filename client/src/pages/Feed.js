import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import ImageCard from '../components/Imagecard'
function Feed({ isLoggedIn }) {
    const [photosData, setPhotosData] = useState([]);
    const [query, setQuery] = useState(`api/v1/photo`);

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

        <div className="feed">
            {!isLoggedIn ? <Redirect to="/login" /> : ""}
            {
                photosData.map(photoData => { return <ImageCard key={photoData._id} id={photoData._id} photographerId={photoData.user._id} photographer={`${photoData.user.firstName} ${photoData.user.lastName}`} photo={photoData.photo} description={photoData.description} tags={photoData.workType} rating={photoData.averageRating} /> })
            }
        </div>
    )
}

export default Feed
