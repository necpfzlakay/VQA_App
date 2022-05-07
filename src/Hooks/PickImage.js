
import * as ImagePicker from 'expo-image-picker';
import { consts } from '../Constants';

const pickImage = async (set) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    }).then(res => {
        // console.log("Image From Device", res);
        let formdt = new FormData();

        // // Assume "photo" is the name of the form field the server expects 
        // setFilename(res.width + res.uri.split("/")[res.uri.split("/").length - 1])
        let file_name = res.width + res.uri.split("/")[res.uri.split("/").length - 1]
        let photo_data = {
            uri: res.uri,
            name: file_name,
            type: res.type
        }
        formdt.append("photo", photo_data)
        // console.log("formData", formdt);
        console.warn("FORMDATAAA  111 ---", formdt);
        if (!res.cancelled) {
            // setImage(res.uri);
        }
        return formdt
    })
        .then(async formData => {
            console.log("formdt", formData);
            console.warn("FORMDATAAA  222 ---", formData);
            return await fetch(consts.API_URL + "file", {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
                .then(async response => {
                    // console.log(await response.text())
                    // setFilename(await response.text())
                    return await response.text()
                }).then(last_response => {
                    // console.log(last_response);
                    // setFilename(last_response)
                    // let img = api_url + 'images/' + last_response
                    let img = consts.API_URL + 'image?image=' + last_response
                    console.log(img);
                    set(img)
                    return last_response
                })
                .catch(err => {
                    // setImage("")
                    console.warn(err.data);
                })

        })
    console.log("result ", result);

    return result
};

export { pickImage }