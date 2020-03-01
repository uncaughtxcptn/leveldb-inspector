<template>
  <main>
    <header>
      <div class="logo"></div>
    </header>
    <form>
      <p>Select path to LevelDB</p>
      <label class="file db-path">
        <input type="text" id="file" webkitdirectory />
        <span class="file-custom" @click="selectPath">{{ path }}</span>
      </label>
      <button @click="connect">Inspect</button>
    </form>
    <footer>Copyright {{ new Date().getFullYear() }} • UncaughtException</footer>
  </main>
</template>

<script>
import { ipcRenderer, remote } from 'electron';

export default {
  data() {
    return {
      path: ''
    };
  },
  methods: {
    connect(e) {
      e.preventDefault();
      const response = ipcRenderer.sendSync('leveldb-command', {
        command: 'connect',
        params: {
          path: this.path,
          createIfMissing: false,
          valueEncoding: 'text'
        }
      });

      if (response.status === 'success') {
        // TODO: this should open the next page
        alert('success');
      } else {
        // TODO: We need a place to display this error message
        alert(
          response.message ||
            'Failed to open the database. Please make sure the database exists or is not opened by another process.'
        );
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

.file {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 2.5em;
}

.file input {
  min-width: 35em;
  margin: 0;
  opacity: 0;
}

.file-custom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5em;
  padding: 0.5em 1em;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075em solid #ddd;
  border-radius: 0.25em;
  box-shadow: inset 0 0.2em 0.4em rgba(0, 0, 0, 0.05);
  user-select: none;
}

.file-custom::before {
  position: absolute;
  top: -0.075em;
  right: -0.075em;
  bottom: -0.075em;
  z-index: 6;
  display: block;
  content: 'Choose';
  height: 2.5em;
  padding: 0.5em 1em;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075em solid #ddd;
  border-radius: 0 0.35em 0.35em 0;
}

/* Focus */
.file input:focus ~ .file-custom {
  box-shadow: 0 0 0 0.075em #fff, 0 0 0 0.2em #0074d9;
}

.db-path {
  margin-bottom: 2em;
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

footer {
  position: absolute;
  bottom: 0;

  padding-bottom: 2em;

  color: lightgray;
}
</style>
