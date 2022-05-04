import React from "react";

const AddPhotosToFormData = ({ photos, formDt }) => {
    if (!formDt) {
        formDt = new FormData()
    }
    console.log("PHOTOSSS--->", photos);
    photos.forEach(item => {
        formDt.append('photos', {
            uri: item.uri,
            type: "image/jpeg",
            name: item.uri.split("/")[item.uri.split("/").length - 1]
        })
        // formDt.append("photos", element)
        console.log("PHOTO-PHOTO", item.uri);
    });

    return formDt
}

const AddElementsToFormData = ({ form, formDt, }) => {
    if (!formDt) {
        formDt = new FormData()
    }
    Object.keys(form).map((key, index) => {
        formDt.append(key, form[key])
        console.log("----FormData Element-------", form[key], key)
    });
    return formDt
}

export { AddPhotosToFormData, AddElementsToFormData }