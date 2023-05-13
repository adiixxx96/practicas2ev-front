<template>
    <div>
      <h1>Insert you data</h1>
      <b-form @submit="onSubmit" @reset="onReset" class="form-user" >
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
        <b-button type="submit" variant="primary" class="button submit">Submit</b-button>
        <b-button type="reset" variant="danger" class="button reset">Reset</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          form: {
            username: '',
            password:'',
            role:0,
            signUpDate: new Date().toISOString()
          },
        }
      },
      methods: {
        onSubmit(event) {
    event.preventDefault()
    const formToSend = {
      username: this.form.username,
      password: this.form.password,
      role: !!this.form.role,
      signUpDate: new Date().toISOString()
    }
    this.$store.dispatch('addUser', formToSend)
    this.$router.push(`./`)
  },
    onReset(event) {
      event.preventDefault()
      this.form.username = ''
      this.form.password=''
    }
  }
    }
  </script>
  
  <style lang="scss" scoped>
    .form-user {
    width: 500px;
    margin: 0 auto;
  }

  .button {
    font-weight: bold;
    margin: 20px 10px;
  }
    
    .reset {
      background-color: #3E4646;
      border-color: #3E4646;
    }

    .submit {
      background-color: #EC33FF;
      border-color: #EC33FF;
    }
  

  </style>