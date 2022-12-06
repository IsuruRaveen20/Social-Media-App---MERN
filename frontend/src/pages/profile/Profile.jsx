import React from 'react'
import PostSide from '../../componenets/PostSide/PostSide'
import ProfileCard from '../../componenets/ProfileCard/ProfileCard'
import ProfileLeft from '../../componenets/ProfileLeft/ProfileLeft'
import RightSide from '../../componenets/RightSide/RightSide'
import './Profile.css'

function Profile() {
  return (
    <div className="Profile">
        <ProfileLeft />

        <div className="profile-center">
          <ProfileCard location="profilePage"/>
          <PostSide />
        </div>

        <RightSide />
    </div>
  )
}

export default Profile