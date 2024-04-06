console.log("welcome");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");

let songItems = Array.from(document.getElementsByClassName('songItem'));
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let timestamp = Array.from(document.getElementsByClassName('timestamp'));

let songs = [
    {songName: "song_1.mp3", filePath:"songs/1.mp3", coverPath:"cover/1.jpg"},
    {songName: "song_2.mp3", filePath:"songs/2.mp3", coverPath:"cover/2.jpg"},
    {songName: "song_3.mp3", filePath:"songs/3.mp3", coverPath:"cover/3.jpg"},
    {songName: "song_4.mp3", filePath:"songs/4.mp3", coverPath:"cover/4.jpg"},
    {songName: "song_5.mp3", filePath:"songs/5.mp3", coverPath:"cover/5.jpg"},
    {songName: "song_6.mp3", filePath:"songs/6.mp3", coverPath:"cover/6.jpg"},
    {songName: "song_7.mp3", filePath:"songs/7.mp3", coverPath:"cover/7.jpg"},
    {songName: "song_8.mp3", filePath:"songs/8.mp3", coverPath:"cover/8.jpg"},
    {songName: "song_9.mp3", filePath:"songs/9.mp3", coverPath:"cover/9.jpg"},
    {songName: "song_10.mp3", filePath:"songs/10.mp3", coverPath:"cover/10.jpg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
})
 
// handle play paused ckick
masterPlay.addEventListener('click', () => {
    // if <|
    if(audioElement.paused){

        let indi = document.getElementById(songIndex);
        indi.classList.remove('fa-play-circle');
        indi.classList.add('fa-pause-circle');

        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById('gif').style='opacity:1';
    }
    // if ||
    else{

        let indi = document.getElementById(songIndex);
        indi.classList.remove('fa-pause-circle');
        indi.classList.add('fa-play-circle');

        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.getElementById('gif').style='opacity:0';
    }
    
    
})


audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})


makeAllPlay = ()=>{
    songItemPlay.forEach((element)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

PlayThatSong = (x)=>{
    songIndex = x;
    audioElement.src = songs[x].filePath;
    audioElement.play();
    masterSongName.innerHTML=songs[x].songName; 
}



let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
songItemPlay.forEach((element)=> {
    element.addEventListener('click',(e)=>{
        makeAllPlay(); 
        PlayThatSong(e.target.id);
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById('gif').style='opacity:1';
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // audioElement.src = 'songs/3.mp3';
        // audioElement.play();
    })
})

previous.addEventListener('click',()=>{
    if(songIndex==0){
        songIndex=9;
    }
    else{
        songIndex -= 1;
    }
    makeAllPlay(songIndex);
    PlayThatSong(songIndex);

})

next.addEventListener('click',()=>{
    if(songIndex == 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    makeAllPlay(songIndex);
    PlayThatSong(songIndex);   
    
})

