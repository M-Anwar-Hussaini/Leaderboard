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

  fillTable = async () => {
    const data = await this.board.getDataFromAPI();
    this.tbody.innerHTML = '';
    data.forEach((game, index) => {
      this.tbody.insertAdjacentHTML('beforeend', this.createScoreHTML(game, index + 1));
    });
  };

  addUser = async () => {
    const userName = document.getElementById('user-name');
    const score = document.getElementById('user-score');

    if (userName.value === null || score.value === null) return;

    this.board.sendDataToAPI(userName.value, score.value);
    userName.value = '';
    score.value = '';
  };

  action = () => {
    this.fillTable();
    this.btnRefresh.addEventListener('click', this.fillTable);
    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.addUser();
    });
  };
}

export default DOM;
