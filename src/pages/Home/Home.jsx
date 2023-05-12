// import { Form } from '../components/Form'
import { Outlet } from "react-router-dom"
import { Cards } from "../../components"

export const Home = () => {

  return (
    <main>
      <h1>Home</h1>
      <Cards/>
      <Outlet/>
    </main>
  )
}
