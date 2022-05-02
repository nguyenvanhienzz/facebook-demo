import React from 'react';
import './PersonalPage.css';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import picture from '../../../src/img/picture.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin, logout } from '../../Redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
const PersonalPage = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const userselect = useSelector(selectLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className='personal-page'>
            <div className='personnal-user' onClick={() => navigate(`profile/${userselect.username}`)}>
                <img src={userselect.profilePicture ? PF + userselect.profilePicture : picture} />
                <div className='personnal-username'>
                    <h4> Nguyễn Văn Hiển</h4>
                    <p>Xem trang cá nhân của bạn</p>
                </div>
            </div>
            <div className='personnal-border'></div>
            <ul>
                <li><AnnouncementIcon className='icon-personnal' /> <span>Đóng góp ý kiến</span></li>
                <div className='personnal-border'></div>

                <li><SettingsIcon className='icon-personnal' /><span>Cài Đặt & quyền riêng tư<p>Hãy chung tay cải thiện Facebook</p></span><ArrowForwardIosIcon className='icon-arrows' /></li>
                <li><HelpIcon className='icon-personnal' /><span>Trợ giúp & hỗ trợ</span><ArrowForwardIosIcon className='icon-arrows' /></li>
                <li><BedtimeIcon className='icon-personnal' /><span>Màn hình & trợ năng</span><ArrowForwardIosIcon className='icon-arrows' /></li>
                <li onClick={() => dispatch(logout())}><LogoutIcon className='icon-personnal' /><span>Đăng xuất</span></li>
            </ul>
        </div>
    )
}

export default PersonalPage