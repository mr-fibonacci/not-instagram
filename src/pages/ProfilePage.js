import axios from 'axios'
import React, { useState, useEffect } from 'react'

function ProfilePage(props) {
    const { id } = props.match.params
    const [profile, setProfile] = useState(null)
    useEffect(() => {
        axios.get(`/profiles/${id}/`)
        .then(response => setProfile(response.data))
        .catch(err => console.log(err.request))
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default ProfilePage
