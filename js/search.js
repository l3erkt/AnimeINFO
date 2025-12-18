function search(givenQuery="") {
    const searchInput = document.getElementById("query");
    const inputValue = (givenQuery) ? givenQuery: searchInput.value;
    const searchURL = `../pages/search.html?query=${encodeURIComponent(inputValue)}`;
    window.location.href = searchURL;
}

// Remember to wait for elements to load in
function loadContents() {
    const searchForm = document.getElementById("search_form");
    searchForm.addEventListener("submit", function(e){
        e.preventDefault();
        search();
    });
}

window.addEventListener("load", loadContents);