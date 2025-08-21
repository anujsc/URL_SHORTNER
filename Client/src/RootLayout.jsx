import { Outlet, useNavigate } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './store/slice/authSlice'
import { logoutUser } from './api/user.api'
import Footer from './components/Footer'

const RootLayout = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      localStorage.removeItem('accessToken')
      sessionStorage.removeItem('accessToken')
      // Remove accessToken from cookies (if present)
      document.cookie = 'accessToken=; Max-Age=0; path=/;'
      dispatch(logout())
      navigate({ to: '/' })
    } catch (err) {
      console.error(err)
      localStorage.removeItem('accessToken')
      sessionStorage.removeItem('accessToken')
      document.cookie = 'accessToken=; Max-Age=0; path=/;'
      dispatch(logout())
      navigate({ to: '/' })
    }
  }
 

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        userName={user && user.user && user.user.name}
        onLogout={handleLogout}
      />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default RootLayout