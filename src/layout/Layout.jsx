
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>

      <Header>
      <Outlet/>
      </Header>
      <Footer />

    </div>
  )
}
