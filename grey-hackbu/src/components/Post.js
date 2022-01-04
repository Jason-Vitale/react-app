import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';


function Post({username, caption, imageURL}) {

    //const [comment, setComments] = useState([]);



    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt='Jason'
                    src="/static/images/avatar/1.jpg"
                />
            <h3>{username}</h3>
            </div>

            <img className="post_image" src={imageURL} alt=""/>
            {/* Image */}

            <h4 className="post_text"><strong>{username}</strong>: {caption}</h4>
            {/* UserName + caption */}
        </div>
    )
}

export default Post
