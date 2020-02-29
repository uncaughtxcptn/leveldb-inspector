<template>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>sampleKeyOne</td>
        <td>true</td>
      </tr>
      <tr>
        <td>sampleKeyTwo</td>
        <td>"Hello World"</td>
      </tr>
      <tr>
        <td>sampleKeyTwo</td>
        <td>"Hello World"</td>
      </tr>
      <tr>
        <td>sampleKeyTwo</td>
        <td>"Hello World"</td>
      </tr>
      <tr>
        <td>sampleKeyTwo</td>
        <td>"Hello World"</td>
      </tr>
      <tr class="spacer">
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  min-height: 100vh;
  border-collapse: collapse;

  font-family: 'Fira Code';
}

thead tr {
  border-bottom: 1px solid #bbbbbb;
  background-color: #f2f2f2;
}

tbody tr:nth-child(2n) {
  background-color: #f0f4ff;
}

th {
  font-weight: 400;
}

th,
td {
  height: 32px;
  padding: 0 24px;

  font-size: 12px;
  text-align: left;
}

th:first-child,
td:first-child {
  width: 260px;
  border-right: 1px solid #bbbbbb;
}

tr.spacer td {
  height: auto;
  background-color: #ffffff;
}
</style>
