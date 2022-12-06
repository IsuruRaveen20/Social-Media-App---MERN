import * as UploadApi from '../api/uploadRequest'

export const uploadImage = (data) => async(dispatch) => {
    try{
        await UploadApi.uploadImage(data);
    } catch(e){
        console.log(e);
    }
}

export const uploadPost = (data) => async(dispatch) => {
    dispatch({type: 'UPLOAD_START'})

    try{
        const newPost = await UploadApi.uploadPost(data);
        dispatch({type: 'UPLOAD_SUCCESS', data: newPost.data})
    } catch(e){
        console.log(e);
        dispatch({type: 'UPLOAD_FAIL'})
    }
}