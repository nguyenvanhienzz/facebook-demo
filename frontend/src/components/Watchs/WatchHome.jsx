import React, { useEffect, useRef, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { format } from 'timeago.js';
import picture from '../../img/picture.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../Redux/Slices/userSlice';
const WatchHome = ({ getwatchs }) => {
    const videoRef = useRef([]);
    const leftRef = useRef();
    const [state, setState] = useState(false);
    const [hover, setHover] = useState(false);
    const [hoverTime, setHoverTime] = useState(false);
    const [duration, setDuration] = useState('00:00:00');
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [mover, setMover] = useState();
    const [volumes, setVolume] = useState(0);
    const [offVolume, setOffVolume] = useState(false);
    const [hoverVolume, sethoverVolume] = useState(false);
    const [user, setUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        async function getUser() {
            try {
                const getuser = await axios.get(`/user?userId=${getwatchs.userId}`);
                setUser(getuser.data)
            } catch (error) {
                console.log('get user' + error);
            }
        }
        getUser();
    }, [getwatchs._id]);
    //lay thoi gian
    function formatTime(timeInSeconds) {
        const durations = new Date(timeInSeconds * 1000).toISOString().slice(11, 19);
        return durations;
    };
    //play video 
    const onVideoPress = () => {
        if (state) {
            videoRef.current.pause();
        }
        else {
            videoRef.current.play();
        }
        setState(!state);
        const durations = formatTime(videoRef.current?.duration);
        setDuration(durations);
    }
    //lấy thời gian của video và thời gian dang chạy
    const timeUpdate = () => {
        if (videoRef !== null) {
            const currentTimes = formatTime(videoRef.current?.currentTime);
            setCurrentTime(currentTimes);
        }
    }
    //hover vao= thanh tien trinh hien thoi gian
    const onMover = (e) => {
        const skipTo = Math.round((e.nativeEvent.offsetX / e.target.clientWidth) * parseInt(e.target.max, 10));
        const ducations = formatTime(skipTo);
        setMover(ducations);
        const rect = videoRef.current.getBoundingClientRect();
        const lefts = `${e.pageX - rect.left}px`;
        leftRef.current = lefts;
        setHoverTime(true);
    }
    //skip video
    function skipAhead(e) {
        const skipTo = e.target.dataset.seek ? e.target.dataset.seek : e.target.value;
        videoRef.current.currentTime = skipTo;
    }
    //volum
    const onVolume = (e) => {
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
        }
        videoRef.current.volume = e.target.value
        setVolume(videoRef.current.volume);
    }
    //tat volum
    const offVolumes = () => {
        if (offVolume) {
            videoRef.current.volume = 1
            setVolume(videoRef.current.volume);
            setOffVolume(false);
        } else {
            videoRef.current.volume = 0
            setVolume(videoRef.current.volume);
            setOffVolume(true);
        }
    }
    //restart video
    function replayVideo() {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setState(true)
    }
    //phong to thu nho
    function toggleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else {
            videoRef.current.requestFullscreen();
        }
        onVideoPress()
    }
    return (
        <div className='watch-tv'>
            <div className='watch-tv-right'>
                <div className='watch-right' onMouseOut={() => { setHover(false); sethoverVolume(false) }} >
                    <div className='watch-right-user'>
                        <img src={user.profilePicture ? PF + user.profilePicture : picture} />
                        <div className='right-username'>
                            <h4>{user?.username}</h4>
                            <p>{format(getwatchs.createdAt)}</p>
                        </div>
                    </div>
                    <h4 className='right-h4'>{user?.desc}</h4>
                </div>

                {/* // video */}
                <div className='title-video' >
                    <div className='play-video' onMouseOver={() => setHover(true)} >
                        <video muted src={PF + getwatchs.video} ref={videoRef} onTimeUpdate={timeUpdate} id='video' onClick={onVideoPress} />
                        {!state ? <div id='play-out1' ><PlayArrowIcon className='play-out' onClick={onVideoPress} /></div> : ""}
                    </div>
                </div>
                {/* icon-video */}
                {hover ?
                    <div className='icon-videos' onMouseOver={() => setHover(true)}>
                        <ul>
                            <li>{!state ? <PlayArrowIcon onClick={onVideoPress} /> : <PauseIcon onClick={onVideoPress} />}</li>
                            <li className='time-video'>{currentTime}/{duration}</li>
                            <li className='seeking'>
                                <input onInput={(e) => skipAhead(e)} class="seek" id="seek"
                                    min="0" type="range" step="1" max={Math.round(videoRef.current.duration)} value={videoRef.current.currentTime}
                                    onMouseMove={(e) => onMover(e)} onMouseOut={() => setHoverTime(false)} />
                                {hoverTime ? <div class="seek-tooltip" style={{ left: leftRef.current }}>{mover}</div> : ""}
                            </li>
                            <li><SettingsIcon /></li>
                            <li><ReplayIcon onClick={replayVideo} /></li>
                            <li><FullscreenIcon onClick={toggleFullScreen} /></li>
                            <li className='mover-volume' onMouseOver={() => sethoverVolume(true)} >{volumes > 0.7 ? !offVolume ? <VolumeUpIcon className='volume-video'
                                onClick={offVolumes} />
                                : <VolumeOffIcon onClick={offVolumes} />
                                : volumes <= 0.7 && volumes > 0 ? <VolumeDownIcon onClick={offVolumes} />
                                    : volumes >= 0 ? <VolumeOffIcon onClick={offVolumes} />
                                        : <VolumeOffIcon onClick={offVolumes} />}
                                {hoverVolume ?
                                    <input class="volume" onInput={(e) => onVolume(e)}
                                        id="volume" value={volumes} type="range" min="0" max='1' step="0.01" />
                                    : ""
                                }
                            </li>
                        </ul>
                    </div>
                    : ""
                }

            </div >
        </div >
    )
}

export default WatchHome