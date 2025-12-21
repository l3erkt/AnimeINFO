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
https://anime-info-iota.vercel.app/pages/home.html


### Developers
- [@l3erkt](https://github.com/l3erkt)
- [@smallfrycode](https://github.com/smallfrycode)


 ![Wave](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxwdnp6eWhzZDY4MHczdXFzOHJwcHRzN2szb2t0N3AwanJlNXFtZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eSwGh3YK54JKU/giphy.gif)


## Developer Manual

### Installing The Application
To install this application, you will have to fetch the files through...

git clone <https://github.com/l3erkt/AnimeINFO.git>


### Running The Application On a Server
In order to run this application on a server...


### APIs Used
There are 2 APIs used in this application which retrieve both information about anime and art.
#### Jikan
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
#### Danbooru
Danbooru is used to fetch anime art and also has multiple different types of fetches listed in the [api_util.js](../js/api_util.js) file.
- List them here

Core Danbooru fetch function
fetchArt(query = "", single_post = false)
Calls the backend endpoint /api/getDanbooruData

Tag-based searches (tag=${query})
Single-post fetches (single_post=true/false)
Returns an array of Danbooru post objects

fetchRandomArt(query = "")
Wrapper around fetchArt
Fetches multiple posts and returns one random artwork
Used for randomized art display (e.g., homepage or featured art)


findOGArt(artData, size = "original")
Extracts the correct image URL from a Danbooru post
Falls back to artData.source if variants don’t exist


                    SUMMARY:
fetchArt() — fetch Danbooru art by tag or single post
fetchRandomArt() — fetch a random Danbooru artwork
findOGArt() — retrieve the correct Danbooru image URL (helper)

### Future Development
If you wish to build upon or make changes to this application, here are some things to note.
#### api_util.js
This is the main api handler that is used to load data from different API endpoints and dynamically build it to the web app. It is highly recommended that you use this script for fetching APIs to prevent excess fetch calls.
- To use api_util.js in another script
    1. Add this to the top of your script:
        `import * as apiUtil from "./api_util.js";`
    2. In any html file that refers to your script, import it as a module:
        `<script type="module" src="my_script.js"></script>`
    3. To use any function or variable write "apiUtil." followed by its name
        `apiUtil.fetchAnime(([apiUtil.animeG, apiUtil.animePG, apiUtil.animePG13, apiUtil.animeR17]))`
- If you want to add an API link
    1. Create a new constant variable in [api_util.js](../js/api_util.js)
    2. Make sure to include the `export` keyword before you declare your variable. This is to make sure that the variable is public to any scripts that import api_util.js
- If you want to add a new function
    1. Create a new function in [api_util.js](../js/api_util.js)
    2. Include the `export` keyword just like you would when adding an API link
- DO NOT remove the wait functions in `fetchAnime()`, these are here to prevent excess fetch calls!
#### Road Map
There are many things which could be done in order to further build upon this web application. Here are a few ideas moving forward:
- Further improve Aesthetics
- Decrease loading time
    - Load by chunks
    - Don't load what the user does not see
- Load a specific anime in more detail when clicked on
- Add search filters
- Add sorting