<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css?family=Cabin+Regular');

html,
body {
  font-family: 'Cabin', sans-serif;
}

#app {
  font-family: 'Cabin', sans-serif;
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
