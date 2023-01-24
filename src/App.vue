<script>
  import AppMenu from './components/AppMenu.vue'
  import { useDataStore } from './stores/data';
  import { mapActions, mapState } from 'pinia'

  export default {
    components: {

      AppMenu
    },
    methods: {
      ...mapActions(useDataStore, ['loadData'])
    },
    mounted() {
        this.loadData()     
    }
  }

</script>

<template>
  <div class="container">
    <app-menu></app-menu>
    <router-view :key="$route.fullPath"></router-view>
  </div>
 
 
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");

</style>
