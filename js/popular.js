const topAnime = `https://api.jikan.moe/v4/top/anime`;
const container = document.getElementById('container');


fetch(topAnime)
  .then(res => res.json())
  .then(animes => {

    for (i=0; i<animes.data.length; i++) {
      const show = document.createElement('div');
      show.className = "show";

      const img = document.createElement('img');
      img.className = 'cover';
      img.src = `${animes.data[i].images.jpg.large_image_url}`;

      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      const title = document.createElement('h3');
      title.className = 'title';
      title.textContent = `${animes.data[i].title}`;

      const sub = document.createElement('p');
      sub.className = 'sub';
      sub.textContent = `Episode ${animes.data[i].episodes}`;

      const ratingDiv = document.createElement('div');
      ratingDiv.className = 'rating';

      const starImg = document.createElement('img');
      starImg.className = 'star';
      starImg.src = '../images/star.png';

      const rate = document.createElement('p');
      rate.textContent = `${animes.data[i].score} / 10`;

      ratingDiv.appendChild(starImg);
      ratingDiv.appendChild(rate);

      showInfo.appendChild(title);
      showInfo.appendChild(sub);
      showInfo.appendChild(ratingDiv);

      show.appendChild(img);
      show.appendChild(showInfo);
      
      container.appendChild(show);
    }
  })