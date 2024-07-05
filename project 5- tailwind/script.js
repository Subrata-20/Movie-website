const searchbox = document.querySelector("#searchbar input");
const searchbtn = document.querySelector("#searchbar button");
const watchlist = document.querySelector('#watchlist');
const mainContainer = document.querySelector("#one");
const modallist = document.getElementById("watchlistmodal");
const mainCon = document.querySelector("#zero");
const url = "https://api.themoviedb.org/3/movie/";
const apikey = "?api_key=4c5b0e6e762ef498e58fa64de2f01752";
mainContainer.innerHTML = '';

async function moviedata(context, container, pages = 1) {
  let allResults = [];
  for (let page = 1; page <= pages; page++) {
    const resp = await fetch(`${url}${context}${apikey}&page=${page}`);
    const data = await resp.json();
    allResults = allResults.concat(data.results);
  }
  cardisto(allResults, allResults.length, container);
}

function cardisto(result, length, container) {
  const watchlistLocal = JSON.parse(localStorage.getItem('watchMoviesArray')) || [];

  for (let i = 0; i < length; i++) {
    const moviePoster = `https://image.tmdb.org/t/p/w500${result[i].poster_path}`;
    let card = document.createElement('div');
    card.classList.add('show', 'border', 'h-max', 'overflow-hidden', 'shadow-md', 'bg-purple-400', 'w-52', 'rounded-md', 'mx-auto', 'my-4', 'hover:scale-105', 'transition-transform', 'duration-300', 'transform');

    card.innerHTML = `
      <img src="${moviePoster}" class="rounded-t-md h-80 card-img">
      <div class="overview absolute top-0 border-1 bg-black h-80 bg-opacity-70 -translate-y-full hover:translate-y-0 transition-transform duration-700 transform overflow-hidden overflow-ellipsis">
          <h1 class="text-gray-300 pt-3 pl-3 font-bold">Overview:</h1>
          <p class=" text-gray-300 p-3 text-xs">${result[i].overview}</p>
      </div>
      <div class="flex mt-2">
        <i class="fa-solid fa-star p-2 mr-0.5 text-yellow-400"></i>
        <p class="py-0.5 text-gray-600 font-bold text-lg card-rating">${result[i].vote_average}</p>
      </div>
      <div class="ml-2">
        <h1 class="text-lg font-semibold text-white ml-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap mr-0.5 card-title">${result[i].title}</h1>
        <button class="watchlist-btn flex border-0 h-max w-44 px-2 my-2 justify-center rounded-md text-blue-700 hover:text-white hover:bg-purple-500 bg-purple-300 ml-2">
          <i class="fa-regular fa-bookmark my-2 mr-2"></i>
          <p class="text-xl font-semibold">Watchlist</p>
        </button>
      </div>
      <button class="play-btn flex mx-auto mt-2 border-0 w-max pt-2 pb-0.5 px-3 mb-2 rounded-lg text-white hover:bg-purple-500 transition-transform duration-300">
        <i class="fa-solid fa-play my-1.5 mr-2" id="bookmark"></i>
        <p class="text-lg font-semibold mb-1">Play</p>
      </button>
    `;

    container.appendChild(card);
    const watchlistButton = card.querySelector('.watchlist-btn');
    const playButton = card.querySelector('.play-btn');
    const watchlistIcon = watchlistButton.querySelector('i');
    const modallistIcon = modallist.querySelector('i');


    function addtowatchlist() {
      console.log('Added');
      const watchMovieTitle = card.querySelector('.card-title').innerText;
      const watchMoviePoster = card.querySelector('.card-img').src; 
      const Movierating = card.querySelector('.card-rating').innerText;
      const released = result[i].release_date;
      const desc = result[i].overview;
      const index = watchlistLocal.findIndex(movie => movie.title === watchMovieTitle);
      if (index === -1) {
        const watchmovie = {
          title: watchMovieTitle,
          poster: watchMoviePoster,
          rating: Movierating,
          date: released,
          description: desc
        };
        watchlistLocal.push(watchmovie);
        localStorage.setItem('watchMoviesArray', JSON.stringify(watchlistLocal));
        watchlistButton.classList.remove('text-blue-700');
        watchlistButton.classList.add('bg-purple-500', 'text-white');
        watchlistIcon.classList.add('font-bold');
        modallist.classList.remove('text-blue-700');
        modallistIcon.classList.add('font-bold');
        modallist.classList.add('bg-purple-500', 'text-white');
      } else {
        watchlistLocal.splice(index, 1);
        localStorage.setItem('watchMoviesArray', JSON.stringify(watchlistLocal));
        watchlistButton.classList.remove('bg-purple-500', 'text-white');
        watchlistButton.classList.add('text-blue-700');
        watchlistIcon.classList.remove('font-bold');
        modallist.classList.remove('bg-purple-500', 'text-white');
        modallistIcon.classList.remove('font-bold');
        modallist.classList.add('text-blue-700');
      }
    }

    watchlistButton.addEventListener('click', addtowatchlist);
    playButton.addEventListener('click', function () {
      openModal(moviePoster, result[i].overview, result[i].title, addtowatchlist);
    });
  }
}

