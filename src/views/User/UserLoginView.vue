<template>
    <div>
      <h1>Introduce tus datos de acceso</h1>
      <b-form @submit="login">
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          placeholder="Enter username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Send</b-button>
    </b-form>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          form:{
            username:'',
            password:'',
          }
        }
      },
      methods: {
        login() {
          event.preventDefault();
          this.$store.dispatch('fetchUser', { username: this.form.username, password: this.form.password })
        }
      }
    }
  </script>
<style lang="scss" scoped>

</style>