import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import './Modal.css';

function Modal({ setModalOpened, data }) {

    const {password, ...other} = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useState();
    const param = useParams();
    const {result} = useSelector((state) => state.authReducer.authData);

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleImageChange = (event) =>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            event.target.name === "profileImage"? setProfileImage(img) : setCoverImage(img);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        console.log(UserData);
        if(profileImage){
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
        console.log(fileName);
            data.append("name",fileName);
            data.append("file",profileImage);
            UserData.profilePicture = fileName;
            console.log(UserData);
            try{
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(updateUser(param.id, UserData));
        setModalOpened(false);
    }


  return (
    <div>
    <div className="background">
      <div className="modalContainer">
        <div className="cancel_button">
          <button className="cancel_button"
            onClick={() => {
                setModalOpened(false);
            }}
          >
            X
          </button>
        </div>
            <form className="InfoForm">
                <div>
                    <input placeholder="First Name" type="text" name="firstname" className="InfoInput"
                    onChange={handleChange} value={formData.firstname} />
                    <input placeholder="Last Name" type="text" name="lastname" className="InfoInput"
                    onChange={handleChange} value={formData.lastname} />
                </div>
                <div>
                    <input placeholder="Works At" type="text" name="worksAt" className="InfoInput"
                    onChange={handleChange} value={formData.worksAt} />
                    <input placeholder="Lives In" type="text" name="livesin" className="InfoInput"
                    onChange={handleChange} value={formData.livesin} />
                </div>
                <div>
                    <input placeholder="Country" type="text" name="country" className="InfoInput"
                    onChange={handleChange} value={formData.country} />
                    <input placeholder="Relationship Status" type="text" name="relationships" className="InfoInput"
                    onChange={handleChange} value={formData.relationships} />
                </div>
                <div>
                    Profile Image
                    <input type="file" name="profilePicture" className="InfoInput" onChange={handleImageChange}/>
                    Cover Image
                    <input type="file" name="coverPicture" className="InfoInput" onChange={handleImageChange}/>
                </div>

                <button className="button" style={{ padding: '9px',fontSize:'20px' }} onClick={handleSubmit}>Update</button>
            </form>
      </div>
    </div>
    </div>
  );
}

export default Modal;
