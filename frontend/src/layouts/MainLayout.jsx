import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Proptypes from "prop-types"

const MainLayout = ({children}) => {
  return (
    <React.Fragment>
        <Header/>
            {children} {/*Bu kısım Layout sistemi için geçerli. Tüm içerik bu Layout içerisine yazılmış olacak*/}
        <Footer/>
    </React.Fragment>
  )
}

export default MainLayout;

MainLayout.propsTypes = {
    children : Proptypes.node
}