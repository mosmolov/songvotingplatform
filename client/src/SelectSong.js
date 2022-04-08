export function SelectSongs() {
  setInterval(() => {
    var date = new Date();

    if (date.getHours() === 13 && date.getMinutes() === 57) {
      let selectedSongs = [];
      var songs = {};
      fetch("http://localhost:3001/songs")
        .then((response) => response.json())
        .then((data) => {
          while (selectedSongs.length < 3) {
            let randSong = data[Math.floor(Math.random() * data.length)];
            if (!selectedSongs.includes(randSong)) {
              selectedSongs.push(randSong);
              songs = { ...songs, ...randSong };
            }
          }
          fetch("http://localhost:3001/selectedSongs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(songs),
          });
        });
    }
  }, 10000);
}
