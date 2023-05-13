<template>
  <div id="app">
    <header>
      <div>
        <img alt="Vue logo" src="./assets/logo.png" id="logo">
      </div>
      <div>
       <span v-if="$store.state.user!=null">
      <button @click="$store.dispatch('logout')">Log Out</button> |
      <button @click="editUser">Update User</button> |
      <button @click="deleteUser">Delete user</button> |
      </span>
      <span v-else>
        <router-link to="/Login" tag="button">Log In</router-link> |
        <router-link to="/Signup" tag="button">Sign Up</router-link> |
      </span>
    </div>
    </header>
    <nav>
      <router-link to="/" class="menu">Home</router-link> |
      <router-link to="/about" class="menu">About</router-link> |
      <router-link to="/Games" class="menu">Games</router-link> |
    </nav>
    <router-view/>
    <footer>
        <div class="logo">
            <img src="./assets/logo.png" alt="Logo" id="logo">
        </div>

        <div class="form">
            <form name="newsletter" class="newsletter" action="index.html" method="post">
                <input type="email" class="campo" id="email" placeholder="Your email...">
                <input type="submit" id="form-newsletter" class="boton" value="Subscribe to our Newsletter">
            </form>
            <p>Get our weekly newsletter with all news and sales straight into your email</p>
        </div>
        <p id="copyright">@EduAda2023</p>
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

$primary-color: #EC33FF;
$secondary-color: #3E4646;
$text-color: #333333;
$text-color-inverted: #FFF;

@mixin titles {
  font: {
    weight: bold;
    size: 1.4em;
  }
}

@mixin subtitles {
  font: {
    weight: bold;
    size: 1.2em;
  }
}

@mixin buttons {
  background-color: $primary-color;
  color: $text-color-inverted;
  font-weight: bold;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
}

#logo {
  width: 50px;
  height: 50px;
}

header {
  background-color: $secondary-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  button {
    border-radius: 10px;
    @include buttons;
  }
}

nav {
  padding: 30px;
  text-align: left;
}

.menu {
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 10px;
  @include buttons;
}

footer{
  position: fixed;
  display: flex;
  flex-direction: row;
  row-gap: 200px;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $secondary-color;
  padding: 20px;
  color: $text-color-inverted;
  text-align: center;

  #copyright {
    font-size: 0.8rem;
  }

  #logo {
    width: 60px;
    height: 60px;
  }

  form .boton {
    @include buttons;
  }

}
</style>

