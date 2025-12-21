import * as apiUtil from "./api_util.mjs";

const animeGenres = {
    "Action": apiUtil.actionAnime,
    "Adventure": apiUtil.adventureAnime,
    "Comedy": apiUtil.comedyAnime,
    "Mystery": apiUtil.mysteryAnime,
    "Fantasy": apiUtil.fantasyAnime,
    "Horror": apiUtil.horrorAnime,
    "Sports": apiUtil.sportsAnime,
    "Slice of Life": apiUtil.sliceOfLifeAnime
}


async function loadGenres() {
    const btnContainer = document.getElementById('genre-btn-container');
    const animeList = document.getElementById('genre-anime-list');
    
    // Show loading text
    const loading = document.getElementById('page-load');
    loading.style.display = 'flex';

    let genres = await apiUtil.fetchAnime(Object.values(animeGenres));

    if (genres.length > 0) {
        // console.log(genres);
        // Iterate through each genre
        for (let i = 0; i < genres.length; i++) {

            const divider = document.createElement('buttton');
            divider.className = "genre";

            const header = document.createElement('h1');
            header.textContent = Object.keys(animeGenres)[i];

            btnContainer.appendChild(divider);
            divider.appendChild(header);
        }

        btnContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const g = e.target.textContent

            if (g === "Action"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[0], animeList);
            }
            if (g === "Adventure"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[1], animeList);
            }
            if (g === "Comedy"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[2], animeList);
            }
            if (g === "Mystery"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[3], animeList);
            }
            if (g === "Fantasy"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[4], animeList);
            }
            if (g === "Horror"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[5], animeList);
            }
            if (g === "Sports"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[6], animeList);
            }
            if (g === "Slice of Life"){
                animeList.innerHTML = '';
                apiUtil.buildAnimeList(genres[7], animeList);
            }
            
        })


    /*  */
    } else {
        const note = document.createElement('p');
        note.textContent = "Unfortunately, we couldn't fetch any anime to display.";
        container.appendChild(note);
    }

    // Hide loading text
    loading.style.display = 'none';
}

window.addEventListener("load", loadGenres);