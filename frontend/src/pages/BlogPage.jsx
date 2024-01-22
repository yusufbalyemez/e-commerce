import { Fragment } from 'react'
import Blog from '../components/Blog/Blog'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const BlogPage = () => {
    return (
        <Fragment>
            <Header/>
            <Blog/>
            <Footer/>
        </Fragment>)
}

export default BlogPage