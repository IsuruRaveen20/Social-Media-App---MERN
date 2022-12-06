// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { getAllUser } from '../../api/UserRequest';

// function User({person}) {

//     const serverPublic =  process.env.REACT_APP_PUBLIC_FOLDER


//   return (
//     <div className="follower">
//                 <div>
//                     <img src={person.profilePicture? serverPublic + person.profilePicture:serverPublic+"profile_default.jpg"} alt="" className="followerImage" />
//                     <div className="name">
//                         <span>{person.firstname}</span>
//                         <span>{person.email}</span>
//                     </div>
//                 </div>
//                 <button className="button fc-button">
//                     Follow
//                 </button>
//             </div>
//   )
// }

// export default User