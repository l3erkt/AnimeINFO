const API = "";

function search(e) {
    e.preventDefault();

    // go to search page
    const inputValue = document.getElementById("query").value;
    const newUrl = `../pages/search.html?query=${encodeURIComponent(inputValue)}`;
    window.location.href = newUrl;

    // Implement fetch here


    // 
}


// Remember to wait for elements to load in
function loadContents() {
    const searchForm = document.getElementById("search_form");
    searchForm.addEventListener("submit", search);
}

window.addEventListener("load", loadContents);