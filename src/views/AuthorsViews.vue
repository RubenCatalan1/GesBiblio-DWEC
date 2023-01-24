<script>
    import { useDataStore } from '../stores/data'
    import { mapActions, mapState } from 'pinia'
    import AppAuthor from '../components/AppAuthor.vue';
    export default {
        components: {
            AppAuthor,
        },
        computed: {
           ...mapState(useDataStore, {
            autores: 'autores'
           }),
           totalAuthors() {
            return this.autores.length
           }

        }   
    }
</script>

<template>
    <div class="row">
        <div class="col-12">
            <h1 class="text-center">Listado de autores</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <table class="table table-striped table-hover table-responsive">
                <thead class="bg-dark">
                    <tr class="text-white text-center">
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Pais</th>
                        <th scope="col">Foto</th>    
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <app-author v-for="elem in autores" :key="elem.id" v-bind:autor="elem"></app-author>     
                </tbody>
                <tfoot>
                    <th class="text-center">Autores:</th>
                    <th class="text-center">{{totalAuthors}}</th>
                    <th></th>
                    <th></th>    
                </tfoot>
            </table>
        </div>
    </div>

</template>