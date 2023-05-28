import React, { useRef } from 'react'
// import FildPassword from './FildCustem';
// import FildEmail from './FildEmail';

export default function SetingsCusm() {

    const Psw = useRef();
    const email = useRef();


    return (
        <div className='SetingsCusm' >
            {/* <FildPassword ref={Psw} /> */}
            {/* <FildEmail ref={email} /> */}
        </div>
    )
}
