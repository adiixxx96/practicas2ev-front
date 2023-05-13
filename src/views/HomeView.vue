<template>
  <div class="home">
    <h1>Videogames Renting</h1>
    <img alt="Vue logo" src="../assets/logo.png" id="logo-principal">
    <div v-if="$store.state.user!=null">
    <h3>¡Welcome back, {{ $store.state.user.username }}!</h3>
    <h4>These are your rented games:</h4>
    <b-table striped hover :items="$store.state.usergames" :fields="fields" @row-clicked="showGameDetails" class="game-table"></b-table>
  </div>
  <div v-else>
    <h3>You must log in to see your rented games</h3>
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

<style lang="scss" scoped>

$margin-normal: 20px 0px;
$margin-small: 10px 0px;
$margin-big: 30px 0px;
  
#logo-principal {
  width: 200px;
  height: 200px;
}

h1 {
  margin: $margin-normal;
}

h3 {
  margin: $margin-big;
}

.game-table {
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
  }

</style>