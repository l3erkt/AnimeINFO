import * as apiUtil from "./api_util.js";


async function loadPopularAnime() {
    const container = document.getElementById('container');

    // Show loading text
    const loading = document.getElementById('page-load');
    loading.style.display = 'flex';

    let animes = await apiUtil.fetchAnime([apiUtil.topAnime]);

    // BUILD PAGE (add message if nothing was fetched)
    if (animes.length > 0) {
        apiUtil.buildAnimeList(animes, container);
    } else {
        const note = document.createElement('p');
        note.textContent = "Unfortunately, we couldn't fetch any anime to display.";
        container.appendChild(note);
    }
    
    // Hide loading text
    loading.style.display = 'none';
}

window.addEventListener("load", loadPopularAnime);