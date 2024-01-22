import React from "react"
import Auth from "../components/Auth/Auth"
import Header from "../components/Header/Header"
import Policy from "../components/Policy/Policy"
import Footer from "../components/Footer/Footer"

const AuthPage = () => {
    return(
        <React.Fragment>
            <Header/>
            <Auth/>
            <Footer/>
        </React.Fragment>
    )
}

export default AuthPage