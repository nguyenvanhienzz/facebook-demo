import React, { useEffect, useState } from 'react';
import './MainCenter.css';
import axios from 'axios';
import { selectLogin } from '../../../Redux/Slices/userSlice';
import { useSelector } from 'react-redux';
import Post from './Post';
import { useNavigate } from 'react-router';
import Share from './Share';


const MainCenter = ({ username }) => {
    const userselect = useSelector(selectLogin);
    const [posts, setPosts] = useState([]);
    const [getUser, setGetuser] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            const post = username
                ? await axios.get(`/post/profile/${username}`)
                : await axios.get(`/post/timeline/${userselect._id}`);
            setPosts(post.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }));
        };
        fetchPosts();
    }, [username]);
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(`/user?username=${username}`);
                setGetuser(user.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [getUser])
    return (
        <div className='main-center'>
            <div className='main-center-pro'>
                {getUser
                    ? getUser._id === userselect._id
                        ? <Share />
                        : ""
                    : <Share />
                }
                {posts.map(item => (
                    <Post key={item._id} post={item} />
                ))
                }
            </div>
        </div>
    )
}

export default MainCenter