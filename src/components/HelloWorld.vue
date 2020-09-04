<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span v-if="count<=1">Un chiste?</span>
        <span v-else>Varios chistes?</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-overflow-btn
            v-model="category"
            class="my-2"
            :items="this.categories"
            :rules="categoryRules"
            label="Categoría"
            target="#dropdown-example-1"
            required
          ></v-overflow-btn>
          <v-text-field v-model="count" type="number" class="form-control" required></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="count<=1" color="primary" v-on:click="getJoke" :disabled="!valid">Cuéntamelo!</v-btn>
        <v-btn v-else color="primary" v-on:click="getJoke" :disabled="!valid">Cuéntamelos!</v-btn>
      </v-card-actions>
      <v-card-text>
          <p v-for="item in randomJokes.value" v-bind:key="item.id">{{ item.joke }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    valid: true,
    randomJokes: [],
    category: null,
    categories: [],
    categoryRules: [(v) => !!v || "La categoría es requerida"],
    count: 1,
  }),
  created() {
    this.getCategories();
  },
  methods: {
    getJoke: function () {
      let url = `http://api.icndb.com/jokes/random/${this.count}/?limitTo=[${this.category}]&escape=javascript`;
      console.log(url);
      let fetchData = async () => {
        let response = await fetch(url);
        if (response.ok) {
          this.randomJokes = await response.json();
        } else {
          alert("HTTP-Error: " + response.status);
        }
      };
      fetchData();
    },
    getCategories: function () {
      let fetchData = async () => {
        let response = await fetch("http://api.icndb.com/categories");
        if (response.ok) {
          let { value } = await response.json();
          this.categories = value;
        } else {
          alert("HTTP-Error: " + response.status);
        }
      };
      fetchData();
    },
  },
};
</script>
