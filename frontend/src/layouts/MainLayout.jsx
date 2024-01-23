import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Proptypes from "prop-types"
import Search from '../components/Modals/Search/Search'
import { useEffect, useState } from 'react'
import Dialog from '../components/Modals/Dialog/Dialog'

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false)
  const [isDialogShow, setIsDiaglogShow] = useState(false)

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog") ? JSON.parse(localStorage.getItem("dialog")) : localStorage.setItem("dialog",JSON.stringify(true))
    setTimeout(() => {
      setIsDiaglogShow(dialogStatus)
    }, 2000);
  }, [])


  return (
    <div className='main-layout'>
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Dialog isDialogShow={isDialogShow} setIsDiaglogShow={setIsDiaglogShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children} {/*Bu kısım Layout sistemi için geçerli. Tüm içerik bu Layout içerisine yazılmış olacak*/}
      <Footer />
    </div>
  )
}

export default MainLayout;

MainLayout.propsTypes = {
  children: Proptypes.node
} 