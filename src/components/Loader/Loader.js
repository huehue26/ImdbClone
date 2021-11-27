import React from 'react'
import './loader.css'

function Loader() {
    console.log("hi")
    return (
        <>
            <div className="loading-div">
                <div class="loading">
                    <span class="dot"></span>
                    <div class="dots">
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
