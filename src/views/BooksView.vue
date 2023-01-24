<script>
    import { reactive } from 'vue';
    import { useDataStore } from '../stores/data'
    import { mapActions, mapState } from 'pinia'
    import AppBook from '../components/AppBook.vue';
    export default {
        data() {
            return {
                books: [],
                title: "",
                tema_id: "",
            }
        },
        watch: {
            async tema_id(newValue, oldValue) {
                await this.mountData()
                if(newValue === 'key') {
                    return
                }
                this.filterBoooksByTemaId(newValue)
                if(this.title === "Libros sin filtrar") {
                    this.title = "Libros";
                }
                this.title = this.title + " del tema " + this.temas.find(elem => elem.id === parseInt(newValue)).nombre
            }
        },

        components: {
            AppBook,
        },
        computed: {
           ...mapState(useDataStore, {
            autores: 'autores',
            temas: 'temas',
            getAuthorById: 'getAuthorById'
           })
        },
        methods: {
            ...mapActions(useDataStore, ['getAllBooks', 'getBooksByAuthorId']),

            filterBoooksByTemaId($id) {
                this.books = this.books.filter(elem => elem.tema === parseInt($id))
            },

            async mountData() {
                if(this.$route.params.id) {
                    this.books = await this.getBooksByAuthorId(this.$route.params.id)
                    let autor = this.getAuthorById(this.$route.params.id)
                    this.title = "Libros del autor " + autor.nombre + autor.apellidos
                } else {
                    this.books = await this.getAllBooks()
                    this.title = "Libros sin filtrar"
                }
            }

        },
        async mounted() {
            this.mountData()
        },
        
    }
</script>

<template>
    <div class="row">
        <div class="col-12">
            <h1 class="text-center">{{ title }}</h1>
        </div>
    </div>
    <div class="row">
        <select type="text" class="form-control" v-model="tema_id">
            <option value="key">--Seleccione tema--</option>
            <option v-for="elem in temas" :key="elem.id" :value="elem.id">{{ elem.nombre }}</option>
        </select>
    </div>
  
    <div class="row m-2">
        <app-book v-for="elem in books" :key="elem.id" v-bind:book="elem"></app-book>
    </div>
</template>