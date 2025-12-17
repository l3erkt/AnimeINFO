import * as apiUtil from "./api_util.js";

async function loadArt() {
    const container = document.getElementById("gallery");
    let result = await apiUtil.fetchRandomArt("Rimuru_tempest");
    apiUtil.buildGallery([result], container);
}

window.addEventListener("load", loadArt);