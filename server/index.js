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
    console.log(selectedSongs);
    let token = "";
    const response = await fetch("https://song-voting-api.herokuapp.com/users/login", {
        "headers": {
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "Referer": "https://song-voting-api.herokuapp.com/explorer/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\n  \"email\": \"admin@crsd.org\",\n  \"password\": \"123123\"\n}",
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

