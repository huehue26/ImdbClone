import axios from "axios";
import React, { useState, useEffect } from "react";
import "./info.css";

const api_key = "5ed54c47c3f64aafc708852433d36e1b";
const image_base = "https://image.tmdb.org/t/p/original/";

function Info(props) {
    var x = props.data;

    const [cast, setCast] = useState([]);
    const [reviews, setReview] = useState([]);

    const playVideoHandler = () => {
        document.getElementById("thumbnail").style.zIndex = "1";
        document.getElementById("trailer-video").src += "?autoplay=1";
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${props.data.id}/credits?api_key=${api_key}`
            )
            .then((res) => {
                setCast(res.data.cast);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${props.data.id}/reviews?api_key=${api_key}&language=en-US&page=1`
            )
            .then((res) => {
                setReview(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props]);

    return (
        <div className="info-container">
            <div className="top">
                <div className="name">
                    <div className="heading">
                        {x.original_title ? x.original_title : "Title can't be loaded"}
                    </div>
                    <div className="release">
                        {x.release_date ? x.release_date : "0000-00-00"}
                        <span>{x.original_language ? x.original_language : ""}</span>
                    </div>
                </div>
                <div className="rate">
                    <div className="rating">
                        <div className="heading">Imdb Rating</div>
                        <div className="value">
                            <i className="fas fa-star"></i>{" "}
                            {x.vote_average ? x.vote_average : "0.0"}/<span>10</span>
                        </div>
                    </div>
                    <div className="your-rating">
                        <div className="heading">Your Rating</div>
                        <div className="value">
                            <i className="far fa-star"></i>
                        </div>
                    </div>
                    <div className="popularity">
                        <div className="heading">Popularity</div>
                        <div className="value">
                            <i className="fas fa-chart-line"></i>{" "}
                            {x.popularity ? x.popularity : "0000.00"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mid">
                <div className="image">
                    <img src={`${image_base}${x.poster_path}`} alt="poster" />
                </div>
                <div className="video">
                    <div id="thumbnail" onClick={playVideoHandler}>
                        <div className="image">
                            <img src={image_base + x.backdrop_path} />
                        </div>
                        <div className="overlay">
                            <i className="fas fa-play-circle"></i> Play Trailer
                        </div>
                    </div>
                    <div className="trailer">
                        <iframe
                            width="850"
                            height="500"
                            src={
                                Object.entries(x.videos.results).length
                                    ? `https://www.youtube-nocookie.com/embed/${x.videos.results[0].key}`
                                    : ""
                            }
                            title="YouTube video player"
                            frameBorder="0"
                            id="trailer-video"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="details">
                <div className="genre">
                    <div className="details">
                        {x.genres ? x.genres.map((s) => <p>{s.name}</p>) : ""}
                    </div>
                </div>
                <div className="overview">
                    <div className="heading">
                        Overview <i className="fas fa-chevron-right"></i>
                    </div>
                    <div className="details">{x.overview ? x.overview : ""}</div>
                </div>
                <div className="cast">
                    <div className="heading">
                        Top Cast <i className="fas fa-chevron-right"></i>
                    </div>
                    <div className="details">
                        {cast.map((cast) => (
                            <div className="card">
                                <div className="image">
                                    <img
                                        src={
                                            cast.profile_path
                                                ? image_base + cast.profile_path
                                                : "https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg"
                                        }
                                        alt="cast-image"
                                    />
                                </div>
                                <div className="position">
                                    {cast.original_name} <span>as {cast.character}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="reviews">
                    <div className="heading">
                        Reviews <i className="fas fa-chevron-right"></i>
                    </div>
                    <div id="details">
                        {
                            reviews.total_results ? reviews.results.map(re =>
                                < div className="card" >
                                    <div className="avtar">
                                        <img src={re.author_details.avatar_path ? image_base + re.author_details.avatar_path : "https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg"} alt="avtar" />
                                    </div>
                                    <div>
                                        <div className="name">
                                            {re.author_details.username}<span>{re.updated_at}</span>
                                        </div>
                                        <div className="review">
                                            {re.content}
                                        </div>
                                    </div>
                                </div>) : <div className="no-review">No review found </div>
                        }
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Info;
