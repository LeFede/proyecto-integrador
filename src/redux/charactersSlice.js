import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  characters: [],
  selectedCharacter: null,
}

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, { payload }) => {
      state.characters.push(payload)
    },
    removeCharacter: (state, { payload }) => {
      const removedCharIndex = state.characters.findIndex(
        (character) => character.id === payload
      )
      const newChars = state.characters.filter(
        (_, index) => index !== removedCharIndex
      )

      state.characters = newChars
    },
    selectCharacter: (state, { payload }) => {
      //const [char] =
      // state.characters.filter(character => character.id === payload)
      console.log(payload)
      // state.selectedCharacter = payload
      // console.log(state.selectedCharacter)
    },
  },
})

export const { addCharacter, removeCharacter, selectCharacter } =
  charactersSlice.actions
export default charactersSlice.reducer
