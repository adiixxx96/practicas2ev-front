<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="$store.state.user!=null">
    <h2>¡Welcome back, {{ $store.state.user.username }}!</h2>
    <h3>These are your games:</h3>
    <b-table striped hover :items="$store.state.usergames" :fields="fields" @row-clicked="showGameDetails"></b-table>
  </div>
  <div v-else>
    <h1>You must log in to see your games</h1>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      fields: ['name', 'description', 'price'],
    };
  },
  methods:{
    showGameDetails(item){
            this.$router.push(`Game/${item.id}`)
        }
  },
  components: {
  },
  created() {
    this.$store.dispatch('fetchUserGames');
  }
}
</script>