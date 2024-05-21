import React from 'react';
import './sytle.css'
export default function TextInput({ error, ...props }) {
    return (
        <>
            <input {...props}></input>
            <div className='error-text'>{error}</div>
        </>
    );
}
