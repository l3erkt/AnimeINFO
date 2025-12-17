const FontOptions = {
    // Default font style
    "Default": [
        "'Poppins', sans-serif",
        "'Mulish', sans-serif"
    ],
    "Poppins": [
        "'Poppins', sans-serif",
        "'Mulish', sans-serif"
    ],

    // Other font styles
    "Courier": [
        "'Courier New', monospace",
        "'Courier', monospace"
    ],
    "Franklin Gothic": [
        "'Franklin Gothic Medium', sans-serif",
        "'Arial Narrow', sans-serif"
    ],
    "Grill Sans": [
        "'Gill Sans', sans-serif",
        "'Gill Sans MT', sans-serif"
    ],
    "Lucida Sans": [
        "'Lucida Sans', sans-serif",
        "'Geneva', sans-serif"
    ],
    "Segoe UI": [
        "'Segoe UI', sans-serif",
        "'Tahoma', sans-serif"
    ],
    "Times New Roman": [
        "'Times New Roman', serif",
        "'Times', serif"
    ],
    "Impact": [
        "'Impact', sans-serif",
        "'Arial Narrow Bold', sans-serif"
    ],
    "Verdana": [
        "'Verdana', sans-serif",
        "'Tahoma', sans-serif"
    ]
}


function voiceCommands() {
    const listenButton = document.getElementById("listening");

    if (sessionStorage.getItem("voiceEnabled")) {
        listenButton.textContent = "Voice Commands (Off)";
        listenButton.style.backgroundColor = "red";
        sessionStorage.removeItem("voiceEnabled");
        annyang.abort();
    } else {
        listenButton.textContent = "Voice Commands (On)";
        listenButton.style.backgroundColor = "green";
        sessionStorage.setItem("voiceEnabled", true);
        annyang.start();
    }
}

function loadVoiceButtons() {
    var root = document.querySelector(":root"); // grab ':root' from base.css 
    const listenButton = document.getElementById("listening");
    const fontButton = document.getElementById("change_font");
    const fonts = document.getElementById("fonts");

    listenButton.addEventListener("click", voiceCommands);
    fontButton.addEventListener("click", function() {
        // save settings
        sessionStorage.setItem("fontPrimary", FontOptions[fonts.value][0]);
        sessionStorage.setItem("fontSecondary", FontOptions[fonts.value][1]);
        sessionStorage.setItem("fontName", fonts.value);

        // change font
        root.style.setProperty('--ff-primary', FontOptions[fonts.value][0]);
        root.style.setProperty('--ff-secondary', FontOptions[fonts.value][1]);
    });
}

window.addEventListener("load", loadVoiceButtons);