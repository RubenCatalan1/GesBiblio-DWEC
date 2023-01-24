<script>
import { reactive } from 'vue';

export default {
    props: {
        autor: Object,
    },
}
</script>
<template>
    <tr class="text-center">
        <th scope="row">{{autor.id}}</th>
        <td>{{autor.nombre}}</td>
        <td>{{autor.apellidos}}</td>
        <td>{{autor.nacionalidad}}</td>
        <td><img :src="'/src/assets/img/authors/' + autor.img" alt=""></td>
        <td>
            <button class="btn btn-warning m-1" @click="$router.push('/author/' + autor.id)">
                <i class="bi bi-eye"></i>
            </button> 
        </td>
    </tr>
    
</template>