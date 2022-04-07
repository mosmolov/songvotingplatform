export function SelectSongs() {
    setInterval(() => {
        var date = new Date();
        console.log(date.getHours());
        
        if (date.getHours() == 9 || date.getMinutes() == 21) {
            let selectedSongs = [];
            fetch("http://localhost:3001/songs")
                .then((response) => response.json())
                .then((data) => {
                    {
                        while(selectedSongs.length < 3){
                            let randSong = data[Math.floor(Math.random() * data.length)];
                            if(!selectedSongs.includes(randSong)){
                                selectedSongs.push(randSong);
                            }
                        }
                        
                    }
                    console.log(selectedSongs);
                    fetch("http://localhost:3001/selectedSongs", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(selectedSongs)
                    });
                })
        }
    }, 10000);
}
