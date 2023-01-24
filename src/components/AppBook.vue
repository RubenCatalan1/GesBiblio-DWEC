<script>
import { reactive } from 'vue';
import { useDataStore } from '../stores/data'
import { mapActions, mapState } from 'pinia'

export default {
    props: {
        book: Object,
    },
    data(){
        return {
            tema: {}
        }
    },
    methods: {
        ...mapActions(useDataStore, ['getTemaByBookId'])
    },
    async mounted() {
        this.tema = await this.getTemaByBookId(this.book.id)
    }
}
</script>
<template>
    <div class="col-4">
        <div class="card">
            <img :src="'/src/assets/img/books/' + book.img" class="card-img-top" :alt="book.nombre" style="width: fit-content;height: 200px;">
            <div class="card-body">
                <h5 class="card-title">{{book.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{book.nombre}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">{{tema.nombre}}</h6>
                <p class="card-text">{{book.desc}}</p>
                <button class="btn btn-secondary" title="Editar">
                    <router-link :to="{ name: 'book-edit', params:{id: book.id}}"><i class="bi bi-pencil"></i></router-link>    
                </button>
                <button class="btn btn-secondary" title="Eliminar"><i class="bi bi-trash"></i></button>
                <button class="btn btn-secondary" title="Ver autor">
                    <router-link :to="{ name: 'author', params:{id: book.autor}}"><i class="bi bi-person"></i></router-link>    
                </button>
            </div>
        </div>
    </div>
</template>