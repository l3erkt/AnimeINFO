function updateFont(fontPrimary, fontSecondary, fontName="Default") {
    const fonts = document.getElementById("fonts");
    if (fonts) {
        fontName = (!fontName || fontName == "Default" || fontName == "Poppins") ? "Poppins": fontName;
        fonts.value = fontName;
    }

    var root = document.querySelector(":root"); // grab ':root' from base.css 
    root.style.setProperty('--ff-primary', fontPrimary);
    root.style.setProperty('--ff-secondary', fontSecondary);
}

function loadAnnyang(enabled) {
    const changePage = function(page) {
        if (page.toLowerCase() != "search") {
            window.location.href = `../pages/${page.toLowerCase()}.html`;
        }
    }
    
    if (annyang) {
        // Change button
        const listenButton = document.getElementById("listening");
        if (listenButton) {
            if (enabled) {
                listenButton.style.backgroundColor = "green";
                listenButton.textContent = "Voice Commands (On)";
            } else {
                listenButton.style.backgroundColor = "red";
                listenButton.textContent = "Voice Commands (Off)";
            }
        }

        // Load commands
        const commands = {
            'hello': () => { alert("hello world"); },
            'Navigate to *page': function(page) { changePage(page); }
        }
        annyang.addCommands(commands);
    
        if (enabled) {
            annyang.start();
        }
    }
}

function loadSettings() {
    updateFont(
        sessionStorage.getItem("fontPrimary"),
        sessionStorage.getItem("fontSecondary"),
        sessionStorage.getItem("fontName")
    );
    loadAnnyang(sessionStorage.getItem("voiceEnabled"));
}

window.addEventListener("load", loadSettings);