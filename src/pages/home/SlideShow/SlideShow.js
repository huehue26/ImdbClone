import React, { useState, useEffect } from 'react'
import Loader from '../../../components/Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './slideshow.css'

const image_base = "https://image.tmdb.org/t/p/original/"
const api_key = "5ed54c47c3f64aafc708852433d36e1b"

function SlideShow() {

    const [show_image, setShow] = useState("")
    const [show_image_next_1, setShow_1] = useState("")
    const [show_image_next_2, setShow_2] = useState("")
    const [show_image_next_3, setShow_3] = useState("")
    const [show_details, setDetails] = useState([])
    const [load, setLoad] = useState(true)
    const [idSlideshow, setIdSlideshow] = useState("576845")
    const [loaded, setDataLoaded] = useState(false)
    const [shows, setShows] = useState([])

    let current_show = 0

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
            .then(res => {
                let result_shows = res.data.results
                // shuffling the shows order
                for (let i = 0; i < 10; i++) {
                    let x = Math.floor(Math.random() * 20)
                    let y = Math.floor(Math.random() * 20)
                    let z = result_shows[x]
                    result_shows[x] = result_shows[y]
                    result_shows[y] = z
                }
                for (var i = 0; i < result_shows.length; i++) {
                    shows.push(result_shows[i])
                }
                setDataLoaded(true)

                let image_url = ""
                image_url = shows[current_show].backdrop_path
                setShow(image_base + image_url)
                setIdSlideshow(shows[current_show].id)
                setShow_1(image_base + shows[(current_show + 1) % 20].backdrop_path)
                setShow_2(image_base + shows[(current_show + 2) % 20].backdrop_path)
                setShow_3(image_base + shows[(current_show + 3) % 20].backdrop_path)
                setDetails(shows[current_show])
                current_show = current_show + 1
                current_show = current_show % 20
                setLoad(false)

                const interval = setInterval(() => {
                    let image_url = ""
                    image_url = shows[current_show].backdrop_path
                    setShow(image_base + image_url)
                    setIdSlideshow(shows[current_show].id)
                    setShow_1(image_base + shows[(current_show + 1) % 20].backdrop_path)
                    setShow_2(image_base + shows[(current_show + 2) % 20].backdrop_path)
                    setShow_3(image_base + shows[(current_show + 3) % 20].backdrop_path)
                    setDetails(shows[current_show])
                    current_show = current_show + 1
                    current_show = current_show % 20
                }, 15000)
                return (() => {
                    clearInterval(interval)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    function upNextSlideshowHandler(x) {
        if (loaded) {
            console.log(x)
            let image_url = ""
            image_url = shows[(current_show + x) % 20].backdrop_path
            setShow(image_base + image_url)
            setIdSlideshow(shows[(current_show + x) % 20].id)
            setShow_1(image_base + shows[((current_show + x) % 20 + 1) % 20].backdrop_path)
            setShow_2(image_base + shows[((current_show + x) % 20 + 2) % 20].backdrop_path)
            setShow_3(image_base + shows[((current_show + x) % 20 + 3) % 20].backdrop_path)
            setDetails(shows[(current_show + x) % 20])
            current_show = (current_show + x) % 20
        }
    }

    return (
        <div className="slideshow">
            {load ? <Loader /> : ""}
            {
                !load ?
                    <img src={show_image} alt="slideshow_image" className="image" />
                    : ""
            }
            {
                !load ?
                    <div className="details">
                        <p className="title">
                            {show_details.original_title}
                        </p>
                        <p className="discription">
                            {show_details.overview}
                        </p>
                        <Link to={`/show/id=${idSlideshow}`} >
                            <button className="trailer">
                                <i className="fas fa-play fa-sm"></i> Trailer
                            </button>
                        </Link>
                        <Link to={`/show/id=${idSlideshow}`} >
                            <button className="watchlist">
                                <i className="fas fa-info-circle"></i>  More Info
                            </button>
                        </Link>
                    </div>
                    : ""
            }
            {
                !load ?
                    <div className="next_shows">
                        <p>Up Next</p>
                        <div onClick={() => { upNextSlideshowHandler(1) }}>
                            <img src={show_image_next_1} alt="slideshow_next_image" className="image_next" />
                        </div>
                        <div onClick={() => { upNextSlideshowHandler(2) }}>
                            <img src={show_image_next_2} alt="slideshow_next_image" className="image_next" />
                        </div>
                        <div onClick={() => { upNextSlideshowHandler(3) }}>
                            <img src={show_image_next_3} alt="slideshow_next_image" className="image_next" />
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}

export default SlideShow
