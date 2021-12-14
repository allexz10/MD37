<template>
  <div class="random__jokes">
    <h1 v-if="loading">Loading...</h1>
    <template v-else>
      <h1 class="title">Random jokes</h1>
      <input
        class="input input--search"
        type="text"
        v-model="search"
        placeholder="Search title.."
      />
      <div class="wrapper" v-for="{ joke, id } in filteredList" :key="joke">
        <router-link class="link" :to="`/random-jokes/joke/${id}`">{{
          joke
        }}</router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent } from "vue";
import axios from "axios";

type RandomJoke = {
  joke: string;
};

export default defineComponent({
  name: "RandomJokes",
  data: () => ({
    loading: true,
    search: "",
    randomJokes: [] as RandomJoke[],
  }),

  methods: {},

  created() {
    axios
      .get("https://v2.jokeapi.dev/joke/Any?type=single&amount=10")
      .then(({ data }) => {
        this.randomJokes = data.jokes;
        this.loading = false;
      });
  },
  computed: {
    filteredList() {
      return this.randomJokes.filter(({ joke }) => {
        return joke.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.random__jokes {
  display: grid;
  justify-content: center;
  align-items: center;
}

.input {
  margin: 0 auto;
  width: 90%;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 2px solid transparent;
  box-shadow: 0 0 0 0.1rem #222222;
  outline: none;

  &--search {
    max-width: 600px;
    margin-bottom: 20px;
  }
  &::placeholder {
    color: #acacac;
  }
  &:focus {
    box-shadow: 0 0 0 0.1rem #e06666;
  }
}

.title {
  color: #302f2f;
}

.wrapper {
  display: grid;
  max-width: 800px;
  width: 100%;
  gap: 15px;
  align-items: center;
  justify-content: center;
}

.link {
  text-decoration: none;
  color: #302f2f;
  font-size: 18px;
  font-weight: 500;
  border-radius: 4px;
  border-bottom: 2px solid transparent;
  transition: all ease 0.3s;
  padding: 15px 10px 10px 10px;
  &:hover {
    box-shadow: 0 1px 10px #222222;
  }
}
</style>
