import React from 'react'

function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/calendar">Trackr</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav"> 
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/calendar">Calendar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/feed">Feed</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/inbox">Inbox</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/resetGoals">Goals</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar