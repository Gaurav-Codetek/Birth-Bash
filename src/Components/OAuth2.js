import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function OAuth2() {
    // const auth1 = "exist"
    const navData = useLocation();
    const nav = useNavigate();
    const [dataNew, setData] = useState([]);
    const [rollName, setRollName] = useState("");
    const [pass, setPass] = useState("");
    const [password, setPassword] = useState("")





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
            if (res.status === 200) {
                console.log("status code match")
                nav('/home');
            }
        }
        catch (err) {
            // console.log(err)
        }
    }


    const onCont = async () => {
        let a = document.querySelector(".loader")
        a.style.width = "96%"

        try {
            const a = navData.state.rollNo;
            const b = pass;
            console.log(a, b)
            const res = await fetch(`http://localhost:4400/OAuth1`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ a, b }),
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json();
                if (data.auth === 'valid') {
                    nav('/home', {state:{rollNo: navData.state.rollNo}});
                }
                else if (data.auth === 'Invalid') {
                    alert('Unknown error')
                    a.style.width = "0%";
                }
                else if (data.auth !== 'valid') {
                    alert('Incorrect Password')
                    a.style.width = "0%"
                }
                console.log(data)
            }
        }
        catch (err) {
            // console.log(err)
        }
    }

    useEffect(() => {
        try {
            onLoad()
            const Name = navData.state.username;
            setRollName(Name)
        } catch (err) {
            nav('/')
        }
    }, [])

    // useEffect(()=>{
    //     sessionStorage.getItem(navData.state.username)
    //     const nameOfUser = navData.state.username
    //     sessionStorage.setItem("nameOfUser", nameOfUser)
    //     setRollName(nameOfUser)
    //   },[])

    return (
        <>
            <div className="loader"></div>
            <header className='_Project-Name'>
                Birth-Bash
            </header>
            <main>
                <h1 className='passHead'>Enter your password</h1>
                <div className="emailInp">
                    <input value={rollName} type="text" id='Email' required />
                    <br />
                    <label className='emailLabel' htmlFor="Email">Name</label>
                </div>
                <div className="passInp">
                    <input onChange={(text) => setPass(text.target.value)} type="password" id='password' required />
                    <br />
                    <label className='emailLabel' htmlFor="password">Password</label>
                </div>
                <div className="contBtn">
                    <button onClick={onCont}>Log in</button>
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

export default OAuth2