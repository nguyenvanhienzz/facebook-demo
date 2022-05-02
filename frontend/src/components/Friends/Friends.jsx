import React from 'react'
import './Friends.css';
const Friends = () => {
    return (
        <div className='component-friends'>
            <div className='friends-default'>
                <h3>Lời mời kết bạn</h3>
                <div className='grid-friends'>
                    <div className='friend-requests'>
                        <img className='img-friend' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmYQVHPuGfPtw3X1uWCKvhmm57ygy00YANA&usqp=CAU' />
                        <div className='information-friends'>
                            <h4>Nguyễn Văn Hiển</h4>
                            <button>Xác nhận</button><br />
                            <button className='friends-clear'>Xóa</button>
                        </div>
                    </div>
                    <div className='friend-requests'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmYQVHPuGfPtw3X1uWCKvhmm57ygy00YANA&usqp=CAU' />
                        <div className='information-friends'>
                            <h4>Nguyễn Văn Hiển</h4>
                            <button>Xác nhận</button><br />
                            <button className='friends-clear'>Xóa</button>
                        </div>
                    </div>
                    <div className='friend-requests'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmYQVHPuGfPtw3X1uWCKvhmm57ygy00YANA&usqp=CAU' />
                        <div className='information-friends'>
                            <h4>Nguyễn Văn Hiển</h4>
                            <button>Xác nhận</button><br />
                            <button className='friends-clear'>Xóa</button>
                        </div>
                    </div>
                    <div className='friend-requests'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmYQVHPuGfPtw3X1uWCKvhmm57ygy00YANA&usqp=CAU' />
                        <div className='information-friends'>
                            <h4>Nguyễn Văn Hiển</h4>
                            <button>Xác nhận</button><br />
                            <button className='friends-clear'>Xóa</button>
                        </div>
                    </div>
                    <div className='friend-requests'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmYQVHPuGfPtw3X1uWCKvhmm57ygy00YANA&usqp=CAU' />
                        <div className='information-friends'>
                            <h4>Nguyễn Văn Hiển</h4>
                            <button>Xác nhận</button><br />
                            <button className='friends-clear'>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends