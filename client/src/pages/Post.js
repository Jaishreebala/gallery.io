import React, { useState, useRef } from 'react'
import ImageUploader from "react-images-upload";

function Post() {
    const [pictures, setPictures] = useState([]);
    const description = useRef();
    const tags = useRef();

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };

    return (
        <div className="post">
            <ImageUploader
                name="file"
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
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
        </div>
    )
}

export default Post
