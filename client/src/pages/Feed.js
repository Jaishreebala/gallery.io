import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import ImageCard from '../components/Imagecard'
function Feed({ isLoggedIn }) {
    const [photosData, setPhotosData] = useState([]);
    const [query, setQuery] = useState(`api/v1/photo`);
    const [pagination, setPagination] = useState();
    const searchRef = useRef();
    let moreNumber = 1;
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
            setPagination(data.pagination)
            console.log(data)
        } catch (err) {
            console.log(err)
        }

    }
    const moreHandler = async () => {
        if (pagination.next) {
            moreNumber++;
            if (searchRef.current.value.length > 0) {
                setQuery(`/api/v1/photo?tags=${searchRef.current.value}&limit=${pagination.next.limit * moreNumber}`)
            }
            else {
                setQuery(`api/v1/photo?limit=${pagination.next.limit * moreNumber}`)
            }
        }

    }
    const searchImagesHandler = async () => {
        console.log(searchRef.current.value)
        setQuery(`/api/v1/photo?tags=${searchRef.current.value}`)
    }
    return (
        <>
            {pagination &&
                <div>
                    <div className="border-input">
                        <input ref={searchRef} type="text" name="search" placeholder="Search" />
                        <button type="submit" class="submit-btn" onClick={searchImagesHandler}>Search</button>
                    </div>
                    <div className="feed">
                        {!isLoggedIn ? <Redirect to="/login" /> : ""}

                        {
                            photosData.map(photoData => { return <ImageCard key={photoData._id} id={photoData._id} photographerId={photoData.user._id} photographer={`${photoData.user.firstName} ${photoData.user.lastName}`} photo={photoData.photo} description={photoData.description} tags={photoData.workType} rating={photoData.averageRating} /> })
                        }

                    </div>
                    <div className="btn-cnt" ><div className={pagination.next ? "more-button" : "noclick-btn"} onClick={moreHandler}>More</div></div>
                </div>
            }
        </>
    )
}

export default Feed
