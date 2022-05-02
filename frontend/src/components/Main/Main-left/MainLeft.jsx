import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../../Redux/Slices/userSlice';
import picture from '../../../img/picture.png';
import './MainLeft.css';
import { useNavigate } from 'react-router';

const MainLeft = () => {
  const userselect = useSelector(selectLogin);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className='main-left' >
        <ul className='main-menu'>
          <li><img src={userselect.profilePicture ? PF + userselect.profilePicture : picture} />{userselect.username}</li>
          <li onClick={() => navigate('/friends')}><img src=' https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png' />Bạn bè</li>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png' />Nhóm</li>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png' />Marketplace</li>
          <li onClick={() => navigate('/watchs')}><img src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png' />Watch</li>
          <div className='border-menu'></div>
        </ul>
        <label className='menu-title'>Lối Tắt Của Bạn</label>
        <ul className='menu-group'>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png' />Tuyển Dụng It</li>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png' />K21-Đại Học Công Nghiệp Hà Nội</li>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png' />OMG</li>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png' />Tuyển Dụng It</li>
          <li><img src='https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png' />K21-Đại Học Công Nghiệp Hà Nội</li>

        </ul>
      </div>
    </>
  )
}

export default MainLeft