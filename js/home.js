const animeSearch = `https://api.jikan.moe/v4/anime?sfw=${encodeURIComponent(true)}`;
const container = document.getElementById('container')


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function loadRandomAnime() {
    const container = document.getElementById('container');

    fetch(animeSearch)
        .then(res => res.json())
        .then(animes => {
            const chosenAnime = animes.data[getRandomInt(animes.data.length)]
            console.log(chosenAnime);

            const row1 = document.createElement('section')
            row1.className = 'row-1'

            const col1 = document.createElement('div')
            col1.className = 'col-1'

            const genre = document.createElement('p')
            genre.className = 'genre'
            for (let i=0; i < chosenAnime.genres.length; i++) {
                genre.textContent += `${chosenAnime.genres[i]}, `
            }

            const title = document.createElement('h1')
            title.className = 'title'
            title.textContent = `${chosenAnime.title}`

            const info = document.createElement('p')
            info.className = 'info'
            info.textContent = `${chosenAnime.synopsis}`

            const idk = document.createElement('div')
            idk.className = 'idk'

            const btn = document.createElement('div')
            btn.className = 'btn'
            const blueBtn = document.createElement('button')
            blueBtn.className = 'blue-btn'
            blueBtn.textContent = 'Read Now'
            const blackBtn = document.createElement('button')
            blackBtn.className = 'black-btn'
            blackBtn.textContent = 'Watch Now'

            const rating = document.createElement('div')
            rating.className = 'rating'
            const star = document.createElement('img')
            star.className = 'star'
            star.src = '../images/star.png'
            const score = document.createElement('p')
            score.className = 'rate'
            score.textContent = `${chosenAnime.score} / 10`

            const cover = document.createElement('img')
            cover.className = 'cover'
            cover.src = `${chosenAnime.images.jpg.large_image_url}`

            btn.appendChild(blueBtn)
            btn.appendChild(blackBtn)
            rating.appendChild(star)
            rating.appendChild(score)
            idk.appendChild(btn)
            idk.appendChild(rating)

            col1.appendChild(genre)
            col1.appendChild(title)
            col1.appendChild(info)
            col1.appendChild(idk)

            row1.appendChild(col1)
            row1.appendChild(cover)

            container.appendChild(row1)

            // Trailer
            if (chosenAnime.trailer.embed_url) {
                const row2 = document.createElement('div');
                row2.className = 'row-2'
                const trailer = document.createElement('iframe');
                trailer.className = 'trailer';

                trailer.setAttribute('src', `${chosenAnime.trailer.embed_url}`);

                row2.appendChild(trailer)
                container.appendChild(row2)
            }
    });
}

window.addEventListener("load", loadRandomAnime);