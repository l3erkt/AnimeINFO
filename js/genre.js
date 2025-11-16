import * as apiUtil from "./api_util.js";

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
    const container = document.getElementById('container');
    container.style.display = "table";
    
    // Show loading text
    const loading = document.getElementById('page-load');
    loading.style.display = 'flex';

    let genres = await apiUtil.fetchAnime(Object.values(animeGenres));

    if (genres.length > 0) {
        // console.log(genres);

        // Iterate through each genre
        for (let i = 0; i < genres.length; i++) {
            let animes = genres[i];

            const divider = document.createElement('div');
            divider.className = "divider";

            const header = document.createElement('h1');
            header.textContent = Object.keys(animeGenres)[i];

            container.appendChild(divider);
            divider.appendChild(header);

            // iterate through each anime in genre
            for (let j = 0; j < animes.length; j++) {
                apiUtil.buildAnimeList(animes, container);
            }
        }
    } else {
        const note = document.createElement('p');
        note.textContent = "Unfortunately, we couldn't fetch any anime to display.";
        container.appendChild(note);
    }

    // Hide loading text
    loading.style.display = 'none';
}

window.addEventListener("load", loadGenres);