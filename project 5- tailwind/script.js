function handleMenu() {
  console.log('First');
}

const searchbox = document.querySelector("#searchbar input");
const searchbtn = document.querySelector("#searchbar button");
const mainContainer = document.querySelector("#one"); // Corrected selector to target the card container
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
  // mainContainer.innerHTML = ''; // Clear previous content inside the card container
function cardisto(result, length, container){
  for (let i = 0; i < length; i++) {
    const moviePoster = `https://image.tmdb.org/t/p/w500${result[i].poster_path}`;

    let card = document.createElement('div');
    card.classList.add('border', 'h-max', 'shadow-md', 'bg-purple-400', 'w-52', 'rounded-md', 'mx-auto', 'my-4', 'hover:scale-105', 'transition-transform', 'duration-300', 'transform');

    card.innerHTML = `
      <img src="${moviePoster}" class="rounded-t-md h-80">
      <div class="flex mt-2">
        <i class="fa-solid fa-star p-2 mr-0.5 text-yellow-400"></i>
        <p class="py-0.5 text-gray-600 font-bold text-lg">${result[i].vote_average}</p>
      </div>
      <div class="ml-2">
        <h1 class="text-lg font-semibold text-white ml-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap mr-0.5">${result[i].title}</h1>
        <button class="flex border-0 h-max w-44 px-2 my-2 justify-center rounded-md text-blue-700 hover:text-white hover:bg-purple-500 bg-purple-300 ml-2">
          <i class="fa-regular fa-bookmark my-2 mr-2"></i>
          <p class="text-xl font-semibold">Wishlist</p>
        </button>
      </div>
      <button class="flex mx-auto mt-2 border-0 w-max pt-2 pb-0.5 px-3 mb-2 rounded-lg text-white hover:bg-purple-500 transition-transform duration-300">
        <i class="fa-solid fa-play my-1.5 mr-2"></i>
        <p class="text-lg font-semibold mb-1">Trailer</p>
      </button>
    `;

    container.appendChild(card);// Append each card to the main container
  }}
  cardisto();

async function searchdata(search) {
  const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c5b0e6e762ef498e58fa64de2f01752&query=${search}`);
  const data = await resp.json();
  console.log(data);
  console.log(data.results.length);
  mainContainer.innerHTML = ''; // Clear previous content inside the card container

  for (let i = 0; i < data.results.length; i++) {
    const moviePoster = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;

    let card = document.createElement('div');
    card.classList.add('border', 'h-max', 'shadow-md', 'bg-purple-400', 'w-52', 'rounded-md', 'mx-auto', 'my-4', 'hover:scale-105', 'transition-transform', 'duration-300', 'transform');

    card.innerHTML = `
      <img src="${moviePoster}" class="rounded-t-md h-80" alt="Image not available">
      <div class="flex mt-2">
        <i class="fa-solid fa-star p-2 mr-0.5 text-yellow-400"></i>
        <p class="py-0.5 text-gray-600 font-bold text-lg">${data.results[i].vote_average}</p>
      </div>
      <div class="ml-2">
        <h1 class="text-lg font-semibold text-white ml-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap mr-1">${data.results[i].title}</h1>
        <button class="flex border-0 h-max w-44 px-2 my-2 justify-center rounded-md text-blue-700 hover:text-white hover:bg-purple-500 bg-purple-300 ml-2">
          <i class="fa-regular fa-bookmark my-2 mr-2"></i>
          <p class="text-xl font-semibold">Wishlist</p>
        </button>
      </div>
      <button class="flex mx-auto mt-2 border-0 w-max pt-2 pb-0.5 px-3 mb-2 rounded-lg text-white hover:bg-purple-500 transition-transform duration-300">
        <i class="fa-solid fa-play my-1.5 mr-2"></i>
        <p class="text-lg font-semibold mb-1">Trailer</p>
      </button>
    `;

    mainContainer.appendChild(card); // Append each card to the main container
  }
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




