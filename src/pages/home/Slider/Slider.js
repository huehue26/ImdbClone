import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import './slider.css'

const api_key = "5ed54c47c3f64aafc708852433d36e1b"
const image_path = "https://image.tmdb.org/t/p/original"


function Slider(props) {

    const [shows, setShow] = useState([])

    useEffect(() => {
        var api_link = ""
        switch (props.category) {
            case "trending":
                api_link = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
                break;
            case "rated":
                api_link = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
                break;
            case "actionMovies":
                api_link = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28`
                break;
            case "upcoming":
                api_link = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-11-01&primary_release_date.lte=2022-11-30&api_key=${api_key}`
                break;
            case "recommended":
                api_link = `https://api.themoviedb.org/3/movie/${props.movie_id}/recommendations?api_key=${api_key}&language=en-US&page=1`
                break;
            default:
                api_link = ""
                break;
        }
        axios.get(api_link)
            .then(res => {
                setShow(res.data.results)
            })
            .catch(error => {
                setShow(["Something went wrong"])
            })
    }, [props])

    return (
        <div className="category">
            <h3 className="category-sub-heading">{props.heading}   <i className="fa fa-angle-right fa-lg"></i> </h3>
            <h4 className="category-sub-sub-heading">{props.subHeading}</h4>
            <div className="items">
                {
                    shows.map(show =>
                        <div key={show.id}>
                            <div className="scroll-carousel-items">
                                <div className="image">
                                    <Link to={`/show/id=${show.id}`}>
                                        <img src={image_path + show.poster_path} />
                                    </Link>
                                </div>
                                <div className="details">
                                    <div className="rating">
                                        <div>
                                            <i className="fas fa-star"></i>{show.vote_average}
                                        </div>
                                        <div>
                                            <button>
                                                <i className="far fa-star"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="heading">{show.original_title ? show.original_title : show.name}</div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}

export default Slider