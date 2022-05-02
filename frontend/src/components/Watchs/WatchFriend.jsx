import React from 'react'
import './WatchFriend.css';
import picture from '../../img/picture.png';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import WatchLive from './WatchLive';
import WatchProgam from './WatchProgam';
const WatchFriend = ({ getwatchs }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (


        <div className='my-watch'>
            <div className='contant-video'>
                <video src={PF + getwatchs.video} controls></video>
                <div className='iformation-video'>
                    <div className='iformation-poster'>
                        <img src={picture} />
                        <div className='user-video'>
                            <h4>Nguyễn Tuấn</h4>
                            <p>6 phut truoc</p>
                        </div>
                    </div>
                    <p>Đêm qua nhạc sĩ, ca sĩ người Brazil, Tierry cùng người vũ công của anh…</p>
                </div>
            </div>
        </div>

    )
}

export default WatchFriend