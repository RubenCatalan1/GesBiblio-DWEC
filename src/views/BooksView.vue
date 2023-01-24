<script>
    import { reactive } from 'vue';
    import { useDataStore } from '../stores/data'
    import { mapActions, mapState } from 'pinia'
    import AppBook from '../components/AppBook.vue';
    export default {
        data() {
            return {
                books: [],
                title: ""
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
            ...mapActions(useDataStore, ['getAllBooks', 'getBooksByAuthorId'])
        },
        async mounted() {
            if(this.$route.params.id) {
                this.books = await this.getBooksByAuthorId(this.$route.params.id)
                this.title = "Libros del autor " + this.getAuthorById(this.$route.params.id)
            } else {
                this.books = await this.getAllBooks()
                this.title = "Libros sin filtrar"
            }

        }

    }
</script>

<template>
    <div class="row">
        <div class="col-12">
            <h1 class="text-center">{{ title }}</h1>
        </div>
    </div>
    <div class="row m-2">
        <app-book v-for="elem in books" :key="elem.id" v-bind:book="elem"></app-book>
    </div>
</template>