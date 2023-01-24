<script>
export default {
    
}
</script>

<template>
    <div class="row">
    <nav class="navbar navbar-dark bg-dark">
        <div class="col-2 display-6 text-white">GesBiblio</div>
        <router-link class="col-2 display-9 text-white" to='/'>Home</router-link>
        <router-link class="col-2 display-9 text-white" to='/authors'>Autores</router-link>
        <router-link class="col-2 display-9 text-white" to="/books">Libros</router-link>
        <router-link class="col-2 display-9 text-white" to="/book-form">Añadir Libro</router-link>
    </nav>
    </div>
</template>