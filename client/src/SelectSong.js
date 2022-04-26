export function SelectSongs() {
  fetch("http://localhost:3001/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "selectedSongs": []
    })
  })
  setInterval(() => {
    var date = new Date();

    if (date.getHours() === 10 && date.getMinutes() === 28) {
      let songs = [];
      fetch("http://localhost:3001/songs")
        .then((response) => response.json())
        .then((data) => {
          while (songs.length < 3) {
            let randSong = data[Math.floor(Math.random() * data.length)];
            if (!songs.includes(randSong)) {
              songs.push(randSong);
            }
          }
          fetch("http://localhost:3001/selectedSongs/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(songs),
          });
        });
    }
  }, 60000);
}
