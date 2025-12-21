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

#### Cloning The Repository
To install this application, you will have to fetch the files by cloning into the repository.

1. Make sure you have a GitHub account (optional)
2. Make sure you have [Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
3. Run the following command to clone the repository: `git clone <https://github.com/l3erkt/AnimeINFO.git>`

#### Deploying to Vercel
Once you have the repository cloned to your local machine and have made your changes, you will need to create a Vercel account and deploy your web app.

1. Create your own repository on GitHub for your web application and push the changes
2. Create an account on [Vercel](https://vercel.com/)
3. Create a new project
4. Add your repository to the project and include your environmental variables
    - This usually consists of private API keys, Supabase URLs, etc.
5. Deploy the project


### Running The Application On a Server

#### Setting Up NVM
In order to run this application on a server you will need to install nvm and Node.js.

1. Install the [nvm setup](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/#:~:text=How%20to%20Install%20NVM%20on%20Windows)
2. Walk through the set up process
3. Make sure that you properly installed it by running the command `nvm -v` in your terminal
4. Run the command `nvm install node` to install Node.js
5. Make sure you have node by running the command `node -v`
6. Run the command `nvm use node` so nvm uses Node.js

#### Creating Your Server
Once node is installed, you will need to create the necessary files to properly run your server.

1. Open Visual Studio Code
2. Go to the directory you want to work in (GitHub repository)
3. Go to the [package.json](../package.json) file and change the name, directories, and any other information you choose
4. Create a `.env` file, so you can test your web app locally
    - These are the environmental variables you made in Vercel
5. Run the server by typing `node index.js` into your Visual Studio Code terminal
6. Go to `localhost:3000` to visit your web page locally
7. You can see any messages in the terminal for your server, and in the console on the web page for your client
8. Press `ctrl + c` to close the server


### APIs Used
There are 2 APIs used in this application which retrieve both information about anime and art.
#### Jikan
Jikan is used to fetch all information on certain anime shows. There are multiple different types of fetches which you can find listed in the [api_util.mjs](../js/api_util.mjs) file. Every link that includes "api.jikan.moe/v4" goes to version 4 of Jikan's API.
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
Danbooru is used to fetch anime art, however all art is fetched through the server to keep your API key private (all art is filtered by the [general rating](https://danbooru.donmai.us/wiki_pages/api%3Aposts#:~:text=rating,s%2C%20q%2C%20e%5D)).

##### Core Fetch Function
`fetchArt(query = "", single_post = false)`
- Calls the backend endpoint /api/getDanbooruData
- `query` is a search query you can choose to include
    - Leave empty for no query
    - Example: `query = "Rimuru Tempest"` for art that showcases Rimuru
- `single_post` is whether you are trying to retrieve a specific post
    - Leave empty to grab multiple images
    - If single_post is set to true, then `query` must have the [Danbooru image ID](https://danbooru.donmai.us/wiki_pages/api%3Aposts#:~:text=regular%20post%20search.-,Show,-Returns%20a%20single)
    - Example: `query = "9043596"` and `single_post = true` for a specific Rimuru drawing

##### Fetch Random Art
`fetchRandomArt(query = "")`
- Wrapper around fetchArt
- Fetches multiple posts and returns one random artwork
- `query` rules are the same as the core function

##### Find Original Art
`findOGArt(artData, size = "original")`
- Extracts the correct image URL from a Danbooru post
- Falls back to artData.source if variants don’t exist
- `artData` is one item from the array that `fetchArt()` returned
- `size` allows you to extract different resolutions
    - "180x180"
    - "360x360"
    - "720x720"
    - "original"

##### SUMMARY:
`fetchArt()` — fetch Danbooru art by tag or single post
`fetchRandomArt()` — fetch a random Danbooru artwork
`findOGArt()` — retrieve the correct Danbooru image URL (helper)

### Future Development
If you wish to build upon or make changes to this application, here are some things to note.
#### api_util.mjs
This is the main api handler that is used to load data from different API endpoints and dynamically build it to the web app. It is highly recommended that you use this script for fetching APIs to prevent excess fetch calls.
- To use api_util.mjs in another script
    1. Add this to the top of your script:
        `import * as apiUtil from "./api_util.mjs";`
    2. In any html file that refers to your script, import it as a module:
        `<script type="module" src="my_script.mjs"></script>`
    3. To use any function or variable write "apiUtil." followed by its name
        `apiUtil.fetchAnime(([apiUtil.animeG, apiUtil.animePG, apiUtil.animePG13, apiUtil.animeR17]))`
- If you want to add an API link
    1. Create a new constant variable in [api_util.mjs](../js/api_util.mjs)
    2. Make sure to include the `export` keyword before you declare your variable. This is to make sure that the variable is public to any scripts that import api_util.mjs
- If you want to add a new function
    1. Create a new function in [api_util.mjs](../js/api_util.mjs)
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
- Add more settings