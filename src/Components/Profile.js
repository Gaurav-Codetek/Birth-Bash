import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
function Profile(props) {
    const navData = useLocation();
    const [shortHand, setShortHand] = useState(0)
    const [userName, setUserName] = useState(0)
    const [favorite, setFavorite] = useState("Add to Favorites")
    const [roll, setRoll] = useState("");

    const createShortHand = () => {
        const Name = navData.state.searchedUser;
        const letter1 = Name.charAt(0);
        const n = Name.length;

        for (var i = 0; i < n; i++) {
            if (Name.charAt(i) === " ") {
                const letter2 = Name.charAt(i + 1);
                setShortHand(letter1 + letter2);

                const firstName = letter1 + Name.toLowerCase().slice(1, i) + " " + letter2 + Name.toLowerCase().slice(i + 2);
                setUserName(firstName)

                break;
            }
        }
    }

    const addFav = async () => {
        const Name = navData.state.searchedUser;

        try {
            const res = await fetch(`http://localhost:4400/addFavorite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ Name, roll })
            })
            const data = res.json();
            console.log(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        createShortHand()
    }, [])

    useEffect(()=>{
        sessionStorage.getItem(navData.state.rollNo)
        const nameOfUser = navData.state.rollNo
        sessionStorage.setItem("nameOfUser", nameOfUser)
        setRoll(nameOfUser)
      },[])

    return (
        <>
            <header className='profileHead'>
                <div className="dpProfile">
                    <p className="shortName">{shortHand}</p>
                    <p className='fullName'>{userName} <br /> <b className='cat'>{navData.state.branch} {navData.state.year}</b></p>
                    <div className="wishCount">
                        <p>0</p>
                        <h3>wish Count</h3>
                    </div>
                    <div className="favoriteCount">
                        <p>0</p>
                        <h3>Favorite to</h3>
                    </div>
                    <div className="addFavBtn">
                        <button onClick={addFav} className='favoriteBtn'>{favorite}</button>
                    </div>
                </div>
            </header>
            <main className='profilePage'>
                <li className="InfoArea">
                    <h1 className='bioHead'>Bio</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestias sint sequi alias porro architecto dolore minima dolorem officiis voluptate.</p>
                </li>
                <li className="InfoArea">
                    <h1 className='bioHead'>Personality Chain</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestias sint sequi alias porro architecto dolore minima dolorem officiis voluptate.</p>
                </li>
                <li className="InfoArea">
                    <h1 className='bioHead'>Wish Count</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestias sint sequi alias porro architecto dolore minima dolorem officiis voluptate.</p>
                </li>
                <li className="InfoArea">
                    <h1 className='bioHead'>Favorite Count</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestias sint sequi alias porro architecto dolore minima dolorem officiis voluptate.</p>
                </li>
            </main>
        </>
    );
}

export default Profile