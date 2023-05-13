<template>
  <div id="app">
    <header>
      <div>
        Logo
      </div>
      <div>
       <span v-if="$store.state.user!=null">
      <button @click="$store.dispatch('logout')">Log Out</button> |
      <button @click="editUser">Update User</button> |
      <button @click="deleteUser">Delete user</button> |
      </span>
      <span v-else>
        <router-link to="/Login">Log In</router-link> |
        <router-link to="/Signup">Sign Up</router-link> |
      </span>
    </div>
    </header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Games">Games</router-link> |
    </nav>
    <router-view/>
    <footer>
      <p>Social Media</p>
    </footer>
  </div>
</template>
<script>
export default{
  methods:{
  deleteUser() {
    this.$store.dispatch('deleteUser')
  },
  editUser(){
    this.$router.push(`User/${this.$store.state.user.id}/edit`)
}
  },
  created(){
    this.$store.dispatch('fetchGames')
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: left;
}
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #42b983;
  color:white;
}
footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #42b983;
  padding: 20px;
  color: #fff;
  text-align: center;
}
</style>

