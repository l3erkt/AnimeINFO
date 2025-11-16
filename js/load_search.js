import * as apiUtil from "./api_util.js";


async function loadSearch() {
    // FETCH DATA
    const container = document.getElementById("container");
    const inputValue = window.location.href.split("?query=")[1];
    const queryURL = apiUtil.animeSearch + `&q=${encodeURIComponent(inputValue)}`;

    // Show loading text
    const loading = document.getElementById('page-load');
    loading.style.display = 'flex';

    let animeResults = await apiUtil.fetchAnime([queryURL]);

    // BUILD PAGE (add message if nothing was fetched)
    if (animeResults.length > 0) {
        const header = document.createElement("h1");
        header.textContent = `Search Results For: ${inputValue}`;
        container.appendChild(header);

        const br = document.createElement("br");
        container.appendChild(br);

        apiUtil.buildAnimeList(animeResults, container);
    } else {
        const note = document.createElement('p');
        note.textContent = "Unfortunately, we couldn't fetch any anime to display.";
        container.appendChild(note);
    }

    // Hide loading text
    loading.style.display = 'none';
}

window.addEventListener("load", loadSearch);