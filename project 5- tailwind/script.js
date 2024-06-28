
const searchbox = document.querySelector("#searchbar input");
const searchbtn = document.querySelector("#searchbar button");
const watchlist = document.querySelector('#watchlist');
const mainContainer = document.querySelector("#one");
const url = "https://api.themoviedb.org/3/movie/";
const apikey = "?api_key=4c5b0e6e762ef498e58fa64de2f01752"
mainContainer.innerHTML = '';
async function moviedata(context, container) {
  const coco = context;
  console.log(coco);
  const resp = await fetch(url + context +apikey);
  const data = await resp.json();
  console.log(resp.url);
  console.log(data);
  cardisto(data.results, data.results.length, container);
}
  function cardisto(result, length, container){
    // to initialize with existing data we use parse
    const watchlistLocal = JSON.parse(localStorage.getItem('watchMoviesArray')) || [];
  
    for (let i = 0; i < length; i++) {
      const moviePoster = `https://image.tmdb.org/t/p/w500${result[i].poster_path}`;
  
      let card = document.createElement('div');
      card.classList.add('show', 'border', 'h-max', 'overflow-hidden', 'shadow-md', 'bg-purple-400', 'w-52', 'rounded-md', 'mx-auto', 'my-4', 'hover:scale-105', 'transition-transform', 'duration-300', 'transform');
  
      card.innerHTML = `
      <img src="${moviePoster}" class="rounded-t-md h-80 card-img">
      <div class="overview absolute top-0 border-1 bg-black h-80 bg-opacity-70 -translate-y-full hover:translate-y-0 transition-transform duration-700 transform">
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
      <button class="flex mx-auto mt-2 border-0 w-max pt-2 pb-0.5 px-3 mb-2 rounded-lg text-white hover:bg-purple-500 transition-transform duration-300">
        <i class="fa-solid fa-play my-1.5 mr-2"></i>
        <p class="text-lg font-semibold mb-1">Trailer</p>
      </button>
    `;
  
      container.appendChild(card);
      const watchlistButton = card.querySelector('.watchlist-btn');
      watchlistButton.addEventListener('click', function() {
        console.log('Added');
        const watchMovieTitle = card.querySelector('.card-title').innerText;
        const watchMoviePoster = card.querySelector('.card-img').src; 
        const Movierating = card.querySelector('.card-rating').innerText;
        const released = result[i].release_date;
        const desc = result[i].overview;
        const index = watchlistLocal.findIndex(movie => movie.title === watchMovieTitle);
      if (index === -1) { 
        //to add movie if it is not present in the local storage
        const watchmovie = {
          title: watchMovieTitle,
          poster: watchMoviePoster,
          rating: Movierating,
          date: released,
          description: desc
        };
        watchlistLocal.push(watchmovie);
        localStorage.setItem('watchMoviesArray', JSON.stringify(watchlistLocal));
        
        watchlistButton.classList.add('bg-purple-500', 'text-white');
      } 
      else {
        watchlistLocal.splice(index, 1); //to remove movie if it is already presnt in local storage
        localStorage.setItem('watchMoviesArray', JSON.stringify(watchlistLocal));
        
        watchlistButton.classList.remove('bg-purple-500', 'text-white');
      }
    });
  }
}
cardisto();  

async function searchdata(search) {
  const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c5b0e6e762ef498e58fa64de2f01752&query=${search}`);
  const data = await resp.json();
  console.log(data);
  console.log(data.results.length);
  mainContainer.innerHTML = ''; // Clear previous content inside the card container

  cardisto(data.results, data.results.length, mainContainer);

    mainContainer.appendChild(card); // Append each card to the main container

  
}

searchbtn.addEventListener('click', ()=>{
  searchdata(searchbox.value);
  document.querySelector("#font").style.display = "none";
  document.querySelector("#font2").style.display = "none";
  document.querySelector("#font3").style.display = "none";
  document.querySelector("#text").innerHTML = ("Search results for " + '"' + searchbox.value + '"');
})
const mainCont = document.querySelector("#two");
mainCont.innerHTML = '';

const mainContent = document.querySelector("#three");
mainCont.innerHTML = '';

moviedata("top_rated", mainContainer)
moviedata("now_playing", mainContent)
moviedata("upcoming", mainCont)

function handleMenu() {
  console.log("first");
  const menubar = document.querySelector(".menubar");
  menubar.classList.remove("translate-x-full");
  menubar.classList.add("-translate-x-0");
}

function accessMenu(){
  console.log("back");
  const menubar = document.querySelector(".menubar");
  menubar.classList.remove("-translate-x-0");
  menubar.classList.add("translate-x-full");
}
