import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import AppsIcon from '@mui/icons-material/Apps';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import picture from '../../../src/img/picture.png';
import { useSelector } from 'react-redux';
import { selectConversation, selectLogin } from '../../Redux/Slices/userSlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Messenger from '../Messenger/Messenger';
import ChatMessenger from '../Messenger/ChatMessenger';
import Notification from '../Notification/Notification';
import PersonalPage from '../PersonalPage/PersonalPage';
import axios from 'axios';

const Header = () => {
    const userselect = useSelector(selectLogin);
    const [state, setState] = useState(false);
    const navigate = useNavigate();
    const selectConversations = useSelector(selectConversation);
    const username = useParams().username;
    const [user, setUsers] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [hover, setHover] = useState({
        home: true,
        friend: false,
        watch: false,
        group: false,
        games: false
    });
    const [messenger, setMessenger] = useState({
        app: false,
        mess: false,
        noti: false,
        arrow: false,
        state: false
    })
    const [getNotification, setGetNotification] = useState([]);
    useEffect(() => {
        const getNotification = async () => {
            try {
                const getNoti = await axios.get(`/notification/${userselect._id}`)
                setGetNotification(getNoti.data);
            } catch (error) {
                console.log(error)
            }
        }
        getNotification();
    }, [getNotification, userselect]);

    return (
        <>
            <div className='headers' >
                <div className='header-left'>
                    <div className='header-img'>
                        <img src='https://i.rada.vn/data/image/2020/08/21/Facebook-2020-200.png' onClick={() => navigate("/")} />
                        <div className='search-header'>
                            <SearchIcon className='icon-search' />
                            <input type='text' placeholder='Tìm kiếm trên Facebook' />
                        </div>
                    </div>
                </div>
                <div className='header-center'>
                    <NavLink to="/" className={(navData) => navData.isActive ? "icon-hover" : "icon-clone"}  ><HomeIcon className='icon-home' /></NavLink>
                    <NavLink to="/friends" className={(navData) => navData.isActive ? "icon-hover" : "icon-clone"}> <GroupIcon className='icon-group' /></NavLink>
                    <NavLink to="/watchs" className={(navData) => navData.isActive ? "icon-hover" : "icon-clone"}> <SmartDisplayIcon className='icon-livetv' /></NavLink>
                    <NavLink to="/groups" className={(navData) => navData.isActive ? "icon-hover" : "icon-clone"}> <SupervisedUserCircleIcon className='icon-super' /></NavLink>
                    <NavLink to="/games" className={(navData) => navData.isActive ? "icon-hover" : "icon-clone"}> <SportsEsportsIcon className='icon-games' /></NavLink>
                </div>

                <div className='header-right'>
                    <div className='header-profile' onClick={() => navigate(`profile/${userselect.username}`)}>
                        <img src={userselect.profilePicture ? PF + userselect.profilePicture : picture} />
                        <label>{userselect.username}</label>
                    </div>
                    <li>
                        <AppsIcon className={messenger.app ? "icon-messenger" : 'icon-app'} onClick={() => setMessenger({ app: !messenger.app, mess: false, noti: false, arrow: false })} />

                    </li>
                    <li>
                        <MessageIcon className={messenger.mess ? "icon-messenger" : 'icon-mess'} onClick={() => setMessenger({ app: false, mess: !messenger.mess, noti: false, arrow: false })} />

                    </li>
                    <li>
                        <NotificationsIcon className={messenger.noti ? "icon-messenger" : 'icon-noti'} onClick={() => setMessenger({ app: false, mess: false, noti: !messenger.noti, arrow: false })} />

                    </li>
                    <li>
                        <ArrowDropDownIcon className={messenger.arrow ? "icon-messenger" : 'icon-arrow'} onClick={() => setMessenger({ app: false, mess: false, noti: false, arrow: !messenger.arrow })} />

                    </li>
                </div>
                {messenger.mess ? <div> <Messenger states={state} setState={setState} setMessenger={setMessenger} messenger={messenger} /></div> : ""}
                <div className='chat-friend'>
                    {
                        selectConversations.map((item) => (
                            item ? <ChatMessenger key={item._id} states={state} item={item} setState={setState} setMessenger={setMessenger} messenger={messenger} /> : ""
                        ))}
                </div>
                {messenger.noti ? <div><Notification getNotification={getNotification} /></div> : ""}
                {messenger.arrow ? <div><PersonalPage /></div> : ""}
            </div>
        </>

    )
}

export default Header