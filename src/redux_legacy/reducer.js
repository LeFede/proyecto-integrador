import { ADD_CHARACTER } from "./action_types"

const initialState = {
  characters: [],
}

const reducer = (state = initialState, { type, payload }) => {
  if (type === ADD_CHARACTER) {
    return {
      ...state,
      characters: [...state.characters, payload],
    }
  }

  return { ...state }
}

export default reducer
