<template>
  <div>
    
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Game name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Insert the game name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Game description:" label-for="input-2">
      <b-form-input
          v-model="form.description"
          type="text"
          id="input-2"
          placeholder="Write the game details"
          required>
      </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Game price:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="number"
          v-model="form.price"
          placeholder="Write the game price"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Game quantity:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="number"
          v-model="form.quantity"
          placeholder="Write how many of these games are"
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
          name: '',
          description: '',
          price:'',
          quantity:'',
        },
      }
    },
    computed: {
},
    methods: {
    onSubmit(event) {
        event.preventDefault();
        this.$store.dispatch('addGame', this.form)
        .then(() => {
            this.form.name = '';
            this.form.description = '';
            this.form.price = '';
            this.form.quantity = '';
            this.$router.push(`/Games`)
      })
    .catch((error) => {
        console.error(error);
    });
  },
  onReset(event) {
    event.preventDefault()
    this.form.name = ''
    this.form.description = ''
    this.form.price = ''
    this.form.quantity=''
  }
}
  }
</script>

<style lang="scss" scoped>

</style>