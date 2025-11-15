const animeG = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("g")}`;
const animePG = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("pg")}`;
const animePG13 = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("pg13")}`;
const animeR17 = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("r17")}`;



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomChoice(array) {
    return array[getRandomInt(array.length)];
}

async function wait(seconds) {
    ms = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAnime() {
    let animeResults = [];

    try {
        const response = await fetch(animeG);
        const animes = await response.json();
        animeResults.push(animes.data);
    } catch (error) {
        console.error("Unable to fetch G rating animes: ", error);
    }

    try {
        const response = await fetch(animePG);
        const animes = await response.json();
        animeResults.push(animes.data);
    } catch (error) {
        console.error("Unable to fetch PG rating animes: ", error);
    }

    // MUST HAVE FOR RATE LIMITS (3 calls per second, 60 calls per minute)
    await wait(2);

    try {
        const response = await fetch(animePG13);
        const animes = await response.json();
        animeResults.push(animes.data);
    } catch (error) {
        console.error("Unable to fetch PG13 rating animes: ", error);
    }

    try {
        const response = await fetch(animeR17);
        const animes = await response.json();
        animeResults.push(animes.data);
    } catch (error) {
        console.error("Unable to fetch R17 rating animes: ", error);
    }

    // AGAIN, FOR RATE LIMITS
    await wait(2);

    return animeResults;
}

async function loadRandomAnime() {
    const container = document.getElementById('container');
    
    // Show loading text
    const loading = document.getElementById('page-load');
    loading.style.display = 'flex';

    let animeResults = await fetchAnime();

    // BUILD PAGE (add message if nothing was fetched)
    if (animeResults.length > 0) {
        const chosenRating = randomChoice(animeResults);
        console.log("Chosen Rating Array: ", chosenRating);
        const chosenAnime = randomChoice(chosenRating);
        console.log("Chosen Anime: ", chosenAnime);
    
        const row1 = document.createElement('section');
        row1.className = 'row-1';
    
        const col1 = document.createElement('div');
        col1.className = 'col-1';
    
        const genre = document.createElement('p');
        genre.className = 'genre';
        for (let i=0; i < chosenAnime.genres.length; i++) {
            genre.textContent += `${chosenAnime.genres[i].name}`;
            if (i != chosenAnime.genres.length-1) {
                genre.textContent += ", ";
            }
        }
    
        const title = document.createElement('h1');
        title.className = 'title';
        title.textContent = `${chosenAnime.title}`;

        const ageRate = document.createElement('p');
        ageRate.className = 'age-rating';
        ageRate.textContent = `Rated: ${chosenAnime.rating}`;

        const animeType = document.createElement('p');
        animeType.className = 'type';
        animeType.textContent = `Media Type: ${chosenAnime.type}`;

        const animeDuration = document.createElement('p');
        animeDuration.className = "duration";
        animeDuration.textContent = `Duration: ${chosenAnime.duration}`;
    
        const info = document.createElement('p');
        info.className = 'info';
        info.textContent = `${chosenAnime.synopsis}`;
    
        const idk = document.createElement('div');
        idk.className = 'idk';
    
        const btn = document.createElement('div');
        btn.className = 'btn';
        const blueBtn = document.createElement('button');
        blueBtn.className = 'blue-btn';
        blueBtn.textContent = 'Read Now';
        const blackBtn = document.createElement('button');
        blackBtn.className = 'black-btn';
        blackBtn.textContent = 'Watch Now';
    
        const rating = document.createElement('div');
        rating.className = 'rating';
        const star = document.createElement('img');
        star.className = 'star';
        star.src = '../images/star.png';
        const score = document.createElement('p');
        score.className = 'rate';
        score.textContent = `${chosenAnime.score} / 10`;
    
        const cover = document.createElement('img');
        cover.className = 'cover';
        cover.src = `${chosenAnime.images.jpg.large_image_url}`;
    

        // Hide loading text
        loading.style.display = 'none';

        // ADD ELEMENTS TO PAGE
        btn.appendChild(blueBtn);
        btn.appendChild(blackBtn);
        rating.appendChild(star);
        rating.appendChild(score);
        idk.appendChild(btn);
        idk.appendChild(rating);
    
        col1.appendChild(genre);
        col1.appendChild(title);
        col1.appendChild(ageRate);
        col1.appendChild(animeType);
        if (chosenAnime.type == "TV" || chosenAnime.type == "Special" || chosenAnime.type == "OVA") {
            const ep = document.createElement('p');
            ep.className = 'episodes';
            ep.textContent = `Episodes: ${chosenAnime.episodes}`;
            col1.appendChild(ep);
        }
        col1.appendChild(animeDuration);
        col1.appendChild(info);
        col1.appendChild(idk);
    
        row1.appendChild(col1);
        row1.appendChild(cover);
    
        container.appendChild(row1);
    
        // Trailer
        if (chosenAnime.trailer.embed_url) {
            const row2 = document.createElement('div');
            row2.className = 'row-2';
            const trailer = document.createElement('iframe');
            trailer.className = 'trailer';
    
            trailer.setAttribute('src', `${chosenAnime.trailer.embed_url}`);
    
            row2.appendChild(trailer);
            container.appendChild(row2);
        }
    } else {
        const note = createElement('p');
        note.textContent = "Unfortunately, we couldn't fetch any anime to display.";
        container.appendChild(note);
    }
}

window.addEventListener("load", loadRandomAnime);