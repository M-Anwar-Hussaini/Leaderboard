class Leaderboard {
  constructor() {
    this.apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Ac8da8pWzrDvUpOmkhoP/scores';
  }

  getDataFromAPI = async () => {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    return data.result;
  };

  sendDataToAPI = async (userName, score) => {
    const data = {
      method: 'POST',
      body: JSON.stringify({
        user: userName,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    await fetch(this.apiUrl, data);
  };
}

export default Leaderboard;
