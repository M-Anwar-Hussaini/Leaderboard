// This file is for manipulating info the the DOM
import Leaderboard from './Leaderboard.js';

class DOM {
  constructor() {
    const _ = document;

    // Selecting Elements
    this.board = new Leaderboard();
    this.btnRefresh = _.getElementById('btn--refresh');
    this.form = _.querySelector('form');
    this.tbody = _.querySelector('tbody');
    this.alert = _.getElementById('alert-message');
  }

  //  Create an html text based on the dataItem object id seris ID
  createScoreHTML = (dataItem, id) => {
    const { score, user } = dataItem;
    const html = `
      <tr>
        <td>${id}</td>
        <td>${user}</td>
        <td>${score}</td>
      </tr>
    `;
    return html;
  };

  // Receive data from API using Leaderboard class and display it on the page
  fillTable = async () => {
    const data = await this.board.getDataFromAPI();
    data.sort((item1, item2) => item2.score - item1.score);
    this.tbody.innerHTML = '';
    data.forEach((game, index) => {
      this.tbody.insertAdjacentHTML('beforeend', this.createScoreHTML(game, index + 1));
    });
  };

  // Take info from the board and send its data to the API
  addUser = async () => {
    const userName = document.getElementById('user-name');
    const score = document.getElementById('user-score');
    const userValue = userName.value.trim();
    const scoreValue = parseInt(score.value, 10);

    // Validate the username to have at least 3 characters
    if (userValue.length < 3) {
      this.alert.textContent = 'Username must have at least 3 characters without leading spaces.';

      this.alert.classList.remove('d-none');
      this.alert.classList.remove('alert-success');
      this.alert.classList.add('alert-danger');
      return;
    }

    await this.board.sendDataToAPI(userValue, scoreValue);

    this.alert.textContent = `The score: (${userValue}: ${scoreValue}) was successfully added to system, click refresh button to see.`;

    this.alert.classList.remove('d-none');
    this.alert.classList.remove('alert-danger');
    this.alert.classList.add('alert-success');

    userName.value = '';
    score.value = '';
  };

  // This method is needed when the instance of DOM class is created
  // in order to avoid ESLint error and fill the table
  run = () => {
    this.fillTable();
    this.btnRefresh.addEventListener('click', this.fillTable);
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addUser();
    });
  };
}

export default DOM;
