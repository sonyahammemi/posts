import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../../context/AuthContext'
import { logout } from '../../features/authentication/authenticationSlice'

export default () => {

    const { isauth } = useContext(AuthContext)

    const dispatch = useDispatch()

    return (
        <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            {/* ***** Logo Start ***** */}
                            <a href="index.html" className="logo">
                                <img src="assets/images/logo-v1.png" alt />
                            </a>
                            {/* ***** Logo End ***** */}
                            {/* ***** Menu Start ***** */}
                            <ul className="nav">
                                <li className="scroll-to-section"><a href="/" className="active">Home</a></li>
                                { isauth && <><li className="scroll-to-section"><a href="/profile">Profile</a></li>
                                <li className="scroll-to-section"><a href="/posts">Posts</a></li></>}
                                {
                                    isauth
                                        ?
                                        <li className="scroll-to-section" onClick={()=> dispatch(logout())} ><div className="border-first-button"><a >Logout</a></div></li>
                                        :
                                        <>
                                            <li className="scroll-to-section"><a href="/login">Login</a></li>
                                            <li className="scroll-to-section"><a href="/register">Register</a></li>
                                        </>
                                }
                            </ul>
                            <a className="menu-trigger">
                                <span>Menu</span>
                            </a>
                            {/* ***** Menu End ***** */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}