import React, { useEffect, useState } from 'react'
import MainCenter from '../Main-center/MainCenter'
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GroupIcon from '@mui/icons-material/Group';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './Profile.css'
import axios from 'axios';
import picture from '../../../img/picture.png';
import profilePicture from '../../../img/profilePicture.jpg';
import { useParams, useNavigate } from 'react-router';
import Header from '../../Headers/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Logins, selectLogin } from '../../../Redux/Slices/userSlice';

const Profile = () => {
    const userselect = useSelector(selectLogin);
    const dispatch = useDispatch();
    const [user, setUsers] = useState({});
    const [follow, setFollow] = useState(userselect.follwings.includes(user._id));
    const [img, setImg] = useState([]);
    const [friends, setFriends] = useState([]);
    const [getNotification, setGetNotification] = useState([]);
    const [makeFriend, setMakeFriend] = useState();
    const [Updateimg, setUpdateImg] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const naviagate = useNavigate();
    const username = useParams().username;
    const [updateFileImg, setUpdateFileImg] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get(`/user?username=${username}`);
            setUsers(users.data);
        };
        fetchUsers();
    }, [username]);
    useEffect(() => {
        setFollow(userselect.follwings.includes(user._id));
        const setlogin = async () => {
            const users = await axios.get(`/user?userId=${userselect._id}`);
            dispatch(Logins(users.data));
        }

        setlogin();
    }, [user._id, userselect])
    useEffect(() => {
        const fetchImage = async () => {
            const users = await axios.get(`/post/images/${user._id}`);
            setImg(users.data)
        };
        fetchImage();
    }, [img]);
    useEffect(() => {
        const fetchFriends = async () => {
            const users = await axios.get(`/user/friend/${user._id}`);
            setFriends(users.data)
        };
        fetchFriends();
    }, [user]);
    //add friend
    useEffect(() => {
        const getNotification = async () => {
            try {
                const getNoti = await axios.get(`/notification/${user._id}`)
                setGetNotification(getNoti.data);
                setMakeFriend(getNoti.data.makeFriends);
            } catch (error) {
                console.log(error)
            }
        }
        getNotification();
    }, [username, makeFriend, getNotification, user]);
    const Follow = async () => {
        try {
            if (!follow) {
                await axios.put(`/user/${user._id}/follow`, { userId: userselect._id });
            } else {
                await axios.put(`/user/${user._id}/unfollow`, { userId: userselect._id });
            }
        } catch (error) {
            console.log(error)
        }
        setFollow(!follow)
    }
    const date = new Date(user.updatedAt);
    const haderUpdateFile = async (e) => {
        e.preventDefault();
        const updateUser = {
            userId: userselect._id,
            profilePicture: updateFileImg.name
        }
        if (updateFileImg) {
            const data = new FormData();
            data.append('uploadfile', updateFileImg);
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.put(`/user/${userselect._id}`, updateUser);
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
        setUpdateImg(!Updateimg)
        setUpdateFileImg(null)
    }
    const haderUpdate = () => {
        setUpdateImg(!Updateimg)
        setUpdateFileImg(null)
    }
    const hadersFriend = () => {
        const notification = {
            senderId: userselect._id,
            receiverId: user._id,
            notificationText: `${userselect.username} g???i l???i m???i k???t b???n`,
        }
        try {
            if (!getNotification || getNotification === null) {
                axios.post('/notification', notification);
            } else {
                if (makeFriend) {
                    axios.put(`/notification/${user._id}`, { makeFriends: false, notificationText: `${userselect.username} h???y l???i m???i k???t b???n` });
                } else {
                    axios.put(`/notification/${user._id}`, { makeFriends: true, notificationText: `${userselect.username} g???i l???i m???i k???t b???n` });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Header />
            <div className='profile'>
                <div className='top-profile'>
                    <img className='top-img ' src={user.coverPocture ? PF + user.coverPocture : profilePicture} />
                    <div className='pro-name-img' >
                        <>
                            <img src={user.profilePicture ? PF + user.profilePicture : picture} />
                            <div onClick={() => setUpdateImg(true)}>
                                <CameraAltIcon className='update-profilePicture' />
                            </div>
                        </>
                        <div className='pro-default'>
                            <div className='pro-name'>
                                <h1>{user.username}</h1>
                                <h4>1,2K B???n b?? - 14 b???n chung</h4>
                            </div>
                            {
                                user._id !== userselect._id ?
                                    <div className='follow-unfollow'>
                                        <button>
                                            <MessageIcon />
                                            <label>Nh???n tin</label>
                                        </button>
                                        {follow ? <button onClick={Follow}>
                                            <RemoveIcon />
                                            <label>B??? Follow</label>
                                        </button>
                                            :
                                            <button onClick={Follow}>
                                                <AddIcon />
                                                <label>Follow</label>
                                            </button>
                                        }
                                        {
                                            makeFriend ? <button className='btn-friend' onClick={hadersFriend}>
                                                <PersonRemoveIcon />
                                                <label>H???y k???t b???n</label>
                                            </button> : <button className='btn-friend' onClick={hadersFriend}>
                                                <PersonAddIcon />
                                                <label>Th??m b???n b??</label>
                                            </button>
                                        }
                                    </div> : ''
                            }
                        </div>
                    </div>
                </div>
                <div className='main-profile'>
                    <div className='main-backgroud'>
                        <div className='main-left-1'>
                            <div className='introduction'>
                                <h3>Gi???i thi???u</h3>
                                <ul>
                                    <li><SchoolIcon className='icon-profile' /> <p>H???c t???i <label> {user.school}</label></p></li>
                                    <li><HomeIcon className='icon-profile' /> <p>S???ng t???i <label>{user.liveat}</label></p></li>
                                    <li><FmdGoodIcon className='icon-profile' /> <p>?????n t??? <label>{user.from}</label></p></li>
                                    <li><AccessTimeFilledIcon className='icon-profile' /><p>Tham gia v??o <label>ng??y {date.getDate()} th??ng {date.getMonth()} n??m {date.getFullYear()}</label></p> </li>
                                </ul>
                            </div>
                            <div className='images'>
                                <div className='img-anh'>
                                    <h3>???nh</h3>
                                    <ul>
                                        {img ?
                                            img.map((item, index) => (
                                                <li key={index}>
                                                    {item.img ? <img src={PF + item.img} onClick={() => window.open(PF + `${item.img}`)} /> : ''}
                                                </li>
                                            )) : "Ch??a c?? h??nh ???nh n??o"
                                        }

                                    </ul>
                                </div>
                            </div>

                            <div className='my-friend'>
                                <div className='main-friend'>
                                    <h3>B???n b??</h3>
                                    <ul>
                                        {friends ?
                                            friends.map((friend, index) => (
                                                <li key={index} onClick={() => naviagate(`/profile/${friend.username}`)}>
                                                    <img src={friend.profilePicture ? PF + friend.profilePicture : picture} />
                                                    <p>{friend.username}</p>
                                                </li>
                                            )) : <li>Ch??a c?? b???n b?? n??o</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='main-cenc'>
                            <MainCenter username={username} />
                        </div>
                    </div>
                </div>

            </div >
            {Updateimg
                ? <div className='update_profile'>
                    <div className='modal-ver' onClick={haderUpdate}></div>
                    <div className='mode-main-update'>
                        <h3>C???p nh???t ???nh ?????i di???n</h3>
                        <img src={updateFileImg !== '' ? URL.createObjectURL(updateFileImg) : picture} />
                        <button>
                            <label htmlFor='file'>
                                <input type='file' name='updatefile' id='file' accept='.png,.jpg,.jpeg'
                                    onChange={(e) => setUpdateFileImg(e.target.files[0])} />
                                C???p nh???t
                            </label>
                        </button>
                        <button onClick={() => setUpdateImg(null)} >H???y</button>
                        <button onClick={haderUpdateFile}>Save</button>
                    </div>
                </div>
                : ""
            }
        </>
    )
}

export default Profile