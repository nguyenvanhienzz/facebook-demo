import React, { useState, useRef, useEffect } from 'react'
import './Messenger.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import GifBoxIcon from '@mui/icons-material/GifBox';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import picture from '../../../src/img/picture.png';
import { format } from 'timeago.js';
import { DeleteConversations, selectConversation, selectLogin } from '../../Redux/Slices/userSlice';
import { io } from "socket.io-client";

const ChatMessenger = ({ item }) => {
    const [value, setValue] = useState('');
    const [messager, setMessager] = useState([]);
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const selectConversations = useSelector(selectConversation);
    const userselect = useSelector(selectLogin);
    const [user, setUser] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [checkOnline, setCheckOnline] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const socket = useRef();
    useEffect(() => {
        socket.current = io("ws://localhost:8080", { transports: ['websocket'] });
        socket.current.on('getMessage', ({ senderId, text }) => {
            setArrivalMessage({
                senderId,
                text,
                createAt: Date.now(),
            })
        })
    }, []);

    useEffect(() => {
        arrivalMessage && item.member.includes(arrivalMessage.senderId) && setMessager(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, item]);

    useEffect(() => {
        socket.current.emit("addUser", userselect._id);
        socket.current.on("getUsers", getUser => {
            setOnlineUser(userselect.follwings.filter(follwing => getUser.some((u) => u.userId === follwing)));
            setCheckOnline(item.members.find(it => it !== userselect._id))
        });
    }, [userselect]);
    const handerSend = async (e) => {
        const userMessage = {
            coversationId: item._id,
            sender: userselect._id,
            text: value
        }
        const receiverId = item.members.find(member => member !== userselect._id);
        socket.current.emit('getMessage', ({
            senderId: userselect._id,
            receiverId,
            text: value,
        }))
        try {
            await axios.post('/messager', userMessage);
        } catch (error) {
            console.log(error)
        }
        setValue('');
    }
    const handerEnter = async (e) => {
        if (e.code === "Enter") {
            const userMessage = {
                coversationId: item._id,
                sender: userselect._id,
                text: value
            }
            const receiverId = item.members.find(member => member !== userselect._id);
            socket.current.emit('getMessage', ({
                senderId: userselect._id,
                receiverId,
                text: value,
            }))
            try {
                await axios.post('/messager', userMessage);
            } catch (error) {
                console.log(error)
            }
            setValue('');
        }
    }
    const hader = (id) => {
        dispatch(DeleteConversations({ id }));
    };
    //get user
    useEffect(() => {
        const friendId = item.members.find(id => id !== userselect._id)
        const getUser = async () => {
            try {
                const getuser = await axios.get(`/user/?userId=${friendId}`);
                setUser(getuser.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [userselect, selectConversations]);
    //get message
    useEffect(() => {
        const getMessager = async () => {
            try {
                const mess = await axios.get(`/messager/${item._id}`);
                setMessager(mess.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMessager();
    }, [messager]);
    //scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messager])

    return (
        <div className='chat-messss'>
            <div className='chat-header'>
                <div className='img-avatar'>
                    <div className='user-online'>
                        <img src={user?.profilePicture ? PF + user.profilePicture : picture} />
                        {onlineUser.some(onl => onl === checkOnline) ? <div className='online'></div> : ''}
                    </div>
                    <div className='chat-user'>
                        <h4>{user?.username}</h4>
                        <p>Hoạt động 6 phút trước</p>
                    </div>
                </div>
                <div className='chat-icon'>
                    <li>
                        <LocalPhoneIcon />
                    </li>
                    <li>
                        <VideocamIcon />
                    </li>

                    <li>
                        <HorizontalRuleIcon />
                    </li>
                    <li>
                        <CloseIcon onClick={() => hader(item._id)} />
                    </li>
                </div>
            </div>
            <div className='chat-main'>
                <div className='chat-avatar-img'>
                    <img className='img-user-mess' src={user?.profilePicture ? PF + user.profilePicture : picture} />
                    <h4>{user?.username}</h4>
                    <div className='information-user'>
                        <p>Facebook</p>
                        <p>Các bạn là bạn bè trên Facebook</p>
                        <p>Sống tại {user?.from}</p>
                    </div>
                    <div className='friend-mess' >
                        {messager.map(mess =>
                            <div className={mess.sender === userselect._id ? 'mess own' : 'mess'} ref={scrollRef} key={mess._id}>
                                <div className={mess.sender === userselect._id ? 'date-own' : 'date'}>{format(mess.createdAt)}</div>
                                <div className={mess.sender !== userselect._id ? 'div-img-text' : 'div-text'}>
                                    {mess.sender !== userselect._id ?
                                        <img src={user?.profilePicture ? PF + user.profilePicture : picture} />
                                        : ''}
                                    <p className='p-text' >{mess.text}</p><label><MoreVertIcon className='icon-more' /></label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='chat-bottom'>
                <div className='bottom-icons'>
                    <li>
                        <AddCircleIcon />
                    </li>
                    <li>
                        <PhotoLibraryIcon />
                    </li>
                    <li>
                        <GifBoxIcon />
                    </li>
                </div>
                <div className='form-send'>
                    <input placeholder='Aa' onChange={(e) => setValue(e.target.value)} value={value} onKeyPress={handerEnter} />
                    {value ? <SendIcon onClick={handerSend} /> : <ThumbUpIcon />}
                </div>
            </div>
        </div>
    )
}

export default ChatMessenger