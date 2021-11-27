import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../search.css'

// multiplication of two numbers
// boors algo
// diff risc and cisc
// short note cpu, high performance something


function Page(props) {
    console.log(props)

    const [shows, setShow] = useState([])
    const id = props.id
    const page = props.page

    const api_key = "5ed54c47c3f64aafc708852433d36e1b"
    const image_path = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${id}&page=${page}&include_adult=false`)
            .then(res => {
                setShow(res.data.results)
                console.log(shows)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id, page])
    return (
        <>
            {
                shows.map(show =>
                    <div className="scroll-carousel-items" key={show.id} >
                        <div className="image">
                            <Link to={`/show/id=${show.id}`}>
                                <img src={show.poster_path ? image_path + show.poster_path : "https://www.royalfoibles.com/wp-content/uploads/2016/04/dummy-post-square-1-1.jpg"} />
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
                    </div>)
            }
        </>
    )
}

export default Page
