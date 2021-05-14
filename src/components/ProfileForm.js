import React, {useRef} from 'react'
import axios from 'axios'

function ProfileForm() {
    const name = useRef();
    const description = useRef();
    const image = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://8000-blush-lungfish-onnqbqaa.ws-eu04.gitpod.io/profiles/2/'
        const formData = new FormData();
        formData.append('name', name.current.value)
        formData.append('description', description.current.value)
        formData.append('image', image.current.files[0])
        // console.log(image)
        try {
            const {data} = await axios.put(url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
            console.log(data)
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={name} />
                <textarea ref={description} />
                <input type="file" ref={image} accept="image/*" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default ProfileForm
