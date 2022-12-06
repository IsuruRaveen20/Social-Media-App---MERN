import React from 'react';
import PostSide from '../../componenets/PostSide/PostSide';
import ProfileSide from '../../componenets/profileSide/ProfileSide';
import RightSide from '../../componenets/RightSide/RightSide';
import './Home.css';

function Home (){
  return (
    <div className="Home">
        <ProfileSide/>
        <PostSide />
        <RightSide />
    </div>
  )
}

export default Home
