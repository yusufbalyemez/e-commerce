import React from "react"
import BlogDetail from "../components/BlogDetails/BlogDetail"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"


const BlogDetailPage = () => {
  return (
    <React.Fragment>
        <Header/>
        <BlogDetail/>
        <Footer/>
    </React.Fragment>
  )
}

export default BlogDetailPage