async function searchdata(search) {
  document.querySelector("#font0").style.display = "none";
  mainCon.innerHTML = '';
  let allResults = [];
  for(let i = 1; i <= 2; i++){
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c5b0e6e762ef498e58fa64de2f01752&query=${search}&page=${i}`);
    const data = await resp.json();
    allResults = allResults.concat(data.results);
    console.log(data);
    console.log(allResults.length);
  }
  cardisto(allResults, allResults.length, mainCon);
}

searchbtn.addEventListener('click', () => {
  searchdata(searchbox.value);
  document.querySelector("#font").style.display = "none";
  document.querySelector("#font2").style.display = "none";
  document.querySelector("#font3").style.display = "none";
  document.querySelector("#text").innerHTML = ("Search results for " + '"' + searchbox.value + '"');
});


mainCon.innerHTML = '';

const mainCont = document.querySelector("#two");
mainCont.innerHTML = '';

const mainContent = document.querySelector("#three");
mainContent.innerHTML = '';
moviedata("popular", mainCon, 3);
document.querySelector("#font").style.display = "none";
document.querySelector("#font2").style.display = "none";
document.querySelector("#font3").style.display = "none";
function toprate(){
mainContainer.innerHTML = '';
mainCont.innerHTML = '';
mainContent.innerHTML = '';
mainCon.innerHTML = '';
moviedata("top_rated", mainContainer, 3);
document.querySelector("#font").style.display = "block";
document.querySelector("#font0").style.display = "none";
document.querySelector("#font2").style.display = "none";
document.querySelector("#font3").style.display = "none";
}
function latest(){
mainContainer.innerHTML = '';
mainCont.innerHTML = '';
mainContent.innerHTML = '';
mainCon.innerHTML = '';
moviedata("now_playing", mainContent, 3);
document.querySelector("#font3").style.display = "block";
document.querySelector("#font").style.display = "none";
document.querySelector("#font0").style.display = "none";
document.querySelector("#font2").style.display = "none";
}
 function upcoming(){
mainContainer.innerHTML = '';
mainCont.innerHTML = '';
mainContent.innerHTML = '';
mainCon.innerHTML = '';
moviedata("upcoming", mainCont, 3);
document.querySelector("#font2").style.display = "block";
document.querySelector("#font").style.display = "none";
document.querySelector("#font0").style.display = "none";
document.querySelector("#font3").style.display = "none"; 
}

function handleMenu() {
  console.log("first");
  const menubar = document.querySelector(".menubar");
  menubar.classList.remove("translate-x-full");
  menubar.classList.add("-translate-x-0");
}

function accessMenu() {
  console.log("back");
  const menubar = document.querySelector(".menubar");
  menubar.classList.remove("-translate-x-0");
  menubar.classList.add("translate-x-full");
}

function openModal(moviePoster, moviedesc, moviename, addtowatchlist) {
  document.getElementById('modalimg').src = moviePoster;
  document.getElementById('modaldesc').innerText = moviedesc;
  document.getElementById('namemodal').innerText = moviename;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
  const modalWatchlistButton = document.querySelector('#modal #watchlistmodal');
  modalWatchlistButton.onclick = addtowatchlist;
}

function closeModal() {
  document.getElementById('modal').classList.remove('flex');
  document.getElementById('modal').classList.add('hidden');
}

modallist.addEventListener('click', ()=>{
  addtowatchlist();
});
