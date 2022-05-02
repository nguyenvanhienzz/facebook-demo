import React, { useEffect, useState } from 'react'
import picture from '../../../img/picture.png';
import live from '../../../img/live.png';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import CloseIcon from '@mui/icons-material/Close';
import './Share.css';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../../Redux/Slices/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import axios from 'axios';
const Share = () => {
    const userselect = useSelector(selectLogin);
    const navigate = useNavigate();
    const [share, setShare] = useState(false);
    const [file, setFile] = useState(null);
    const [chosenEmoji, setChosenEmoji] = useState(false);
    const [msg, setMsg] = useState("");
    const username = useParams().username;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handerHideShow = () => {
        setChosenEmoji(!chosenEmoji);
    }
    const onEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };
    const haderSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: userselect._id,
            desc: msg,
        }
        if (file) {
            const data = new FormData();
            data.append("uploadfile", file);
            if (file.type === "video/mp4") {
                newPost.video = file.name;
            } else {
                newPost.img = file.name;
            }
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.post("/post", newPost);
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    const haderShare = () => {
        setShare(!share)
        setFile(null);
        setMsg("")
    }

    return (
        <div>
            <div className='main-post' >
                <div className='post-img' onClick={() => navigate(userselect.username ? '' : `profile/${userselect.username}`)}>
                    <img src={userselect.profilePicture ? PF + userselect.profilePicture : picture} />
                    <input type='text' placeholder={`${userselect.username} ơi,bạn đang nghĩ gì thế?`} onClick={() => setShare(true)} />
                </div>
                <div className='post-bor'></div>
                <div className='post-bot'>
                    <ul>
                        <li><img src={live} />Video trực tiếp</li>
                        <li onClick={() => setShare(!share)}><InsertPhotoIcon className='icon-photo' />Ảnh/video</li>
                        <li><EmojiEmotionsIcon className='icon-emo' />Cảm xúc/Hoạt động</li>
                    </ul>
                </div>
            </div>
            {share ? <div className='form-posts'>
                <div className='modal-ver' onClick={haderShare}></div>
                <div className='create-posts'>
                    <div className='posts-header'>
                        <h4>Tạo bài viết</h4>
                        <CloseIcon className='icon-clone' onClick={haderShare} />
                    </div>
                    <div className='posts-bore'></div>
                    <div className='user-post'>
                        <img src={PF + userselect.profilePicture || picture} />
                        <h4>{userselect.username}</h4>
                    </div>
                    <div className='post-input'>
                        <textarea placeholder='Văn Hiển ơi, bạn đang nghĩ gì thế' value={msg}
                            onChange={(e) => setMsg(e.target.value)} />
                        {
                            file
                                ? <div className='img-post'>
                                    {
                                        file.type === 'video/mp4' ? <video src={URL.createObjectURL(file)} controls>

                                        </video> :
                                            <img src={URL.createObjectURL(file)} />
                                    }
                                    <CloseIcon onClick={() => setFile(null)} className='clone-img-video' />
                                </div>
                                : ""
                        }
                    </div>
                    <div className='post-adds'>
                        <p>Thêm vào bài viết</p>
                        <form className='icon-add'>
                            <ul>
                                <li>
                                    <label htmlFor='file'>
                                        <InsertPhotoIcon className='icon-photo' />
                                        <input name='uploadfile' type='file' accept='.png,.jpg,.jpeg,.mp4' id='file'
                                            onChange={(e) => setFile(e.target.files[0])} />
                                    </label>
                                </li>
                                <li >
                                    <EmojiEmotionsIcon className='icon-emo' onClick={handerHideShow} />
                                    <div className='emoji-picker-react'>
                                        {chosenEmoji && <Picker onEmojiClick={onEmojiClick} />}
                                    </div>
                                </li>
                                <li><FmdGoodIcon className='icon-map' /></li>
                                <li><SettingsVoiceIcon className='icon-mic' /></li>
                            </ul>
                        </form>
                    </div>
                    <button onClick={haderSubmit}>Đăng</button>
                </div>
            </div> : ""
            }
        </div>
    )
}

export default Share