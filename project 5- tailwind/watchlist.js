
const wrapper = document.getElementById('wrapper');
console.log('Wrapper element:', wrapper);
const watchMoviesArray = JSON.parse(localStorage.getItem('watchMoviesArray')) || [];
console.log('Watchlist Movies:', watchMoviesArray);

function addMovieToWatchlistPage() {
    if (watchMoviesArray.length === 0) {
        console.log('No movies in the watchlist.');
        return;
    }
    for (let i = 0; i < watchMoviesArray.length; i++) {
        let poster = watchMoviesArray[i].poster;
        let title = watchMoviesArray[i].title;
        let rating = watchMoviesArray[i].rating;
        let released = watchMoviesArray[i].date;
        let description = watchMoviesArray[i].description;
        let movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'border', 'shadow-md', 'bg-purple-400', 'max-w-screen-lg', 'rounded-md', 'mx-auto', 'my-4', 'md:hover:scale-105', 'transition-transform', 'duration-300', 'transform');
        movieCard.innerHTML = 
        `<div>
        <div class="flex">   
                <img class="poster rounded-sm h-28 md:h-40 m-3" src="${poster}">
                <i class="fa-solid fa-xmark text-sm text-gray-200 absolute top-4 right-6 cursor-pointer border-0 rounded-full px-3.5 py-2 hover:bg-purple-300 hover:text-white transition-transform duration-300"></i>
                <div>
                    <h1 class="pt-6 md:pt-14 ml-3 pb-2 text-white font-bold text-base md:text-xl choco">${title}</h1>
                    <p class="text-sm md:text-lg ml-3 text-gray-200">Released: ${released}</p>
                    <div class="flex">
                        <i class="fa-solid fa-star py-2 md:py-3 pl-3 pr-1.5 text-yellow-400"></i>
                        <p class="text-sm md:text-lg mt-1.5 text-gray-200">${rating}</p>
                    </div>
                </div>
            </div>
            <p class=" text-xs md:text-base pb-4 ml-3 text-gray-100 pr-2">
               ${description}
            </p> </div>
        `;

        wrapper.appendChild(movieCard);
    }
}

addMovieToWatchlistPage();
wrapper.addEventListener('click', (e)=>{
    if(e.target.tagName == "I"){
        const index = e.target.parentElement.parentElement.parentElement.dataset.index; // Get the index from the data attribute
        watchMoviesArray.splice(index, 1);
        localStorage.setItem('watchMoviesArray', JSON.stringify(watchMoviesArray));

        e.target.parentElement.parentElement.parentElement.remove();
    }
})
