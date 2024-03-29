import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { FaCaretUp } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";

function Home({ user }) {
    const nav = useNavigate();
    const navData = useLocation();
    const [favor, setFavor] = useState(
        <IoIosAddCircleOutline color='rgb(118, 23, 187)' size="25" />
    )
    const [birth, setBirth] = useState([]);
    const [display, setDisplay] = useState("Today's Party");
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [searchRes, setSearchRes] = useState([])
    const [searchInp, setSearch] = useState("");
    const [dropSec, setDropSec] = useState(false)
    const [shortHand, setShortHand] = useState(0);
    const [userName, setUserName] = useState("Xxxxxx xxxxx");
    var result;



    const onLogOut = () => {
        fetch(`http://localhost:4400/logout`, {
            method: "GET",
            status: 200,
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            // console.log()
            nav("/", { replace: true });
        })
            .catch((e) => {
                console.log("Logout Error")
            })

    }

    const search = async () => {
        try {
            const res = await fetch(`http://localhost:4400/search`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const data = await res.json();
            // console.log(data)
            setSearchRes(data);
        }
        catch (err) {
            console.log(err)
        }
    }

    const onLoad1 = async () => {
        try {
            const today = new Date();
            const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
            const month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth();
            const todayDate = (date + "" + month).toString();
            // const todayDate = "2709"
            console.log(todayDate)
            const res = await fetch(`http://localhost:4400/checkDate`, {
                method: "POST",
                status: 200,
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ todayDate })
            })
            const data = await res.json();
            if (data.length === 0) {
                setDisplay("No parties today :(")
            }
            console.log(result);
            console.log(data)
            setBirth(data);
        }
        catch (err) {
            console.log(err)
        }
    }

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
            setData(data);
            if (!res.status === 200) {
                console.log("status code error")
                nav('/authO');
            }
            const letter1 = data.Name.charAt(0).toUpperCase();
            const n = data.Name.length;
            const lowCase = data.Name.toLowerCase();
            const standardCase = lowCase.charAt(0).toUpperCase() + lowCase.slice(1);
            for (var i = 0; i <= n; i++) {
                if (data.Name.charAt(i) === " ") {
                    const letter2 = data.Name.charAt(i + 1).toUpperCase();
                    const shortHand = letter1 + letter2;
                    setShortHand(shortHand);
                    const a = standardCase.substr(0, i)
                    const result = a + " " + standardCase.charAt(i + 1).toUpperCase() + standardCase.slice(i + 2);
                    setUserName(result)
                }
            }
        } catch (err) {
            console.log("Network Error")
            nav('/')
        }
    }

    const onSearch = (event) => {
        if (event.target.value !== "") {
            setSearchData(searchRes.filter(f => f.Name.includes(event.target.value.toUpperCase())))
            console.log(searchData)
            let a = document.querySelector(".searchList");
            a.style.display = "block"


        }
        else if (event.target.value === "") {
            setSearchData([])
            let a = document.querySelector(".searchList");
            a.style.display = "none"
        }
    }

    const individualProfile = (userName, year, branch)=>{
        try{
            nav('/wishes', {state : {Name: userName, Year: year, Branch: branch}})
        }catch(err){
            console.log(err)
        }
    }

    const birthName = birth.map((a) =>
        <>
            <div onClick={()=>individualProfile(a.Name, a.Year, a.Branch, )} className="card">
                <p className='cardName'>{a.Name}</p>
                <p className='cardYear'>{a.Year} {a.Branch}<span>Send Wishes</span></p>
            </div>
        </>
    )

    const monthConverter = (date) => {
        let a = ["Mon", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const str = String(date);
        const month = parseInt(str.charAt(2) + str.charAt(3));
        const dat = parseInt(str.charAt(0) + str.charAt(1));
        return dat + " " + a[month]
        // console.log("monthConverter: " + a[month]);
    }

    const cardProfile = (Name, Branch, Year, Matcher, shortHand)=>{
        nav('/profile', {state:{rollNo: navData.state.rollNo ,user:data.Name, searchedUser:Name, branch:Branch, year:Year, matcher:Matcher, shortForm:shortHand}})
    }

    const searchList = searchData.map((a) =>
        <>
            <li onClick={()=>cardProfile(a.Name,a.Branch,a.Year,a.Matcher, shortHand)} className='searchCard'>
                <div className="userDet">
                    <b>{a.Name}</b>
                    <p>{a.Branch} {a.Year} <span>{monthConverter(a.Matcher)}</span></p>
                </div>
            </li>
        </>
    )
    useEffect(() => {
        onLoad()
        onLoad1()
        search()
    }, [])

    return (
        <>
            <div className="home">
                <header className='homeHead'>
                    <div className="_ProjectName">
                        Birth-<span>Bash</span>
                    </div>
                    <div className="searchBox">
                        <input type="search" name="SearchBox" id="searchBox" placeholder="Search your friend's birthday" onChange={onSearch} />
                        <label htmlFor="searchBox"><FaSearch color='rgb(118, 23, 187)' /></label>
                        <div className="searchList">
                            {searchList}
                        </div>
                    </div>
                    <div onClick={() => {
                        setDropSec((prev) => !prev)

                    }} className="profile">
                        <div className="dp">
                            {shortHand}
                        </div>
                        <div className="userID">
                            {userName}
                        </div>
                        <div className="dropDown">
                            {dropSec ? (
                                <FaCaretUp color='rgb(118, 23, 187)' />) : (
                                <FaCaretDown color='rgb(118, 23, 187)' />)}
                        </div>
                    </div>
                    {dropSec ? <div className="dropSec">
                        <li>Profile</li>
                        <li>Favourite</li>
                        <li onClick={onLogOut}>Log out</li>
                    </div> : <></>}
                </header>
                <main className='mainArea'>
                    <div className="navRTC">
                        <p>Navigation</p>
                    </div>
                    <div className="listArea">
                        <p><b>{display}</b> <span><LuPartyPopper color='rgb(118, 23, 187)' /></span></p>
                        <div className="listSec">
                            {birthName}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home