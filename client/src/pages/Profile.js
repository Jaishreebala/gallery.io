import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ImageCard from '../components/ProfileCard'

function Profile({ isLoggedIn }) {

    const [photosData, setPhotosData] = useState([]);
    const [query, setQuery] = useState(`api/v1/auth/getMe`);
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        getPhotos();
    }, [query, rerender])
    const bearer = `Bearer ${localStorage.getItem('token')}`
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
        <>{photosData.images &&
            <div>
                <div className="heading"><Link to={`/post`}> Back</Link> <h1>My Profile: {photosData.firstName} {photosData.lastName}</h1> </div>
                <div className="feed">
                    {!isLoggedIn ? <Redirect to="/login" /> : ""}
                    {
                        photosData.images.map(photoData => { return <ImageCard key={photoData._id} id={photoData._id} isLoggedIn={isLoggedIn} photo={photoData.photo} rating={photoData.averageRating} rerender={rerender} setRerender={setRerender} /> })
                    }
                </div>
            </div>}
        </>
    )
}

export default Profile
