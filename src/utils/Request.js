import instance from "./Axios"


let formdataHeader = {
    headers: { "content-type": "multipart/form-data" },
}


export const uploadPhoto = (photo) => instance.post("s", photo, formdataHeader)

export const AskQuestionVQA = (parameter = "") => instance.get("question?" + parameter)