import styles from "./Card.module.css"
import { useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CardText } from "../CardText"
import { selectCharacter } from "../../redux/charactersSlice"
import { useDispatch } from "react-redux"
import { controlPressed, controlUp } from "../../events"

export const Card = (props) => {
  const navigate = useNavigate()

  const {
    id,
    name,
    status,
    species,
    gender,
    origin,
    image,
    remove,
    // characters,
    select,
    single,
  } = props

  const card = useRef()
  const wrapper = useRef()
  const data = useRef()
  const control = useRef(false)

  const handleClose = () => {
    remove(id)
  }

  const handleMove = (event) => {
    // if (+Date.now().toString().at(-1) < 5) return
    const { width, height, x: cardX, y: cardY, scroll } = data.current
    const { clientX, clientY } = event
    const halfWidth = width / 2
    const halfHeight = height / 2

    let x = clientX - cardX
    let y = clientY - cardY + scroll

    const threshold = 15

    x = (x / halfWidth) * threshold - threshold
    y = (y / halfHeight) * threshold - threshold

    card.current.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`
  }

  const handleMouseLeave = () => {
    card.current.style.transform = `rotateX(0deg) rotateY(0deg)`
  }

  const updatePosition = () => {
    const { width, height, x, y } = wrapper.current.getBoundingClientRect()
    data.current = {
      width,
      height,
      x,
      y: y + window.scrollY,
      scroll: window.scrollY,
    }
  }
  
  const handleDrag = (e) => {
    const {startX, startY, prevX, prevY} = e.currentTarget.startClick
    const {clientX, clientY} = e
    const x = ((clientX - startX) * .5) + +prevX
    const y = ((startY - clientY) * .5) + +prevY

    card.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`
    
  }

  const startDrag = (e) => {
    const getNumbers = /\w+\((-?\d*\.?\d*)deg\) \w+\((-?\d*\.?\d*)deg\)/
    const rotation = card.current.style.transform

    const [_, prevY, prevX] = rotation.match(getNumbers)
    const {clientX, clientY} = e
    window.startClick = {startX: clientX, startY: clientY, prevX, prevY}
    window.addEventListener("mousemove", handleDrag)
  }

  const endDrag = () => {
    window.removeEventListener("mousemove", handleDrag)
  }

  const handleNavigate = () => {
    if (control.current) handleClose() 
    !single && !control.current && navigate(`/home/${id}`)
  }

  const controlDown = () => {
    control.current = true 
  }

  const controlFreed = () => {
    control.current = false
  }

  useEffect(() => {
    updatePosition()


    const element = wrapper.current
    if (!single) {
      element.addEventListener("mousemove", handleMove, false)
      element.addEventListener("mouseleave", handleMouseLeave, false)

      document.addEventListener("scroll", updatePosition, false)
      window.addEventListener("resize", updatePosition, false)

      controlPressed.listen(controlDown)
      controlUp.listen(controlFreed)
    }

    if (single) {
      window.addEventListener("mousedown", startDrag)
      window.addEventListener("mouseup", endDrag)
    }

    return () => {
      if (!single) {
        element.removeEventListener("mousemove", handleMove)
        element.removeEventListener("mouseleave", handleMouseLeave)

        document.removeEventListener("scroll", updatePosition)
        window.removeEventListener("resize", updatePosition)

        controlPressed.remove(controlDown)
        controlUp.remove(controlFreed)
      }

      if (single) {
        window.removeEventListener("mousedown", startDrag)
        window.removeEventListener("mouseup", endDrag)
      }

    }
  }, [])

  return (
    <div className={`${styles.wrapper} ${single ? styles.single : ''}`} ref={wrapper} onClick={handleNavigate}>

      <article className={styles.Card} ref={card}  
        style={{transform: `rotateX(0deg) rotateY(0deg)`}} >
        <img className={styles.card} src="/yugioh.png" />
        <img className={styles.back} src="/back.jpg" />
        <CardText x={8} y={5} text={name} />

        <img className={styles.pic} src={image} alt={name} />

        <CardText x={8} y={69.5} size={0.6} text={status} />
        <CardText x={7} y={74} size={0.65} text={`[${species} ~ ${gender}]`} />
        
      </article>
    </div>
  )
}


      // {!single && <button className={styles.button} onClick={handleClose}>X</button>}
      // {!single && <NavLink className={styles.detail} to={`/home/${id}`} onClick={handleClick}>Detail</NavLink>}

