import React, { useCallback } from 'react'
import './Watch.css';
import SearchIcon from '@mui/icons-material/Search';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import MovieIcon from '@mui/icons-material/Movie';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NavLink, } from 'react-router-dom';


const WatchLeft = ({ checkWatch, setCheckWatch }) => {

    const onClickHome = useCallback(() => {
        setCheckWatch({
            watchhome: true,
            watchlive: false,
            watchprogram: false,
            watchfriend: false,
            groud: false

        })
    });
    const onClickLive = useCallback(() => {
        setCheckWatch({
            watchhome: false,
            watchlive: true,
            watchprogram: false,
            watchfriend: false,
            groud: false

        })
    });
    const onClickProgram = useCallback(() => {
        setCheckWatch({
            watchhome: false,
            watchlive: false,
            watchprogram: true,
            watchfriend: false,
            groud: false

        })
    });
    const onClickFriend = useCallback(() => {
        setCheckWatch({
            watchhome: false,
            watchlive: false,
            watchprogram: false,
            watchfriend: true,
            groud: false

        })
    });
    const onClickGroud = useCallback(() => {
        setCheckWatch({
            watchhome: false,
            watchlive: false,
            watchprogram: false,
            watchfriend: false,
            groud: true
        })
    });

    return (
        <>

            <div className='watch-left'>
                <h2>Watch</h2>
                <div className='search-video'>
                    <SearchIcon className='search-watch' />
                    <input placeholder='Tìm kiếm video' />
                </div>
                <div className='broder-video'></div>
                <div className='watch-list'>
                    <ul className='ul-icon'>
                        <NavLink to="" className='sum-icon' onClick={onClickHome}>
                            <li className={checkWatch.watchhome ? 'watch-backgroud' : 'sum-icon'}>
                                <SmartDisplayIcon className={checkWatch.watchhome ? 'watch-home' : 'list-icon'} />
                                <span>Trang chủ </span>
                            </li>
                        </NavLink>
                        <NavLink to="live" className='sum-icon' onClick={onClickLive}>
                            <li className={checkWatch.watchlive ? 'watch-backgroud' : 'sum-icon'} >
                                <VideoCameraBackIcon className={checkWatch.watchlive ? 'watch-live' : 'list-icon'} />
                                <span>Trực Tiếp</span>
                            </li>
                        </NavLink>
                        <NavLink to="progam" className='sum-icon' onClick={onClickProgram}>
                            <li className={checkWatch.watchprogram ? 'watch-backgroud' : 'sum-icon'}>
                                <MovieIcon className={checkWatch.watchprogram ? 'watch-program' : 'list-icon'} />
                                <span>Chương trình</span>
                            </li>
                        </NavLink>
                        <NavLink to="friend" className='sum-icon' onClick={onClickFriend}>
                            <li className={checkWatch.watchfriend ? 'watch-backgroud' : 'sum-icon'} >
                                <BookmarksIcon className={checkWatch.watchfriend ? 'watch-friend' : 'list-icon'} />
                                <span> Video của tôi </span>
                            </li>
                        </NavLink>
                    </ul>
                    <div className='broder-video'></div>
                    <div className='yours-list'>
                        <h4>Danh sách xem của bạn</h4>
                        <ul>
                            <li className={checkWatch.groud ? 'watch-backgroud' : 'sum-icon'} onClick={onClickGroud}>
                                <img src="https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA" />
                                <div className='group-video'>
                                    <h3>Theanh28 Entertainment</h3>
                                    <p><FiberManualRecordIcon className='icon-fiber' />9+ video mới</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </>

    )
}

export default WatchLeft