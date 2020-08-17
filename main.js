document.getElementById('search').addEventListener('click',function(){
    const songName = document.getElementById('song-name').value;
    document.getElementById('song-name').value = '';
    const apiLink = `https://api.lyrics.ovh/suggest/${songName}`;
    fetch(apiLink)
    .then(response => response.json())
    .then(data => searchResult(data))
    .catch((error) => {
        const songsList = document.getElementById('songs-list');
        songsList.innerHTML = '';
        songsList.innerHTML = 'result not found';
    });
})

const searchResult = data=>{
    const songsList = document.getElementById('songs-list');
    songsList.innerHTML = '';
    for(let i = 0; i < 10; i++){
    songsList.innerHTML += `<p class="author lead"><strong>${data.data[i].title}</strong> Album by <span>${data.data[i].album.title}</span> <button onclick="lyrics('${data.data[i].title}','${data.data[i].artist.name}')" class="btn btn-success">Get Lyrics</button></p>`;
    }   
}
const lyrics = (titleName,artistName)=>{ 
    const lyricsApi = `https://api.lyrics.ovh/v1/${artistName}/${titleName}`
    fetch(lyricsApi)
    .then(response => response.json())
    .then(data => showLyrics(data,titleName,artistName))
}
const showLyrics = (data,titleName,artistName)=>{
    if(data.error == 'No lyrics found'){
        document.getElementById('song-title').innerHTML = 'Lyrics not found';
        document.getElementById('lyrics-field').innerHTML ='';
    }
    else{
    document.getElementById('song-title').innerHTML = `${titleName} - ${artistName}`;
    document.getElementById('lyrics-field').innerHTML = data.lyrics;
    }
}