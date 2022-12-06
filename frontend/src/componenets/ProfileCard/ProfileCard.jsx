import React from 'react'
import { useSelector } from 'react-redux';
import './ProfileCard.css'
import {Link} from 'react-router-dom'

function ProfileCard({location}) {

  const {result} = useSelector((state)=>state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic =  process.env.REACT_APP_PUBLIC_FOLDER


  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={result.coverPicture? serverPublic + result.coverPicture:serverPublic+"cover.jpg"} alt="" />
        <img src={result.profilePicture? serverPublic + result.profilePicture:serverPublic+"profile_default.jpg"} alt="" />
      </div>

      <div className="ProfileName">
        <span>{result.firstname} {result.lastname}</span>
        <span>{result.worksAt? result.worksAt : "write about your self!"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{result.following.length}</span>
            <span>followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{result.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
          <>
          <div className="vl"></div>
          <div className="follow">
            <span>{posts.filter((post) => post.userId === result._id).length}</span>
            <span>Posts</span>
          </div>
          </>
          )}

        </div>
        <hr />
      </div>
      {location === 'profilePage' ? "" : <span>
        <Link style={{ textDecoration: 'none', color:'inherit' }} to={`/profile/${result._id}`}>My Profile</Link>
        </span>}

    </div>
  )
}

export default ProfileCard