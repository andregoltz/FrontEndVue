<template>
  <div class="container" id="app">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Grupo Negócios Públicos</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link to="/" class="p-2 text-dark">Home</router-link>
        <router-link to="/perguntas" class="p-2 text-dark">Perguntas</router-link>
        <router-link to="/crud" class="p-2 text-dark">CRUD</router-link>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>


