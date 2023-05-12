import styles from "./App.module.css"
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Nav, Form } from "./components"
import { Home, About, NotFound, Character } from "./pages"
import { controlPressed, controlUp } from "./events" 

function App() {
  
  const navigate = useNavigate()
  const [access, setAccess] = useState(false)
  const EMAIL = "fede@gmail.com"
  const PASSWORD = "123fF!"

  const login = (userData) => {
    if (userData.password !== PASSWORD) return
    if (userData.email !== EMAIL) return

    setAccess(true)
    navigate("/home")
  }


  useEffect(() => {
    document.addEventListener("keydown", (e) => e.key === "Control" && controlPressed.invoke())
    document.addEventListener("keyup", (e) => e.key === "Control" && controlUp.invoke())

    !access && navigate("/")
  }, [access])

  return (
    <div className={styles.App}>
      {access && <Nav />}
      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route path="/home" element={<Home />}>
          <Route path="me" element={<About />}/>
        </Route>
        <Route path="/home" element={<Home />} >
          <Route path=":id" element={<Character />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
