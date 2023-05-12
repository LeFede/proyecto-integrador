import { Card } from '../Card'
import { useDispatch, useSelector } from 'react-redux'
import { removeCharacter, selectCharacter } from '../../redux/charactersSlice'
import styles from './Cards.module.css'

export const Cards = () => {
  const dispatch     = useDispatch()
  const remove       = (id) => dispatch(removeCharacter(id))
  const select       = (id) => dispatch(selectCharacter(id))

  const {characters} = useSelector(state => state)

  const $$cards = characters.map(({origin, id, ...rest}) => {
    return (
      <Card 
        key    = {id + "HOLA" + ~~(Date.now() * Math.random())} 
        id     = {id}
        origin = {origin.name} 
        remove = {remove} 
        select = {select}
        // characters = {characters}
        {...rest}
      >
      </Card>
    )
  })

  return (
    <section className={styles.Cards}>
      {$$cards}
    </section>
    )
}


