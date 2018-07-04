import axios from 'axios';
export function blobToBase64 (blob) {
    return new Promise((resolve, reject) => {
        if (!blob instanceof Blob)
            reject('You must specifty a blob as a parameter')

        var reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            let base64data = reader.result
            resolve(base64data)
        }

    })
}

export function setAuthorizationToken(token){
    console.log("token: ", token)
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}


