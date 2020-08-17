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
        songsList.innerHTML = `<div class="search-result col-md-8 mx-auto py-2">
        <div class="single-result row align-items-center p-3">
            <div class="text-center col-md-9">
                <h3 class="result-padding lyrics-name">Result not found</h3>
            </div>
        </div>
        </div>`
    });
})
//search song & showed result  
const searchResult = data=>{
    const songsList = document.getElementById('songs-list');
    songsList.innerHTML = '';
    for(let i = 0; i < 10; i++){
    songsList.innerHTML += ` <div class="search-result col-md-8 mx-auto py-2">
    <div class="single-result row align-items-center p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${data.data[i].title}</h3>
            <p class="author lead">Album by <span>${data.data[i].album.title}</span></p>
            <p class="author lead">Artist: <span> ${data.data[i].artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="lyrics('${data.data[i].title}','${data.data[i].artist.name}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>
    </div>`;
    }   
    document.getElementById('fancy-results').innerHTML = '';
}
//fetch lyrics part
const lyrics = (titleName,artistName)=>{ 
    const lyricsApi = `https://api.lyrics.ovh/v1/${artistName}/${titleName}`
    fetch(lyricsApi)
    .then(response => response.json())
    .then(data => showLyrics(data,titleName,artistName))
}
//lyrics presentation part
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