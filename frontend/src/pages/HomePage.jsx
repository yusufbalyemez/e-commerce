import Slider from '../components/Slider/Sliders'
import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'
import Campaigns from '../components/Campaigns/Campaigns'
import Blogs from '../components/Blogs/Blogs'
import Brands from '../components/Brands/Brands'
import CampaignSingle from '../components/CampaignSingle/CampaignSingle'
import React from 'react'
const HomePage = () => {
    return (
        <React.Fragment>
            <Slider />
            <Categories />
            <Products />
            <Campaigns />
            <Blogs />
            <Brands />
            <CampaignSingle />
        </React.Fragment>
    )
}

export default HomePage