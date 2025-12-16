// APIS
export const animeSearch = `https://api.jikan.moe/v4/anime?sfw=${encodeURIComponent(true)}`;

export const topAnime = `https://api.jikan.moe/v4/top/anime`;

export const actionAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("1")}`;
export const adventureAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("2")}`;
export const comedyAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("4")}`;
export const mysteryAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("7")}`;
export const fantasyAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("10")}`;
export const horrorAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("14")}`;
export const sportsAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("30")}`;
export const sliceOfLifeAnime = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent("36")}`;

export const animeG = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("g")}`;
export const animePG = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("pg")}`;
export const animePG13 = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("pg13")}`;
export const animeR17 = `https://api.jikan.moe/v4/anime?rating=${encodeURIComponent("r17")}`;


// API KEY LINKS (PRIVATE)
import * as apiKeys from "./api_keys.js";


// HELPER FUNCTIONS
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function randomChoice(array) {
    return array[getRandomInt(array.length)];
}

export async function wait(seconds) {
    let ms = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function findOGArt(variants, size="original") {
    for (let i = 0; i < variants.length; i++) {
        if (variants[i].type == size) {
            return variants[i].url;
        }
    }
}

export async function fetchArt(query="") {
    let key = "";
    key = (query) ?
        apiKeys.danbooruBase + "&tags=" + query.toLowerCase(): // add query if there is one
        apiKeys.danbooruBase; // go with the default index if no query

    console.log(key);
    // wrap in try catch to handle errors
    try {
        const response = await fetch(key);
        const animeData = await response.json();
        return animeData;
    } catch (error) {
        console.error(`Unable to fetch ${animeData[i]} data: `, error);
    }
}

// FETCH FUNCTION
export async function fetchAnime(animes) {
    let animeResults = [];

    for (let i = 0; i < animes.length; i++) {
        // every 2 iterations we should wait (RATE LIMITS)
        if (i % 2 == 0) {
            await wait(2);
        }

        // wrap in try catch to handle errors
        try {
            const response = await fetch(animes[i]);
            const animeData = await response.json();
            console.log(animeData);
            animeResults.push(animeData.data);
        } catch (error) {
            console.error(`Unable to fetch ${animeData[i]} data: `, error);
        }
    }

    // just return anime data if only 1 was requested
    if (animeResults.length == 1 && animes.length == 1) {
        return animeResults[0];
    }
    return animeResults;
}


// HTML FUNCTIONS
export function createTitle(text) {
    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = text;
    return title;
}

export function createEpCount(amount) {
    const ep = document.createElement('p');
    ep.className = 'episodes';
    ep.textContent = `Episodes: ${amount}`;
    return ep;
}

export function createCover(url) {
    const img = document.createElement('img');
    img.className = 'cover';
    img.src = url;
    return img;
}

export function createAgeRating(rating) {
    const ageRate = document.createElement('p');
    ageRate.className = 'age-rating';
    ageRate.textContent = `Rated: ${rating}`;
    return ageRate;
}

export function createScore(score) {
    const rating = document.createElement('div');
    rating.className = 'rating';

    const starImg = document.createElement('img');
    starImg.className = 'star';
    starImg.src = '../images/star.png';

    const rate = document.createElement('p');
    rate.textContent = `${score} / 10`;
    
    return {
        "Div": rating,
        "Image": starImg,
        "Score": rate
    };
}

export function createMediaType(type) {
    const animeType = document.createElement('p');
    animeType.className = 'type';
    animeType.textContent = `Media Type: ${type}`;
    return animeType;
}

export function createDuration(duration) {
    const animeDuration = document.createElement('p');
    animeDuration.className = "duration";
    animeDuration.textContent = `Duration: ${duration}`;
    return animeDuration;
}

export function createDesc(description) {
    const info = document.createElement('p');
    info.className = 'info';
    info.textContent = `${description}`;
    return info;
}

export function createButtons() {
    const btn = document.createElement('div');
    btn.className = 'btn';

    const blueBtn = document.createElement('button');
    blueBtn.className = 'blue-btn';
    blueBtn.textContent = 'Read Now';

    const blackBtn = document.createElement('button');
    blackBtn.className = 'black-btn';
    blackBtn.textContent = 'Watch Now';

    return {
        "Div": btn,
        "Read": blueBtn,
        "Watch": blackBtn
    };
}

export function createGenres(genres) {
    const genre = document.createElement('p');
    genre.className = 'genre';
    for (let i=0; i < genres.length; i++) {
        genre.textContent += `${genres[i].name}`;
        if (i != genres.length-1) {
            genre.textContent += ", ";
        }
    }
    return genre;
}

export function createTrailer(embed_url) {
    if (embed_url) {
        const row2 = document.createElement('div');
        row2.className = 'row-2';

        const trailer = document.createElement('iframe');
        trailer.className = 'trailer';
        trailer.setAttribute('src', `${embed_url}`);
        
        row2.appendChild(trailer);

        return {
            "Div": row2,
            "Trailer": trailer
        };
    }
}


// BUILD FUNCTIONS
export function buildAnimeList(animes, container) {
    for (let i = 0; i < animes.length; i++) {
        const show = document.createElement('div');
        show.className = "show";

        const img = createCover(animes[i].images.jpg.large_image_url);

        const showInfo = document.createElement('div');
        showInfo.className = 'show-info';

        const title = createTitle(animes[i].title);
        const sub = createEpCount(animes[i].episodes);

        const ratingInfo = createScore(animes[i].score);
        const ratingDiv = ratingInfo.Div;
        const starImg = ratingInfo.Image;
        const rate = ratingInfo.Score;


        ratingDiv.appendChild(starImg);
        ratingDiv.appendChild(rate);

        showInfo.appendChild(title);
        showInfo.appendChild(sub);
        showInfo.appendChild(ratingDiv);

        show.appendChild(img);
        show.appendChild(showInfo);
        
        container.appendChild(show);
    }
}

export function buildGallery(art, container) {
    for (let i = 0; i < art.length; i++) {
        const artBlock = document.createElement("div");
        artBlock.className = "art";

        const img = createCover(findOGArt(art[i].media_asset.variants, "180x180"));
        
        artBlock.appendChild(img);
        container.appendChild(artBlock);
    }
}