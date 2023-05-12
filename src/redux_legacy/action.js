import { ADD_CHARACTER } from "./action_types"

const url = "https://rickandmortyapi.com/api/character"

export const addCharacter = ({id}) => async dispatch => {

  const res = await fetch(`${url}/${id}`)
  const data = await res.json()

  dispatch({ type: ADD_CHARACTER, payload: data})
  console.log(data)
}
