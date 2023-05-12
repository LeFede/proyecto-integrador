import { useRef } from "react"
import styles from "./SearchBar.module.css"

export const SearchBar = ({ addCharacter }) => {
  const input = useRef("")

  const handleChange = (e) => {
    input.current = e.target.value
  }

  const fetchCharacters = async () => {
    const id = input.current
    const url = `https://rickandmortyapi.com/api/character/${id}`
    const res = await fetch(url)
    const data = await res.json()

    addCharacter(data)
  }

  const handleClick = async () => {
    if (!isValidInput()) return
    fetchCharacters()
    input.current = ""
  }

  const handleEnter = (event) => {
    if (event.key !== "Enter") return
    if (!isValidInput()) return

    fetchCharacters()
    event.target.value = ""
    input.current = ""
  }

  // 1 ~ 826
  const isValidInput = () =>
    Number(input.current) > 0 && Number(input.current) < 827

  return (
    <div className={styles.SearchBar}>
      <h2>SearchBar</h2>
      <input onKeyDown={handleEnter} onChange={handleChange} type="text" />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}
