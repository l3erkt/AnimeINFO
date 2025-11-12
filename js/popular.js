api = `http://api.anidb.net:9001/httpapi?request=hotanime&client=oniichan&clientver=1&protover=1&aid=1`

fetch(api)
  .then(res => res.text())
  .then(data => {

    const xml = new DOMParser().parseFromString(data, "application/xml");
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

    console.log(animes);
  })
  .catch(err => console.error("Error:", err));