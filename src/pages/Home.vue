<template>
  <main>
    <header>
      <div class="logo"></div>
    </header>
    <form>
      <p>Select path to LevelDB</p>
      <label class="file db-path">
        <input type="file" id="file" aria-label="File browser example" />
        <span class="file-custom"></span>
      </label>
      <input type="submit" value="Inspect" />
    </form>
    <footer>Copyright 2020 • UncaughtException</footer>
  </main>
</template>

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
  height: 2.5rem;
}

.file input {
  min-width: 25rem;
  margin: 0;
  filter: alpha(opacity=0);
  opacity: 0;
}

.file-custom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075rem solid #ddd;
  border-radius: 0.25rem;
  box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.file-custom:after {
  content: '';
}

.file-custom:before {
  position: absolute;
  top: -0.075rem;
  right: -0.075rem;
  bottom: -0.075rem;
  z-index: 6;
  display: block;
  content: 'Choose';
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075rem solid #ddd;
  border-radius: 0 0.35rem 0.35rem 0;
}

/* Focus */
.file input:focus ~ .file-custom {
  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.2rem #0074d9;
}

.db-path {
  margin-bottom: 2em;
}

input[type='submit'] {
  font-size: 1em;
  height: 2.5rem;
  padding: 0.5rem 2rem;
  line-height: 1.5;
  color: #fff;
  background-color: #5b73ff;
  border-radius: 0.35rem;
}

footer {
  position: absolute;
  bottom: 0;

  padding-bottom: 2em;

  color: lightgray;
}
</style>