async function search(e) {
    e.preventDefault();

    // CHANGE TO SEARCH PAGE
    const inputValue = document.getElementById("query").value;
    const searchURL = `../pages/search.html?query=${encodeURIComponent(inputValue)}`;
    window.location.href = searchURL;
}


// Remember to wait for elements to load in
function loadContents() {
    const searchForm = document.getElementById("search_form");
    searchForm.addEventListener("submit", search);
}

window.addEventListener("load", loadContents);