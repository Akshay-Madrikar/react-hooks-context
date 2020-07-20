import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import Page from './Page';
import DispatchContext from '../DispatchContext';

const CreatePost = (props) => {

    const [ values, setValues ] = useState({
        title: '',
        body: ''
    });

    const appDispatch = useContext(DispatchContext)

    const { title, body } = values;
    const { avatar, token, username } = JSON.parse(localStorage.getItem('data'));

    const createPost = async () => {
        try {
            const post = await Axios.post('/create-post', {
                title,
                body,
                token: token
            });
            appDispatch({
                type: 'FLASH_MESSAGE',
                value: 'Successfully created your post!!!'
            });
            props.history.push(`/post/${post.data}`);
            console.log('Post created!'); 
        } catch(error) {
            console.log('Error in creating post!');
        }
       
    }

    const handleChange = (name) => (e) => {
        const value = e.target.value;
        setValues({...values, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
    };

    return (
        <Page title="Create New Post">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="post-title" className="text-muted mb-1">
                    <small>Title</small>
                </label>
                <input onChange={handleChange('title')} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
                </div>

                <div className="form-group">
                <label htmlFor="post-body" className="text-muted mb-1 d-block">
                    <small>Body Content</small>
                </label>
                <textarea onChange={handleChange('body')} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
                </div>

                <button className="btn btn-primary">Save New Post</button>
            </form>
        </Page>
    );
};

export default withRouter(CreatePost);