<template>
  <div>
    <h1>Insert the game details</h1>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Game name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Insert tehe game name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Game details:" label-for="input-2">
      <b-form-input
          v-model="form.description"
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
          placeholder="Write how many games are"
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
        },
        gameId: null,
      };
    },
    computed: {

    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
          this.$store.dispatch('actualizeGame', this.form)
          this.$router.push(`/Games`)
      },
      onReset(event) {
        event.preventDefault();
        this.form = {...this.$store.state.formGame}
      },
    },
    created() {
      this.gameId = this.$route.params.id;
      this.$store.dispatch('fetchGameById', this.gameId).then(() => {
      this.form = {...this.$store.state.formGame}
    });
    },
  }
</script>

<style lang="scss"></style>