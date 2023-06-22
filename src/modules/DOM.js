// This file is for manipulating info the the DOM
import Leaderboard from './Leaderboard.js';

class DOM {
  constructor() {
    const _ = document;

    // Selecting Elements
    this.board = new Leaderboard();
    this.btnRefresh = _.getElementById('btn--refresh');
    this.btnSubmit = _.getElementById('btn--submit');
    this.tbody = _.querySelector('tbody');
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

    if (userName.value === null || score.value === null) return;

    this.board.sendDataToAPI(userName.value, score.value);
    userName.value = '';
    score.value = '';
  };

  // This method is needed when the instance of DOM class is created
  // in order to avoid ESLint error and fill the table
  run = () => {
    this.fillTable();
    this.btnRefresh.addEventListener('click', this.fillTable);
    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.addUser();
    });
  };
}

export default DOM;
