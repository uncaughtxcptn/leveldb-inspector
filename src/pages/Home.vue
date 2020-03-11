<template>
  <main>
    <header>
      <div class="logo"></div>
    </header>
    <form @submit.prevent="connect">
      <p>Select path to LevelDB</p>
      <div class="file" tabindex="0" @click="selectPath" @keyup.enter="selectPath">
        <input type="text" id="file" :value="path" tabindex="-1" readonly />
        <button tabindex="-1">Choose</button>
      </div>
      <button>Inspect</button>
    </form>
    <footer>Copyright {{ new Date().getFullYear() }} • UncaughtException</footer>
  </main>
</template>

<script>
import { remote } from 'electron';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      path: ''
    };
  },

  methods: {
    ...mapActions(['connectToDatabase']),

    async connect() {
      const { error } = await this.connectToDatabase(this.path);
      if (error) {
        alert(error);
      } else {
        this.$router.push('/inspector');
      }
    },

    selectPath(e) {
      const path = remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      });
      path.then(e => {
        this.path = e.filePaths[0];
      });
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.logo {
  width: 150px;
  height: 150px;
  background-color: #f7f7f7;
  border-radius: 100%;
  margin: 100px auto;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

input,
button {
  font-family: 'Fira Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  cursor: pointer;
}

button {
  font-size: 1em;
  height: 2.5em;
  padding: 0.5em 2em;
  line-height: 1.5;
  color: #fff;
  background-color: #5b73ff;
  border-radius: 0.35em;
}

.file {
  display: flex;
  margin-bottom: 2em;
  border-radius: 0.35em;
}

.file > *:focus {
  outline: none;
}

.file > input {
  width: 30em;
  padding: 0.5em 1em;

  border: 0.075em solid #ddd;
  border-right-style: hidden;
  border-radius: 0.35em 0 0 0.35em;
  box-shadow: inset 0 0.2em 0.4em rgba(0, 0, 0, 0.05);

  user-select: none;
}

.file > button {
  padding: 0.5em 1em;
  color: #555;
  background-color: #fff;
  border: 0.075em solid #ddd;
  border-radius: 0 0.35em 0.35em 0;
}

footer {
  position: absolute;
  bottom: 0;

  padding-bottom: 2em;

  color: lightgray;
}
</style>
