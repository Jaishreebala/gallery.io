import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';

function Photo() {
    const [photoData, setPhotoData] = useState([]);
    const [query, setQuery] = useState(`api/v1/photo/5fec1fcce3ebce8897f8de52`);
    const bearer = `Bearer ${localStorage.getItem('token')}`

    useEffect(() => {
        loadWrittenWork();
    }, [query])
    const loadWrittenWork = async () => {
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
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/uploadedImages/${photoData.photo}`} alt="Image" />
        </div>
    )
}

export default Photo
