import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Notification from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import { Link } from 'react-router-dom'

export default function RightSide() {

  return (
    <div className="RightSide">
        <div className="navIcons">
          <Link to='../home'>
          <img src={Home} alt="" />
          </Link>
            <UilSetting />
            <img src={Notification} alt="" />
            <img src={Comment} alt="" />
        </div>

        <TrendCard />

        <button className="button r-button">
          Share
        </button>
    </div>
  )
}
