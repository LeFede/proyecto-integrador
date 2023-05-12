import { SearchBar } from "../../components"
import { useDispatch } from "react-redux"
import { addCharacter } from "../../redux/charactersSlice"
import styles from "./Nav.module.css"
import { NavLink } from "react-router-dom"

import { addCharacter as addCharacterLegacy } from "../../redux_legacy/action"

export const Nav = () => {
  const dispatch = useDispatch()

  const applyActiveStyle = ({ isActive }) => (isActive ? styles.active : "")
  const dispatchAddCharacter = (id) => dispatch(addCharacter(id))

  return (
    <nav className={styles.Nav}>
      <h2>Nav</h2>
      <h2>
        <NavLink to="/home">
          Home
        </NavLink>
      </h2>
      <h2>
        <NavLink to="/home/me">
        About
        </NavLink>
      </h2>
      <SearchBar addCharacter={dispatchAddCharacter} />
    </nav>
  )
}
