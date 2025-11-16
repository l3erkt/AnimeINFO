import * as apiUtil from "./api_util.js";


async function loadRandomAnime() {
    const container = document.getElementById('container');
    
    // Show loading text
    const loading = document.getElementById('page-load');
    loading.style.display = 'flex';

    let animeResults = await apiUtil.fetchAnime([apiUtil.animeG, apiUtil.animePG, apiUtil.animePG13, apiUtil.animeR17]);

    // BUILD PAGE (add message if nothing was fetched)
    if (animeResults.length > 0) {
        const chosenRating = apiUtil.randomChoice(animeResults);
        // console.log("Chosen Rating Array: ", chosenRating);
        const chosenAnime = apiUtil.randomChoice(chosenRating);
        // console.log("Chosen Anime: ", chosenAnime);
    
        const row1 = document.createElement('section');
        row1.className = 'row-1';

        const header = document.createElement('h1');
        header.className = 'header';
        header.textContent = "AnimeInfo Home";
        const header2 = document.createElement('h2');
        header2.className = 'header2';
        header2.textContent = "Chosen Featured Anime";
    
        const col1 = document.createElement('div');
        col1.className = 'col-1';

        const genre = apiUtil.createGenres(chosenAnime.genres);
        const title = apiUtil.createTitle(chosenAnime.title);
        const ageRate = apiUtil.createAgeRating(chosenAnime.rating);
        const animeType = apiUtil.createMediaType(chosenAnime.type);
        const animeDuration = apiUtil.createDuration(chosenAnime.duration);
        const info = apiUtil.createDesc(chosenAnime.synopsis);
    
        const divider = document.createElement('div');
        divider.className = 'divider';
    
        const btnInfo = apiUtil.createButtons();
        const btn = btnInfo.Div;
        const blueBtn = btnInfo.Read;
        const blackBtn = btnInfo.Watch;
    
        const ratingInfo = apiUtil.createScore(chosenAnime.score);
        const rating = ratingInfo.Div;
        const star = ratingInfo.Image;
        const score = ratingInfo.Score;
    
        const cover = apiUtil.createCover(chosenAnime.images.jpg.large_image_url);

        
        // ADD ELEMENTS TO PAGE
        btn.appendChild(blueBtn);
        btn.appendChild(blackBtn);
        rating.appendChild(star);
        rating.appendChild(score);
        divider.appendChild(btn);
        divider.appendChild(rating);
        
        col1.appendChild(genre);
        col1.appendChild(title);
        col1.appendChild(ageRate);
        col1.appendChild(animeType);
        if (chosenAnime.type == "TV" || chosenAnime.type == "Special" || chosenAnime.type == "OVA") {
            const ep = apiUtil.createEpCount(chosenAnime.episodes);
            col1.appendChild(ep);
        }
        col1.appendChild(animeDuration);
        col1.appendChild(info);
        col1.appendChild(divider);
        
        row1.appendChild(header);
        row1.appendChild(header2);
        row1.appendChild(col1);
        row1.appendChild(cover);
        
        container.appendChild(row1);
        
        // Trailer
        const trailerInfo = apiUtil.createTrailer(chosenAnime.trailer.embed_url);
        if (trailerInfo) {
            const row2 = trailerInfo.Div;
            const trailer = trailerInfo.Trailer;
            row2.appendChild(trailer);
            container.appendChild(row2);
        }
    } else {
        const note = document.createElement('p');
        note.textContent = "Unfortunately, we couldn't fetch any anime to display.";
        container.appendChild(note);
    }

    // Hide loading text
    loading.style.display = 'none';
}

window.addEventListener("load", loadRandomAnime);