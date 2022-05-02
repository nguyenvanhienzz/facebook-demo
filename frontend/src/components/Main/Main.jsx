import React from 'react';
import './Main.css'
import MainCenter from './Main-center/MainCenter'
import MainLeft from './Main-left/MainLeft'
import MainRight from './Main-right/MainRight'

const Main = () => {
  return (
    <div className='main'>
      <MainLeft />
      <MainCenter />
      <MainRight />
    </div>
  )
}

export default Main