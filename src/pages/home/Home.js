import React, { useState, useEffect } from "react";
import NavBar from '../../components/Navbar/NavBar'
import Slider from './Slider/Slider'
import SlideShow from './SlideShow/SlideShow'
import Footer from '../../components/Footer/Footer'
import "./home.css";

function Home() {

    return (
        <>
            <NavBar />
            <SlideShow />
            <h2 className="category-top">What to Watch</h2>
            <Slider
                heading="| Trending "
                subHeading="This weeks top movie and TV"
                category="trending"
            />
            <Slider
                heading="| Most Rated "
                subHeading="Show time is here"
                category="rated"
            />
            <Slider
                heading="| Action Movies "
                subHeading="Top rated Action Movies"
                category="actionMovies"
            />
            <h2 className="category-top">Soon in your theatre</h2>
            <Slider heading="| Comming soon" category="upcoming" />
            <Footer />
        </>
    );
}

export default Home;
