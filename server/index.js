const fetch = require("node-fetch");
const addSongs = async () => {
    const selectedSongs = await selectSong();
    postSelectedSongs(selectedSongs);
}
const selectSong = async () => {
    let selectedSongs = [];
   await fetch(`https://song-voting-api.herokuapp.com/songs`)
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then((data) => {
        let counter = 0;
        while (counter < 3) {
          let randSong = data[Math.floor(Math.random() * data.length)];
          if (
            selectedSongs.length === 0 ||
            !selectedSongs.some((item) => item.id === randSong.id)
          ) {
            selectedSongs.push(randSong);
            counter++;
          }
        }
      })
      return selectedSongs;
  };
const postSelectedSongs = async(selectedSongs) => {
    selectedSongs.forEach(song => {
        song.votes = 0;
    })
    let token = "";
    const response = await fetch("https://song-voting-api.herokuapp.com/users/login", {
        "headers": {
          "accept": "application/json"
        },
        "body": {
            "email": process.env.API_USERNAME,
            "password": process.env.API_PASSWORD
        },
        "method": "POST"
      }).catch(err => console.log(err));
    token = await response.json()
    token = token.token;
    const deleteResponse = await fetch("https://song-voting-api.herokuapp.com/selectedsongs", {
        method:"DELETE",
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            "Authorization": `Bearer ${token}`
        }
    })
    let res =await deleteResponse;
    const patchResponse =  await fetch("https://song-voting-api.herokuapp.com/selectedsongs", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(selectedSongs)
    })
    res = await patchResponse;

}
addSongs();

