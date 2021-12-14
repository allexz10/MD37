<template>
  <div class="random__joke">
    <h1 v-if="loading">Loading...</h1>
    <div v-else>
      <h1 class="title">Joke</h1>
      <p class="category">{{ `Category: ${randomJoke.category}` }}</p>
      <p class="joke">{{ randomJoke.joke }}</p>
      <p>{{ `Type: ${randomJoke.type}` }}</p>
      <p>{{ `Language: ${randomJoke.lang}` }}</p>
      <p class="id">{{ `ID: ${randomJoke.id}` }}</p>
      <router-link class="link" to="/random-jokes">back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent } from "vue";
import axios from "axios";

type RandomJoke = {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  id: number;
  safe: boolean;
  lang: string;
};

export default defineComponent({
  name: "RandomJoke",
  data: () => ({
    loading: true,
    randomJoke: [] as RandomJoke[],
  }),

  created() {
    const routerId = this.$route.params.id;
    axios
      .get(`https://v2.jokeapi.dev/joke/Any?type=single&idRange=${routerId}`)
      .then(({ data }) => {
        this.randomJoke = data;
        this.loading = false;
      });
  },
});
</script>

<style lang="scss" scoped>
.random__joke {
  margin: 0 auto;
  display: grid;
  max-width: 800px;
  width: 100%;
  gap: 10px;
}

.title {
  margin-top: 100px;
  margin-bottom: 40px;
}

.category {
  font-weight: 600;
  font-size: 18px;
}

.joke {
  font-size: 18px;
  font-weight: 500;
}

.id {
  margin-bottom: 40px;
}

.link {
  color: #000000;
  padding: 10px 15px;
  border-radius: 4px;
  border: 2px solid #000000;
  text-decoration: none;
  transition: all ease 0.5s;
  &:hover {
    color: #ffffff;
    background-color: #1d1d1d;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
  }
}
</style>
