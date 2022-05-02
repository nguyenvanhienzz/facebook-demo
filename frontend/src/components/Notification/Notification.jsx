import React, { useEffect, useState } from 'react'
import './Notification.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../Redux/Slices/userSlice';
import { format } from 'timeago.js';
import axios from 'axios';
import picture from '../../../src/img/picture.png';

const Notification = ({ getNotification }) => {
    const navigate = useNavigate();
    const userselect = useSelector(selectLogin);
    return (
        <>
            {
                getNotification ?
                    <div className='notification-main'>
                        <h3 > Thông Báo</h3 >
                        <div className='main-infor' onClick={() => navigate('/friends')}>
                            <div className='user-notifi'>
                                <img src={userselect.profilePicture ? userselect.profilePicture : picture} />
                                <div className='infor-notifi'>
                                    <label>{getNotification.notificationText}</label>
                                    <p>{format(getNotification.createdAt)}</p>
                                </div>
                            </div>
                            {
                                !getNotification.makeFriends ? "" : <div className='btn-notifi'>
                                    <button>Chấp nhận</button>
                                    <button className='btn-notifi-clear'>Từ chối</button>
                                </div>
                            }
                        </div>
                    </div>
                    : <div className='notification-main'>
                        <h3> Thông Báo</h3 >
                        <div className='main-infor' >
                            <p className='infor-no'>Chưa có thông báo nào</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default Notification