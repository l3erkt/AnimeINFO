# ANIME INFO

[**Visit The Developer Manual**](#developer-manual)

#### Description
A web application that provides users the ability to acquire foundational information on a variety of anime. Users are greeted with a random featured anime on the home page and can navigate around to look for any shows that meet their preferences. This web application includes a genres section, which lists a ton of featured anime associated with their genre. There is also a popular anime page which shows some of the most popular anime to this day. If there is a specific anime that someone wants to look for, they can use the search bar on the top right corner as well.

#### Target Browsers
- Google Chrome
    - a web browser made by Google
- Firefox
    - a web browser made by Mozilla
- Microsoft Edge
    - a web browser made by Microsoft

#### Deployment
https://l3erkt.github.io/AnimeINFO/pages/home.html


### Developers
- [@l3erkt](https://www.github.com/octokatherine)
- [@smallfrycode](https://github.com/smallfrycode)


 ![Wave](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxwdnp6eWhzZDY4MHczdXFzOHJwcHRzN2szb2t0N3AwanJlNXFtZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eSwGh3YK54JKU/giphy.gif)


## Developer Manual

#### Installing The Application


#### Running The Application On a Server


#### APIs Used
There are 2 APIs used in this application which retrieve both information about anime and art.
##### Jikan
Jikan is used to fetch all information on certain anime shows. There are multiple different types of fetches which you can find listed in the [api_util.js](../js/api_util.js) file. Every link that includes "api.jikan.moe/v4" goes to version 4 of Jikan's API.
- Basic Fetches
    - animeSearch -> the base fetch link for searching, "?sfw" query to only allow safe for work content
    - topAnime -> grabs the most popular anime
- Genre Fetches
    - actionAnime -> only grabs anime under the "action" genre
    - adventureAnime -> only grabs anime under the "adventure" genre
    - comedyAnime -> only grabs anime under the "comedy" genre
    - mysteryAnime -> only grabs anime under the "mystery" genre
    - fantasyAnime -> only grabs anime under the "fantasy" genre
    - horrorAnime -> only grabs anime under the "horror" genre
    - sportsAnime -> only grabs anime under the "sports" genre
    - sliceOfLifeAnime -> only grabs anime under the "Slice Of Life" genre
- Rating Fetches
    - animeG -> only grabs anime rated for everyone
    - animePG -> only grabs anime rated for everyone with parental guidance
    - animePG13 -> only grabs anime rated for 13 or older
    - animeR17 -> only grabs anime rated for 17 or older
##### Danbooru
Danbooru is used to fetch anime art and also has multiple different types of fetches listed in the [api_util.js](../js/api_util.js) file.
- List them here

#### Future Development
If you wish to build upon or make changes to this application, here are some things to note.
##### api_util.js
This is the main api handler that is used to load data from different API endpoints and dynamically build it to the web app.