<template>
  <div class="random__joke">
    <div v-for="joke in filteredList" :key="joke">
      <h1 class="title">Joke</h1>
      <p class="question">{{ `Question: ${joke.question}` }}</p>
      <p class="answer">{{ `Answer: ${joke.answer}` }}</p>
      <p class="date">{{ `Time: ${joke.dateTime}` }}</p>
      <p class="id">{{ `ID: ${joke.id}` }}</p>
      <router-link class="link" to="/jokes">back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent } from "vue";

type Joke = {
  question: string;
  answer: string;
  visible: boolean;
  dateTime: string;
  id: number;
};

const localKey = "Jokes";

export default defineComponent({
  name: "Joke",
  data: () => ({
    joke: [] as Joke[],
  }),

  computed: {
    filteredList() {
      const routerId = this.$route.params.id;
      return this.joke.filter(({ id }) => id === +routerId);
    },
  },
  created() {
    this.joke = JSON.parse(localStorage.getItem(localKey) || "[]");
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

.question {
  font-weight: 600;
  font-size: 18px;
}

.answer {
  font-weight: 600;
  font-size: 15px;
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
