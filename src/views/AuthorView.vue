<script>

import { reactive } from 'vue';
import { useDataStore } from '../stores/data'
import { mapState} from 'pinia'

export default {
    data() {
        return {
            autor: {},    
        }
    },
    computed: {
        ...mapState(useDataStore, {
                getAuthorById: 'getAuthorById'
        }) 
    },
    mounted() {
        if(this.$route.params.id) {
            this.autor = this.getAuthorById(this.$route.params.id)
            if(!this.autor) {
                this.$router.push('/authors') 
            }  
        } else {
            this.$router.push('/authors')
        }

    }
}


</script>

<template>
    <div class="col-4">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="'/src/assets/img/authors/' + autor.img" class="card-img-top foto" :alt="autor.nombre" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ autor.nombre }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{autor.nacionalidad}}</h6>
                        <button class="btn btn-secondary" title="Ver libros" @click="$router.push('/author-books/' + autor.id)">
                            <i class="bi bi-book"></i>  
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>