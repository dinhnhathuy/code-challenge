<template>
  <nav class="main-nav">
    <NuxtLink :to="{name: 'customer'}">customer</NuxtLink>
    <NuxtLink :to="{name: 'admin'}">admin</NuxtLink>
  </nav>
</template>

<style>
  .main-nav {
    margin: 3rem;
    display: flex;
    justify-content: center;
    gap: 2rem
  }
</style>