<template>
  <div v-if="$store.state.auth">
    <h1>All Games</h1>
    <button class="btn btn-warning" @click="addGame()">Add game</button>

    <div id="buscador">
      <label for="search">Search:</label>
      <input id="search" v-model="searchTerm" type="text" style="width: 400px;" placeholder="Search by game name">
    </div>

    <b-table striped hover :items="filteredGames" :fields="authFields" @row-clicked="showGameDetails" class="game-table">
      <template v-if="$store.state.auth" #cell(edit)="data">
        <button class="btn btn-primary" @click="editGame(data.item)">Edit</button>
        <button v-if="$store.state.auth" class="btn btn-danger" @click="deleteGame(data.item)">Delete</button>
      </template>
    </b-table>
  </div>

  <div v-else>
    <h1>All Games</h1>
    <div id="buscador">
      <label for="search">Search:</label>
      <input id="search" v-model="searchTerm" type="text" placeholder="Search by game name">
    </div>
    <b-table striped hover :items="filteredGames" :fields="fields" @row-clicked="showGameDetails" class="game-table"></b-table>
  </div>
</template>

<script> 
import { mapState } from 'vuex';

export default {
  data() {
    return {
      authFields: ['name', 'price', 'edit'],
      fields: ['name', 'price'],
      searchTerm: '',
    };
  },

  computed: {
    ...mapState(['games']),

    filteredGames() {
      if (this.searchTerm.trim() === '') {
        return this.games;
      }
      const searchTermLower = this.searchTerm.trim().toLowerCase();
      return this.games.filter((game) => game.name.toLowerCase().includes(searchTermLower));
    },
  },

  methods: {
    showGameDetails(item) {
      this.$router.push(`Game/${item.id}`);
    },

    addGame() {
      this.$router.push(`Game/add`);
    },

    editGame(item) {
      this.$router.push(`Game/${item.id}/edit`);
    },

    deleteGame(item) {
      this.$store.dispatch('deleteGame',item);
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped>
  .game-table {
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
  }

  #buscador {
    margin-top: 20px;

    label {
      margin-right: 10px;
    }
  }

</style>