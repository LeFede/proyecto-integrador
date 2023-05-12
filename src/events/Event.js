export class Event {
  #listeners = []

  invoke = (...args) => {
    this.#listeners.forEach((listener) => listener(...args))
  }

  listen = (fn) => {
    this.#listeners.push(fn)
  }

  remove = (fn) => {
    this.#listeners = this.#listeners.filter((listener) => listener !== fn)
  }
}
