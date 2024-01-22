import React from "react"
import Header from "../components/Header/Header"
import Categories from "../components/Categories/Categories"
import Products from "../components/Products/Products"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import Footer from "../components/Footer/Footer"

const ShopPage = () => {
    return(
        <React.Fragment>
            <Header/>
            <Categories/>
            <Products/>
            <CampaignSingle />
            <Products/>
            <Footer/>
        </React.Fragment>
    )
}

export default ShopPage