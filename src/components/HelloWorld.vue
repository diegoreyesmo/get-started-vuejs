<template>
  <v-container>
    <v-card>
      <v-card-title>Quieres leer un chiste?</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-overflow-btn
            class="my-2"
            :items="this.categories"
            :rules="categoryRules"
            label="Categoría"
            target="#dropdown-example-1"
            required
          ></v-overflow-btn>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" v-on:click="getJoke" :disabled="!valid">Obtener</v-btn>
      </v-card-actions>
      <v-card-text>
        <p>{{ randomJoke }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    valid: true,
    randomJoke: "",
    categories: [],
    categoryRules: [(v) => !!v || "La categoría es requerida"],
    count: 1,
  }),
  created() {
    this.getCategories();
  },
  methods: {
    getJoke: function () {
      let fetchData = async () => {
        let response = await fetch("http://api.icndb.com/jokes/random");
        if (response.ok) {
          let { value } = await response.json();
          this.randomJoke = value.joke;
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
