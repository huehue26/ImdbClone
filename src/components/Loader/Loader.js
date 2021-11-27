import React from 'react'
import './loader.css'

function Loader() {
    return (
        <>
            <div className="loading-div">
                <div className="loading">
                    <span className="dot"></span>
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader
