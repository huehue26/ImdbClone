import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Navbar/NavBar'
import Footer from '../../components/Footer/Footer'
import Page from './pages/Page'
import { useParams } from 'react-router-dom'
import './search.css'

function Search(props) {

    const { id } = useParams()
    const [page, setPage] = useState(1)

    return (
        <div>
            <NavBar />
            <div className="search-items">
                <Page id={id} page={page} />
                <Page id={id} page={page + 1} />
            </div>
            <Footer />
        </div>
    )
}

export default Search
