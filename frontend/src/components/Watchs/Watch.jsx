import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Watch.css';
import WatchLeft from './WatchLeft';
import WatchRight from './WatchRight';
import WatchFriend from './WatchFriend';
import WatchLive from './WatchLive';
import WatchProgam from './WatchProgam';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../Redux/Slices/userSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Watch = () => {
    const [getWatch, setGetWatch] = useState([]);
    const userselect = useSelector(selectLogin);

    const [checkWatch, setCheckWatch] = useState({
        watchhome: true,
        watchlive: false,
        watchprogram: false,
        watchfriend: false,
        groud: false
    })
    useEffect(() => {
        async function getWatchs() {
            try {
                const getwatchs = await axios.get('/post');
                const data = getwatchs.data.filter(data => data.video !== "");
                setGetWatch(data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                }))
            } catch (error) {
                console.log('get watch' + error);
            }
        }
        getWatchs();
    }, [getWatch]);
    return (
        <div className='main-main'>
            <div className='main-watch'>
                <div>
                    <WatchLeft checkWatch={checkWatch} setCheckWatch={setCheckWatch} />
                </div>
                <div>
                    {
                        getWatch.map(item => (
                            <WatchRight getwatchs={item} key={item._id} />
                        ))
                    }
                    {getWatch.map(items => (

                        <Routes>
                            <Route path="friend" element={<WatchFriend getwatchs={items} />} />
                        </Routes>
                    ))

                    }

                    <Routes >
                        <Route path="live" element={<WatchLive />} />
                        <Route path="progam" element={<WatchProgam />} />
                    </Routes>
                    {/* <div className='header-friend'>
                        <p>Watch <ArrowForwardIosIcon className='icon-arrowf' /> Đã lưu</p>
                        <h4>Video Của Tôi</h4>
                    </div> */}

                </div>
            </div>
        </div >
    )
}

export default Watch