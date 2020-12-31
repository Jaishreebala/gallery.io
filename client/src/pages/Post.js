import React, { useState, useRef } from 'react'
import ImageUploader from "react-images-upload";
import Error from '../components/Error';
import { useHistory } from 'react-router-dom'



function Post({ isLoggedIn }) {
    const [pictures, setPictures] = useState([]);
    const [errors, setErrors] = useState("");

    const history = useHistory()
    const description = useRef();
    const tags = useRef();

    const bearer = `Bearer ${localStorage.getItem('token')}`

    const onDrop = picture => {
        setPictures([picture]);
    };
    const uploadpictureHandler = async () => {
        if (isLoggedIn) {
            if (!pictures[0]) {
                setErrors("Please Upload A Photo");
            } else
                if (!(description.current.value.length > 0 && tags.current.value.length > 0)) {
                    // console.log(description)
                    // console.log(description.length)
                    setErrors("Please add a description and tags for the photo.");
                }
                else {
                    console.log("succ ess")
                    try {
                        let bodydata = new FormData();
                        bodydata.append('photo', pictures[0][0])
                        bodydata.append('description', description.current.value)
                        bodydata.append('tags', tags.current.value)
                        const response = await fetch(`api/v1/photo`, {
                            method: "POST",
                            body: bodydata,
                            headers: {
                                'Authorization': bearer
                                // 'Content-Type': "application/json; charset=UTF-8"
                            }
                        })
                        const data = await response.json();
                        setErrors("");
                        if (data.success) {
                            console.log("success")
                            history.push("/feed");
                        }
                        else {
                            setErrors(data.error)
                        }

                    } catch (err) {
                        setErrors(err)
                    }
                }
        }
        else {
            // history.push("/login");
        }
    }
    return (
        <div className="post">
            <Error error={errors} />
            <ImageUploader
                name="photo"
                className="photo"
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".svg"]}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
                label="Max file size: 5mb, accepted: jpg, gif, png, svg"
            />
            <div className="textarea">
                <label className="label-name"><span className="content-name">
                    Description*
                            </span>
                </label>
                <textarea name="description" id="description" ref={description}>
                </textarea>
            </div>
            <div className="searchInput">
                <input type="text" name="text" required ref={tags} />
                <label className="label-name">
                    <span className="content-name">
                        Tags
                    </span>
                </label>
            </div>
            <div className="button" onClick={uploadpictureHandler}>Post</div>
        </div>
    )
}

export default Post
