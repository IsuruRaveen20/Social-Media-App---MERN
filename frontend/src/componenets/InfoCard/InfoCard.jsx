import React, { useState, useEffect } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js'
import Modal from '../modal/Modal';
import { logout } from '../../actions/AuthAction';

const InfoCard=()=> {
    const [modalOpened, setModalOpened] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})

    const {result} = useSelector((state)=>state.authReducer.authData)

    useEffect(()=> {
        const fetchProfileUser = async()=>{
            if(profileUserId === result._id){
                setProfileUser(result)
            } else{
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
            }
        }
        fetchProfileUser()
    },[result])

    function edit() {
        setModalOpened(true);
    }

    const handleLogOut = () => {
        dispatch(logout())
    }

  return (
    <div className="InfoCard">
        <div className="InfoHead">
            <h3>Profile Info</h3>
            {result._id === profileUserId? (            
            <div>
            <UilPen width='2rem' height='1.2rem'
            onClick={edit}/>
            {modalOpened && <Modal setModalOpened={setModalOpened} data={result}/>}
            </div>):("")}
        </div>

        <div className="info">
            <span><b>Status </b></span>
            <span>{profileUser.relationships}</span>
        </div>
        <div className="info">
            <span><b>Lives in </b></span>
            <span>{profileUser.livesin}</span>
        </div>
        <div className="info">
            <span><b>Works at </b></span>
            <span>{profileUser.worksAt}</span>
        </div>

        <button className="button logout-button"
        onClick={handleLogOut}
        >
            Logout
        </button>
    </div>
  )
}

export default InfoCard