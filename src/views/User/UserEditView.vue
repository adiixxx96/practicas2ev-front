<template>
    <div>
      <h1>Introduce tus nuevos datos</h1>
      <b-form @submit="onSubmit" @reset="onReset" >
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            placeholder="Write your username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Write your password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          form: {
            username: this.$store.state.user.username,
            password:this.$store.state.user.password,
            role:0,
            signUpDate: new Date().toISOString()
          },
        }
      },
      methods: {
      onSubmit(event) {
    event.preventDefault()
    const formToSend = {
      id:this.$store.state.user.id,
      username: this.form.username,
      password: this.form.password,
      role: !!this.form.role,
      signUpDate: new Date().toISOString()
    }
    this.$store.dispatch('actualizeUser', formToSend)
    this.$router.push(`/`)
  },
    onReset(event) {
      event.preventDefault()
      this.form.username = this.$store.state.user.username,
      this.form.password=this.$store.state.user.password
    }
  }
    }
  </script>
  
  <style lang="scss" scoped>
  
  </style>