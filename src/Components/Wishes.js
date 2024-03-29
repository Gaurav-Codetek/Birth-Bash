import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { LiaTelegram } from "react-icons/lia";

function Wishes(props) {
    const nav = useNavigate();
    const navData = useLocation();
    const [msg, setMsg] = useState("");

    const Name = navData.state.Name;
    const Branch = navData.state.Branch;
    const Year = navData.state.Year;

    const onSend = async () => {

        try {

            const res = await fetch(`http://localhost:4400/mailSender`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ msg, Name })
            }).then(res => {
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <textarea name="WishMessage" id="msg" cols="30" rows="10" placeholder='Write a memorable message' onChange={(e) => setMsg(e.target.value)}></textarea>
            <button onClick={onSend} className='sendWish'> Send <LiaTelegram /></button>
        </>
    );
}

export default Wishes