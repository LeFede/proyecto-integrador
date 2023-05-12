import { useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from "../../components"
import styles from "./Character.module.css"

export const Character = ({card}) => {
  const params = useParams()
  const char = useSelector(state => state.characters.find(e => e.id == params.id))
  if (!char) return <p>No character found</p>

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

