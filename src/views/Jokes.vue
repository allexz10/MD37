<template>
  <div class="jokes">
    <div class="jokes__content">
      <h1 class="jokes__title">Create a joke</h1>

      <form class="form" id="jokes" @submit="checkForm" method="post">
        <div class="wrapper">
          <label class="label" for="question">Question</label>
          <input
            class="input"
            placeholder="Enter the question"
            id="question"
            type="text"
            v-model="question"
          />
        </div>
        <div class="wrapper">
          <label class="label" for="answer">Answer</label>
          <input
            class="input"
            placeholder="Enter the punchline"
            id="answer"
            type="text"
            v-model="answer"
          />
        </div>

        <button
          class="button button--create"
          :disabled="answer.trim() && question.trim() ? false : true"
          type="submit"
        >
          Create
        </button>
      </form>

      <input
        class="input input--search"
        type="text"
        v-model="search"
        placeholder="Search.."
      />
      <div
        class="jokes__list"
        v-for="{ question, answer, visible, timeData, id } in filteredList"
        :key="question"
      >
        <div class="jokes__item">
          <router-link class="link" :to="`/jokes/joke/${id}`">
            about
          </router-link>
          <p class="joke__question">{{ question }}</p>
          <div
            class="joke__answer"
            :class="[visible ? 'joke__answer block' : 'joke__aswer']"
          >
            {{ answer }}
          </div>
          <p class="joke__time--data">{{ timeData }}</p>
          <div class="buttons__wrapper">
            <button class="button button--tellme" @click="toggleVisible(id)">
              Tell me
            </button>
            <button class="button button--delete" @click="deleteJoke(id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
  name: "Jokes",
  data: () => ({
    question: "",
    answer: "",
    search: "",
    id: 0,
    timestamp: "",
    jokes: [
      {
        question: "What did the baseball glove say to the ball?",
        answer: "Catch you later",
        visible: false,
        dateTime: "14/12/2021 13:47:51",
        id: 92,
      },
      {
        question: "What does a snowman like to eat for breakfast?",
        answer: " Frosted Flakes",
        dateTime: "14/12/2021 13:49:06",
        id: 90,
        visible: false,
      },
      {
        answer: "By going from one spot to another",
        dateTime: "14/12/2021 13:49:57",
        id: 63,
        question: "Which is the only way a leopard can change his spots?",
        visible: false,
      },
    ] as Joke[],
  }),

  methods: {
    checkForm(e: HTMLFormElement) {
      if (this.question.trim() && this.answer.trim()) {
        const id = Math.floor(Math.random() * 100);
        this.jokes.push({
          question: this.question,
          answer: this.answer,
          visible: false,
          dateTime: this.timestamp,
          id: id,
        });

        localStorage.setItem(localKey, JSON.stringify(this.jokes));
        this.question = "";
        this.answer = "";
      }

      e.preventDefault();
    },

    deleteJoke(id: number) {
      const newJokes = this.jokes.filter((item) => item.id !== id);
      this.jokes = newJokes;
      localStorage.setItem(localKey, JSON.stringify(this.jokes));
    },

    toggleVisible(id: number) {
      return this.jokes.filter((joke) =>
        joke.id === id ? (joke.visible = !joke.visible) : ""
      );
    },

    getNow() {
      const today = new Date();
      const date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      const time =
        today.getHours() +
        ":" +
        `${
          today.getMinutes() >= 9
            ? today.getMinutes()
            : `0${today.getMinutes()}`
        }` +
        ":" +
        `${
          today.getSeconds() >= 9
            ? today.getSeconds()
            : `0${today.getSeconds()}`
        }`;
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
  },

  created() {
    setInterval(this.getNow, 1000);
    this.jokes = JSON.parse(
      localStorage.getItem(localKey) || JSON.stringify(this.jokes)
    );
  },

  computed: {
    filteredList() {
      return this.jokes.filter(({ question }) => {
        return question.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.jokes {
  .link {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ffffff;
    text-decoration: none;
    background-color: #353538;
    padding: 5px;
    border-radius: 4px;
    font-size: 11px;
    transition: all ease 0.3s;
    &:hover {
      box-shadow: 0 0 0 0.1rem #757575;
    }
  }

  &__content {
    max-width: 800px;
    width: 100%;
    border-radius: 8px;
    margin: 0 auto;
    padding: 10px 15px 20px 15px;
    background-color: #353538;
  }

  &__title {
    color: #cccccc;
    font-weight: 500;
    line-height: 1.4;
    font-size: 26px;
    margin-bottom: 6px;
  }

  .form {
    background-color: #5ac7af;
    padding: 20px 15px;
    display: grid;
    gap: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .wrapper {
    max-width: 745px;
    width: 100%;
  }

  .label {
    color: #eeeeee;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    margin-bottom: 10px;
  }

  .input {
    width: 100%;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: #ffffff;
    border: 2px solid transparent;
    outline: none;
    &--search {
      max-width: 600px;
      margin-bottom: 20px;
    }
    &::placeholder {
      color: #acacac;
    }
    &:focus {
      box-shadow: 0 0 0 0.25rem #60c5ff;
    }
  }

  .button {
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    width: 70px;
    border: none;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: all ease 0.3s;

    &--create:disabled {
      font-weight: 600;
      cursor: not-allowed;
      opacity: 0.5;
      color: #9b9b99;
      background-color: #2e2e2e;
    }

    &--create:enabled {
      background-color: #2e2e2e;
      color: #ffffff;
      cursor: pointer;
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }

    &--tellme {
      padding: 10px 5px;
      width: 70px;
      color: #1d1c1c;
      background-color: #ebe267;
      &:hover {
        opacity: 0.8;
      }
      &:focus {
        box-shadow: 0 0 0 0.2rem #f5f1bc;
      }
    }

    &--delete {
      padding: 10px 5px;
      width: 70px;
      background-color: #ce3a66;
      color: #ffffff;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .jokes__item {
    position: relative;
    border-radius: 4px;
    background-color: #c9c9c4;
    padding: 15px;
    margin-bottom: 10px;
  }

  .buttons__wrapper {
    display: flex;
    width: 148px;
    justify-content: space-between;
  }

  .joke__question,
  .joke__answer {
    width: 500px;
    text-align: left;
    color: #1d1c1c;
    font-weight: 500;
    font-size: 16px;
  }

  .joke__answer {
    display: none;
    &.block {
      display: block;
    }
  }
}
</style>
