import { useState } from "react"
import styles from "./Form.module.css"

export const Form = ({ login }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { value, name } = event.target

    if (!isValid[name](value))
      setErrors({ ...errors, [name]: errorsList[name] })
    else setErrors({ ...errors, [name]: "" })

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[{\]};:<>|./?,\\'"]{6,10}$/
  const emailRegex = /\S+@\S+\.\S+/

  const isValid = {
    email: (value) => emailRegex.test(value),
    password: (value) => passRegex.test(value),
  }

  const errorsList = {
    email: "Wrong email 🤯",
    password: "Wrong password",
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(form)
  }

  const handleDisable = () => {
    for (let key in form) if (!form[key]) return true
    for (let key in errors) if (errors[key]) return true
    return false
  }

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>

      <label htmlFor="email">Email:</label>
      <input
        name="email"
        type="email"
        placeholder="fede@gmail.com"
        onChange={handleChange}
        value={form.email}
      ></input>
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        placeholder="123fF!"
        onChange={handleChange}
        value={form.password}
      />
      {errors.password && <p>{errors.password}</p>}

      <input type="submit" disabled={handleDisable()} value="Submit" />
    </form>
  )
}
