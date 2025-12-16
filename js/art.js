import * as apiUtil from "./api_util.js";

async function loadArt() {
    const container = document.getElementById("gallery");

    let result = await apiUtil.fetchArt("Rimuru_tempest");
    console.log(result);

    apiUtil.buildGallery(result, container);
}

window.addEventListener("load", loadArt);