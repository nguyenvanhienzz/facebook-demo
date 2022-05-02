import React from 'react'
import { Route, Routes } from 'react-router-dom';

import WatchHome from './WatchHome';

const WatchRight = ({ getwatchs }) => {
    return (
        <Routes>
            <Route path="" element={<WatchHome getwatchs={getwatchs} />} />
        </Routes>
    )
}

export default WatchRight