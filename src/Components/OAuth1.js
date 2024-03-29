import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function OAuth1() {
    const nav = useNavigate()
    const [roll, setRoll] = useState("");
    const [rollName, setRollName] = useState("")
    const [pass, setPass] = useState("")


    const onLoad = async () => {
        try {
            const res = await fetch(`http://localhost:4400/`, {
                method: 'GET',
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            // setData(data);
            if (res.status === 200) {
                console.log("status code match")
                nav('/home', {state:{rollNo: roll}});
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const onCont = async (e) => {

        let a = document.querySelector(".loader")
        a.style.width = "96%"

        e.preventDefault()
        try {

            const res = await fetch(`http://localhost:4400/Oauth`, {
                method: 'POST',
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roll }),
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json();
                // var username = data.username;


                if (data.auth === "exist") {
                    nav('/auth1', { state: { username: data.username, rollNo: roll } })
                }

                else if (data.auth !== "exist") {
                    alert("Roll Number doesn't exist")
                    a.style.width = "0%"
                }
            }
            else {
                console.log("response not ok")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        onLoad()
    }, [])

    return (
        <>
            <div className="loader"></div>
            <header className='_Project-Name'>
                Birth-Bash
            </header>
            <main>
                <h1 className='welBack'>Welcome back</h1>
                <div className="emailInp">
                    <input onChange={(text) => setRoll(text.target.value)} type="text" id='Email' required />
                    <br />
                    <label className='emailLabel' htmlFor="Email">Roll number (UIET)</label>
                </div>
                <div className="contBtn">
                    <button onClick={onCont}>Continue</button>

                </div>
                <p className='registerLine'>Haven't registered yet? <span className='register'>Register</span></p>
                <div className="orSec">
                    <div></div>
                    <p>OR</p>
                    <div></div>
                </div>
            </main>
        </>
    );
}

export default OAuth1