import { useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from "../../components/Card"
import styles from "./About.module.css"

export const About = () => {

  const params = useParams()
  const single = true
  const char = {
    name: 'Federico Andres',
    origin: { name: 'Berisso'},
    status: 'alive',
    gender: 'male',
    image: 'https://lh3.googleusercontent.com/a/AGNmyxZiwyan_6RXvzi3k2EAW3dBJwa4p8hcqHZDCwqscw=s346-c-no',
    species: 'human',
  }
  const container = useRef()

  useEffect(() => {
    container.current.style.opacity = 1
  }, [])

  const {id, name, image, status, species, type, gender, origin, location, episode} = char
  

  const navigate = useNavigate()
  const handleNavigate = () => {
    container.current.style.opacity = 0
    let timeout
    return () => {
      if (timeout) return
      timeout = setTimeout(() => {
        navigate('/home')
      }, 400);
    }
  }

  return (
    <main className={styles.Character} ref={container}>
      <div className={styles.half}>
        <Card
          single = {true}
          id     = {id}
          origin = {origin.name} 
          name   = {name}
          image  = {image}
          species = {species}
          gender = {gender}
          status = {status}
        >
      </Card>
      </div>
      <button onClick={() => handleNavigate()()} className={styles.button}>Close</button>
    </main>

  )
}



    // asdsadasads
    //   <div className={styles.half}>
    //     <Card
    //       single = {true}
    //       id     = {'about'}
    //       origin = {'HOLA'} 
    //       name   = {'fede'}
    //       image  = {image}
    //       species = {species}
    //       gender = {gender}
    //     >
    //   </Card>
    //   </div>
    //   <button onClick={() => handleNavigate()()} className={styles.button}>Close</button>
