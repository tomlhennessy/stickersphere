"use-client";

import { useState } from "react"

export default function EmailInput() {
    const [email, setEmail] = useState('')

    return (
        <div className='sign-up'>
            <input placeholder='Email address...' />
            <button className='button-card'>Sign Up</button>
        </div>
    )
}
