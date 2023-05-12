import styles from "./CardText.module.css"

export const CardText = (props) => {
  const { x, y, size, text } = props

  const dynamicStyles = {
    top: `${y}%`,
    left: `${x}%`,
    fontSize: `${size}rem`
  }

  return (
    <svg 
      className={styles.cardText}
      viewBox="0 0 240 18"
      style={dynamicStyles}
    >
      <text className={styles.text} x="0" y="15">
        {text}
      </text>
    </svg>
  )
}
