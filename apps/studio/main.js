import './style.css';
import { hello } from './src/app.js';
document.querySelector('#app').innerHTML = `
  <main style="padding:24px;max-width:960px;margin:0 auto">
    <h1>webbinich — Studio</h1>
    <p>Vite (JS). Später kommt Auth/DB. Jetzt nur sauber & minimal.</p>
    <button id="btn">Shared?</button>
  </main>
`;
document.getElementById('btn').addEventListener('click', () => {
  alert(hello());
});
