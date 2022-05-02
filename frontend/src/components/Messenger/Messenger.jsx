import React, { useEffect, useCallback, useState } from 'react';
import './Messenger.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ModeIcon from '@mui/icons-material/Mode';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Conversations, selectLogin } from '../../Redux/Slices/userSlice';
import axios from 'axios';
import Conversation from './Conversation';
import { selectConversation } from '../../Redux/Slices/userSlice';
const Messenger = ({ setMessenger, messenger }) => {
    const userselect = useSelector(selectLogin);
    const [conversations, setConversations] = useState([]);
    const dispatch = useDispatch();
    const selectConversations = useSelector(selectConversation)
    useEffect(() => {
        const getconversations = async () => {
            try {
                const conver = await axios.get(`/conversation/${userselect._id}`);
                setConversations(conver.data);
            } catch (err) {
                console.log(err);
            }
        }
        getconversations();
    }, [userselect._id, conversations]);
    const hader = useCallback((conversation) => {
        dispatch(Conversations(conversation))
        if (!selectConversations) {
            setMessenger({ app: false, mess: !messenger.mess, noti: false, arrow: false })
        } else {
            setMessenger({ app: false, mess: false, noti: false, arrow: false })
        }

    }, [messenger]);
    return (
        <>
            <div className='messenger'>
                <div className='messenger-default'>
                    <div className='messenger-header'>
                        <h2>Messenger</h2>
                        <div className='messheader-icon'>
                            <li>
                                <MoreHorizIcon />
                            </li>
                            <li>
                                <ZoomInMapIcon />
                            </li>
                            <li>
                                <VideoCameraBackIcon />
                            </li>
                            <li>
                                <ModeIcon />
                            </li>
                        </div>
                    </div>
                    <div className='messenger-input'>
                        <SearchIcon />
                        <input placeholder='Tìm kiếm trên Messenger' />
                    </div>
                    {
                        conversations.map((conversation, index) => (
                            <div onClick={() => hader(conversation)} key={index}>
                                <Conversation conversationss={conversation} />
                            </div>
                        ))
                    }
                </div>
                <div className='mess-bottom'></div>
            </div>
        </>
    )
}

export default Messenger