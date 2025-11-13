const container = document.getElementById('container');
const apiUrl = "http://api.anidb.net:9001/httpapi?request=hotanime&client=oniichan&clientver=1&protover=1&aid=1";
const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(apiUrl);



fetch(proxyUrl)
  .then(res => res.json())

  .then(result => {
  
    const xml = new DOMParser().parseFromString(result.contents, "application/xml");
    const animes = [...xml.getElementsByTagName("anime")].map(anime => {
      const obj = {
        id: anime.getAttribute("id"),
        restricted: anime.getAttribute("restricted"),
      };

      for (const child of anime.children) {
        if (child.tagName === "ratings") {
          obj.ratings = {};
          for (const rate of child.children) {
            obj.ratings[rate.tagName] = {
              count: rate.getAttribute("count"),
              value: rate.textContent.trim(),
            };
          }
        } else {
          obj[child.tagName] = child.textContent.trim();
        }
      }
      return obj;
    });

    for (i=0; i<10; i++) {
      const show = document.createElement('div');
      show.className = "show";

      const img = document.createElement('img');
      img.className = 'cover';
      img.src = `https://cdn.anidb.net/images/main/${animes[i].picture}`;

      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      const title = document.createElement('h3');
      title.className = 'title';
      title.textContent = `${animes[i].title.slice(0, 13)}`;

      const sub = document.createElement('p');
      sub.className = 'sub';
      sub.textContent = `${animes[i].episodecount} Episodes`;

      const ratingDiv = document.createElement('div');
      ratingDiv.className = 'rating';

      const starImg = document.createElement('img');
      starImg.className = 'star';
      starImg.src = '../images/star.png';

      const rate = document.createElement('p');
      rate.textContent = `${animes[i].ratings.permanent.value} / 10`;

      ratingDiv.appendChild(starImg);
      ratingDiv.appendChild(rate);

      showInfo.appendChild(title);
      showInfo.appendChild(sub);
      showInfo.appendChild(ratingDiv);

      show.appendChild(img);
      show.appendChild(showInfo);
      
      container.appendChild(show);
      console.log(animes[i]);

    }

    
  })
  .catch(err => console.error("Error:", err));