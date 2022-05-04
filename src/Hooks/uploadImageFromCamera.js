
import { consts } from '../Constants';


let headers = {
    method: 'POST',
    headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
    },
}

const UploadImage = async ({ imageOBJ }) => {


    return await fetch(consts.API_URL + "file", { ...headers, body: imageOBJ })
        .then(async response => {
            // console.log(await response.text())
            // setFilename(await response.text())
            return await response.text()
        }).then(last_response => {
            // console.log(last_response);
            // setFilename(last_response)
            // let img = api_url + 'images/' + last_response
            let img = consts.API_URL + 'image?image=' + last_response
            console.log("imggg", img);
            // set(img)
            return last_response
        })
        .catch(err => {
            // setImage("")
            console.warn(err.data);
        })



}
export default UploadImage;
