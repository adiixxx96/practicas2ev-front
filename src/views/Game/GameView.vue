<template>
  <div class="card">
    <h1>{{ Game.name }}</h1>
    <img src="../../assets/zelda.jpeg">
    <h3>{{ Game.description }}</h3>
    <h5>Current game quantity: {{ remainingCapacity }}</h5>
    <h4>Game price: {{ Game.price }}€</h4>
    <div v-if="$store.state.user !== null">
      <div v-if="isUserRegistered">
        <h3>You have already rented this game.</h3>
        <button class="btn btn-danger" @click="deleteUser">Return game</button>
      </div>
      <div v-else>
        <button v-if="!loading && remainingCapacity > 0" class="button" @click="registerUser">Rent this game</button>
        <div v v-if="remainingCapacity <= 0"><h2>We are sorry but this game is booked out</h2></div>
      </div>
    </div>
    <div v-else>
      <router-link to="/Login" tag="button" class="btn btn-danger">You must log in to rent a game</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Game: {},
      registeredUsers: 0,
      Users:[],
      initialCapacity: 0,
      loading: true
    };
  },
  methods: {
  registerUser() {
    const userId = parseInt(this.$store.state.user.id);
    const gameId = parseInt(this.$route.params.id);
    const userGame = { userId: userId, gameId: gameId };

    fetch(`https://localhost:7100/UserGame/${userId}/${gameId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userGame)
    })
    .then(response => {
      if (response.ok) {
        this.registeredUsers += 1;
        fetch(`https://localhost:7100/UserGame/Game/${gameId}`)
          .then(response => response.json())
          .then(response => {
            this.Users = response;
          });
      } else if (response.status === 409) {
        alert("You have alredy rent this game.");
      }
    })
    .catch(error => {
      console.error("Error while renting", error);
    });
  },
  deleteUser() {
  const userId = parseInt(this.$store.state.user.id);
  const gameId = parseInt(this.$route.params.id);
  fetch(`https://localhost:7100/UserGame/${userId}/${gameId}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        this.registeredUsers -= 1;
        this.Users = this.Users.filter(user => user.id !== userId);
        this.isUserRegistered = false;
      } else {
        alert("Error while returning game, try again later.");
      }
    })
    .catch(error => {
      console.error("Error while returning game, try again later", error);
    });
}
},
  computed: {
    remainingCapacity() {
      return this.initialCapacity - this.registeredUsers;
    },
    isUserRegistered() {
    if (this.$store.state.user !== null) {
    const userId = parseInt(this.$store.state.user.id);
    return this.Users.some(user => user.id === userId);
  } else {
    return false;
  }
}
  },
  created() {
    fetch(`https://localhost:7100/Game/${this.$route.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.Game = response;
        this.initialCapacity = response.quantity;
        this.loading=false;
      });
    fetch(`https://localhost:7100/UserGame/Game/${this.$route.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.registeredUsers = response.length;
        this.Users=response;
      });
  }
};
</script>

<style lang="scss" scoped>

$primary-color: #EC33FF;
$secondary-color: #3E4646;
$text-color: #333333;
$text-color-inverted: #FFF;
  .card {
    border: 3px solid $secondary-color;
    width: 700px;
    margin: 0 auto;
    padding: 20px;

    img {
      height: 300px;
    }

    #aviso {
    border: 1px solid red;
    }

    .button {
      background-color: $primary-color;
      color: $text-color-inverted;
      font-weight: bold;
      border-radius: 10%;
      border-color: $primary-color;
    }
    
  }
</style>