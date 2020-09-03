<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-btn color="primary" v-on:click="getJoke">Cuéntame un chiste</v-btn>
      </v-col>
      <v-col>
        <p>{{ randomJoke }}</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-overflow-btn
          class="my-2"
          :items="this.categorias"
          label="Categoría"
          target="#dropdown-example-1"
        ></v-overflow-btn>
      </v-col>
      <v-col>
        <input v-model.number="cantidad" type="number">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    randomJoke: "",
    categorias: [],
    cantidad: 1
  }),
  created() {
    this.obtenerCategorias();
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
    obtenerCategorias: function () {
      let fetchData = async () => {
        let response = await fetch("http://api.icndb.com/categories");
        if (response.ok) {
          let { value } = await response.json();
          this.categorias = value;
        } else {
          alert("HTTP-Error: " + response.status);
        }
      };
      fetchData();
    },
  },
};
</script>
