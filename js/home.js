const animeSearch = `https://api.jikan.moe/v4/anime?sfw=${encodeURIComponent(true)}`;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function loadRandomAnime() {
    const container = document.getElementById('container');

    fetch(animeSearch)
        .then(res => res.json())
        .then(animes => {
            console.log(animes.data);

            const chosenAnime = animes.data[getRandomInt(animes.data.length)]
            console.log(chosenAnime);

            // Main divider
            const show = document.createElement('div');
            show.className = "show";

            const img = document.createElement('img');
            img.className = 'cover';
            img.src = `${chosenAnime.images.jpg.large_image_url}`;
            img.setAttribute('max-height', '300');
            img.setAttribute('max-width', '300');


            // Info divider
            const showInfo = document.createElement('div');
            showInfo.className = 'show-info';

            const title = document.createElement('h3');
            title.className = 'title';
            title.textContent = `${chosenAnime.title}`;

            const ep = document.createElement('p');
            ep.className = 'ep';
            ep.textContent = `Episodes: ${chosenAnime.episodes}`;

            const rate = document.createElement('p');
            rate.className = "rate";
            rate.textContent = `Rating: ${chosenAnime.rating}`;


            // Add elements to container (order matters)
            showInfo.appendChild(title);
            showInfo.appendChild(document.createElement('br'));
            showInfo.appendChild(rate);
            showInfo.appendChild(document.createElement('br'));
            showInfo.appendChild(ep);
            showInfo.appendChild(document.createElement('br'));

            show.appendChild(img);
            show.appendChild(showInfo);
            
            container.appendChild(show);


            // Trailer
            if (chosenAnime.trailer.embed_url) {
                const trailerDiv = document.createElement('div');
                trailerDiv.className = "show-trailer-div";

                const showTrailer = document.createElement('iframe');
                showTrailer.className = 'show-trailer';
                showTrailer.setAttribute('width', '560');
                showTrailer.setAttribute('height', '315');
                showTrailer.setAttribute('src', `${chosenAnime.trailer.embed_url}`);

                trailerDiv.appendChild(showTrailer);
                showInfo.appendChild(trailerDiv);
            }
    });
}

window.addEventListener("load", loadRandomAnime);