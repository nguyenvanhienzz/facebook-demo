
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../Redux/Slices/userSlice';
import picture from '../../../src/img/picture.png';

const Conversation = ({ conversationss }) => {
    const [user, setUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const userselect = useSelector(selectLogin);

    useEffect(() => {
        const friendId = conversationss.members.find(item =>
            item !== userselect._id
        )

        const getUser = async () => {
            try {
                const getuser = await axios.get(`/user/?userId=${friendId}`);
                setUser(getuser.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser();

    }, [userselect, conversationss]);

    return (
        <div className='messenger-user'>
            < img src={user?.profilePicture ? PF + user.profilePicture : picture} />
            <div className='username' >
                <h4>{user?.username}</h4>
            </div>
        </div >
    )
}

export default Conversation