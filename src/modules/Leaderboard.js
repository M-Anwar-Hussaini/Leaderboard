class Leaderboard {
  constructor() {
    this.apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/6XZFOWbN7mSU4hW6fIO9/scores';
  }

  // It send a request to API and get the info saved on API
  getDataFromAPI = async () => {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      return data.result;
    } catch (error) {
      return error;
    }
  };

  // Send the info to the API
  sendDataToAPI = async (userName, score) => {
    try {
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
    } catch (error) {
      return error;
    }
    return null;
  };

  // Send a request to API asking for a newly-generated game ID
  generateNewGameID = async () => {
    const res = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'chess',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();
    return data.result;
  };
}

export default Leaderboard;
