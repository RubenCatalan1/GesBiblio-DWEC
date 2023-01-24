import { defineStore } from 'pinia'
import axios from "axios"

const url= import.meta.env.VITE_SERVERURL

export const useDataStore = defineStore('data', {
  state: () => ({
      temas: [],
      autores: [],
  }),
  getters: {
    getAuthorById : (state) =>(id) => {
      return state.autores.find(elem => elem.id === parseInt(id))
    },
  },
  actions: {
    async loadData() {
        try {
            let response = await axios.get(url + '/temas')
            this.temas = response.data
            response = await axios.get(url + '/autores')
            this.autores = response.data
        } catch(error) {
            alert('Error ' + error)
        }
    },

    async getAllBooks() {
      try {
        let response = await axios.get(url + '/libros')
        let books = response.data
        return books
      } catch(error) {
        alert('Error ' + error)
      }
    },

    async getBooksByAuthorId(id) {
      try {
        let response = await axios.get(url + '/libros?autor=' + id)
        let books = response.data
        return books
      } catch(error) {
        alert('Error ' + error)
      }
    },
    
    async getTemaByBookId(id) {
      try {
        let response = await axios.get(url + '/libros/' + id)
        let libro = response.data
        let tema = this.temas.find(elem => elem.id == libro.tema)
        return tema
      } catch(error) {
        alert('Error ' + error)
      }
    },

    async addBook(values) {
      try {
        let response = await axios.post(url + "/libros", values)        
      } catch (error) {
        alert('Error ' + error)
      }
    },
    async editBook(values) {
      try {
        let response = await axios.put(url + "/libros/" + values.id, values)
        
      } catch (error) {
        alert('Error ' + error)
      }
    }


    
  },
})
