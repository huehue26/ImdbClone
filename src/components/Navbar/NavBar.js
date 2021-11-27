import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'
import logo from './imdb-logo.png';

function NavBar() {

    const [navShow, setNavShow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 200 ? setNavShow(true) : setNavShow(false)
        })
        if (navShow) {
            document.getElementById("nav-bar").style.backgroundImage = ""
            document.getElementById("nav-bar").style.backgroundColor = "black"
        } else {
            document.getElementById("nav-bar").style.backgroundColor = ""
            document.getElementById("nav-bar").style.backgroundImage = "linear-gradient(black, transparent)"
        }
    }, [navShow]);

    // searching on button click
    const searchClickHandler = () => {
        const search_value = document.getElementById("search-nav-bar").value
        navigate(`/search/q=${search_value}`)
    }

    // searching on presssing enter
    const searchInputHandler = (e) => {
        if (e.key == 'Enter') {
            const search_value = document.getElementById("search-nav-bar").value
            navigate(`/search/q=${search_value}`)
        }
    }

    return (
        <div id="nav-bar">
            <Link to="/">
                <img src={logo} className="logo" alt="logo" />
            </Link>
            <div className="nav-bar-heading">
                <button className="btn-1 menu"> <i className="fa fa-bars"></i> Menu</button>
                <span id="form">
                    <input className="search" id="search-nav-bar" placeholder="Search" onKeyPress={searchInputHandler} />
                    <button onClick={searchClickHandler} ><i className="fas fa-search"></i></button>
                </span>
                <button className="btn-1 WatchList"><i className="fa fa-clipboard-list"></i> Watchlist</button>
                <button className="btn-1 sign-in">Sign In</button>
            </div>
        </div >
    )
}

export default NavBar
