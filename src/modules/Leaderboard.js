class Leaderboard {
  constructor() {
    this.apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mfnFOIKVcDAV9WvHfW7D/scores';
  }

  getDataFromAPI = async () => {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      return data.result;
    } catch (error) {
      return error;
    }
  };

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
}

export default Leaderboard;
