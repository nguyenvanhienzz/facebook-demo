import React, { useEffect, useState } from 'react';
import picture from '../../../img/picture.png';
import moody from '../../../img/icon-buon.png';
import haha from '../../../img/icon-haha.jpg';
import heart from '../../../img/icon-tim.png';
import missyou from '../../../img/icon-thuongnho.jpg';
import like from '../../../img/icon-like.png';
import LanguageIcon from '@mui/icons-material/Language';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import { format } from 'timeago.js';
import axios from 'axios';
import './MainCenter.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../../Redux/Slices/userSlice';
const Post = ({ post }) => {
    const [user, setUsers] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const userselect = useSelector(selectLogin);
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const username = useParams().username;
    const [likess, setLike] = useState(
        {
            like: post.likes.length,
            haha: post.hahas.length,
            buon: post.buon.length,
            tim: post.tim.length,
            thuong: post.thuong.length
        }
    );
    const [isLiked, setIslikes] = useState({
        like: false,
        thuong: false,
        haha: false,
        tim: false,
        buon: false,
    });

    useEffect(() => {
        setIslikes({
            like: post.likes.includes(userselect._id),
            thuong: post.thuong.includes(userselect._id),
            haha: post.hahas.includes(userselect._id),
            tim: post.tim.includes(userselect._id),
            buon: post.buon.includes(userselect._id),
        })
    }, [])
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get(`/user?userId=${post.userId}`);
            setUsers(users.data)
        };
        fetchUsers();
    }, [post.userId]);

    const handerOver = () => {
        setHover(true);
    }

    //like
    const handerLike = () => {
        setIslikes({
            thuong: false,
            haha: false,
            tim: false,
            buon: false,
            like: !isLiked.like
        });
        try {
            axios.put(`/post/${post._id}/like`, { userId: userselect._id });
        } catch (error) { }
        setLike(isLiked.like ? { haha: 0, buon: 0, thuong: 0, tim: 0, like: likess.like - 1 } : { haha: 0, buon: 0, thuong: 0, tim: 0, like: likess.like + 1 });
    }
    //thuong thuong
    const handerThuong = () => {
        setIslikes({
            like: false,
            haha: false,
            tim: false,
            buon: false,
            thuong: !isLiked.thuong
        });
        try {
            axios.put(`/post/${post._id}/thuong`, { userId: userselect._id });
        } catch (error) { }
        setLike(isLiked.thuong ? { like: 0, buon: 0, haha: 0, tim: 0, thuong: likess.thuong - 1 } : { like: 0, buon: 0, haha: 0, tim: 0, thuong: likess.thuong + 1 });
    }
    //haha
    const handerHaha = () => {
        setIslikes({
            thuong: false,
            like: false,
            tim: false,
            buon: false,
            haha: !isLiked.haha
        });
        try {
            axios.put(`/post/${post._id}/haha`, { userId: userselect._id });
        } catch (error) { }
        setLike(isLiked.haha ? { like: 0, buon: 0, thuong: 0, tim: 0, haha: likess.haha - 1 } : { like: 0, buon: 0, thuong: 0, tim: 0, haha: likess.haha + 1 });
    }
    //buon
    const handerBuon = () => {
        setIslikes({
            thuong: false,
            haha: false,
            tim: false,
            like: false,
            buon: !isLiked.buon
        });
        try {
            axios.put(`/post/${post._id}/buon`, { userId: userselect._id });
        } catch (error) { }
        setLike(isLiked.buon ? { like: 0, haha: 0, thuong: 0, tim: 0, buon: likess.buon - 1 } : { like: 0, haha: 0, thuong: 0, tim: 0, buon: likess.buon + 1 });
    }
    //tim
    const handerTim = () => {
        setIslikes({
            thuong: false,
            haha: false,
            like: false,
            buon: false, tim: !isLiked.tim
        });
        try {
            axios.put(`/post/${post._id}/tim`, { userId: userselect._id });
        } catch (error) { }
        setLike(isLiked.tim ? { like: 0, haha: 0, thuong: 0, buon: 0, tim: likess.tim - 1 } : { like: 0, haha: 0, thuong: 0, buon: 0, tim: likess.tim + 1 });
    }
    const handerMath = () => {
        let tong = 0;
        if (likess.like !== 0) {
            return tong += likess.like;
        }
        else if (likess.haha !== 0) {
            return tong += likess.haha;
        }
        else if (likess.buon !== 0) {
            return tong += likess.buon;
        }
        else if (likess.tim !== 0) {
            return tong += likess.tim;
        }
        else if (likess.thuong !== 0) {
            return tong += likess.thuong;
        }
        return tong;
    }
    const imghader = () => {
        if (isLiked.like) {
            return like;
        } else if (isLiked.haha) {
            return haha;
        }
        else if (isLiked.thuong) {
            return missyou;
        }
        else if (isLiked.tim) {
            return heart;
        }
        else if (isLiked.buon) {
            return moody;
        }
    }
    return (
        <div className='post-center'  >
            <div className='title-avatar' onClick={() => navigate(username ? '' : `profile/${user.username}`)}>
                <img src={user.profilePicture ? PF + user.profilePicture : picture} />
                <div className='title-user'>
                    <div className='title-name'>{user.username}</div>
                    <div className='title-work'><label>{format(post.createdAt)}</label> <LanguageIcon className='icon-language' /></div>

                </div>
            </div>
            <p>{post.desc}</p>
            <div className='post-img'>
                {post.img
                    ? <img src={PF + post.img} />
                    : <video controls src={PF + post.video} />}
            </div>
            <div className='post-like-comment'>
                {
                    isLiked.like || isLiked.haha || isLiked.thuong || isLiked.tim || isLiked.buon ? <div className='like'><img src={imghader()} /><label>{handerMath()}</label></div> : " "
                }
                <div className='comment'></div>
            </div>
            <div className='btn-icon' onMouseLeave={() => setHover(false)}>
                <ul>
                    <li onMouseOver={handerOver} className='li-over'>
                        {isLiked.like || isLiked.haha || isLiked.thuong || isLiked.tim || isLiked.buon ?
                            <label><img src={imghader()} />{isLiked.like ? 'Thích' : isLiked.haha ? "HaHa" : isLiked.thuong ? "Thương " : isLiked.tim ? "Yêu thích" : "Buồn"}</label> : <label><ThumbUpIcon className='icon-thum' />Like</label>}
                        {hover ?
                            <div className='icon-hover' >
                                <ul>
                                    <li onClick={handerLike}><img src={like} /></li>
                                    <li onClick={handerThuong}><img src={missyou} /></li>
                                    <li onClick={handerHaha}><img src={haha} /></li>
                                    <li onClick={handerTim}><img src={heart} /></li>
                                    <li onClick={handerBuon}><img src={moody} /></li>
                                </ul>
                            </div> : ''
                        }
                    </li>

                    <li><CommentIcon className='icon-comment' />Bình luận</li>
                    <li><ReplyIcon className='icon-share' />Chia sẻ</li>
                </ul>
            </div>

        </div>
    )
}

export default Post