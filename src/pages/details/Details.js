import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Info from "./info/Info";
import Slider from "../home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const api_key = "5ed54c47c3f64aafc708852433d36e1b";

function Details() {
    const { id } = useParams();
    const [show, setShow] = useState([]);

    useEffect(() => {
        axios
            .get(`http://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=videos`)
            .then((response) => {
                setShow(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        window.scroll(0, 0);
    }, [id]);

    return (
        <div>
            <NavBar />
            {Object.entries(show).length ? <Info data={show} /> : ""}
            <Slider
                category="recommended"
                movie_id={id}
                heading="| You may also like"
            />
            <Footer />
        </div>
    );
}

export default Details;
