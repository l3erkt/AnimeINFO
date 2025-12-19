const fontOptions = {
    // Default font style
    "default": [
        "'Poppins', sans-serif", // primary font
        "'Mulish', sans-serif" // secondary font
    ],
    "poppins": [
        "'Poppins', sans-serif",
        "'Mulish', sans-serif"
    ],

    // Other font styles
    "courier": [
        "'Courier New', monospace",
        "'Courier', monospace"
    ],
    "franklin gothic": [
        "'Franklin Gothic Medium', sans-serif",
        "'Arial Narrow', sans-serif"
    ],
    "grill sans": [
        "'Gill Sans', sans-serif",
        "'Gill Sans MT', sans-serif"
    ],
    "lucida sans": [
        "'Lucida Sans', sans-serif",
        "'Geneva', sans-serif"
    ],
    "segoe ui": [
        "'Segoe UI', sans-serif",
        "'Tahoma', sans-serif"
    ],
    "times new roman": [
        "'Times New Roman', serif",
        "'Times', serif"
    ],
    "impact": [
        "'Impact', sans-serif",
        "'Arial Narrow Bold', sans-serif"
    ],
    "verdana": [
        "'Verdana', sans-serif",
        "'Tahoma', sans-serif"
    ]
}

const themeOptions = {
    // Default Themes
    "default": [
        "linear-gradient(#111315, #202020)", // main bkg
        "#111315", // secondary bkg
        "#1e1f21", // box bkg
        "#d9d9d9", // primary color
        "#b2b2b2", // secondary color
        "#87cefa", // alternative color
    ],
    "dark": [
        "linear-gradient(#111315, #202020)",
        "#111315",
        "#1e1f21",
        "#d9d9d9",
        "#b2b2b2",
        "#87cefa",
    ],

    // Other Themes
    "light": [
        "linear-gradient(#b6bfc8ff, #ece8e8ff)",
        "#b6bfc8ff",
        "#a6a9afff",
        "#363636ff",
        "#1b1b1bff",
        "#3054d7ff",
    ]
}



function updateFont() {
    // variables
    let fontPrimary = (localStorage.getItem("fontPrimary")) ? localStorage.getItem("fontPrimary"): fontOptions["default"][0];
    let fontSecondary = (localStorage.getItem("fontSecondary")) ? localStorage.getItem("fontSecondary"): fontOptions["default"][1];

    // check for setting element
    const fonts = document.getElementById("fonts");
    if (fonts) {
        fonts.value = (localStorage.getItem("fontName") && localStorage.getItem("fontName") != "default") ? localStorage.getItem("fontName"): "poppins";
    }

    // change settings
    var root = document.querySelector(":root"); // grab ':root' from base.css 
    root.style.setProperty('--ff-primary', fontPrimary);
    root.style.setProperty('--ff-secondary', fontSecondary);
}


function updateTheme() {
    // variables
    let themeBkgPrimary = (localStorage.getItem("themeBkgPrimary")) ? localStorage.getItem("themeBkgPrimary"): themeOptions["default"][0];
    let themeBkgSecondary = (localStorage.getItem("themeBkgSecondary")) ? localStorage.getItem("themeBkgSecondary"): themeOptions["default"][1];
    let themeBkgBox = (localStorage.getItem("themeBkgBox")) ? localStorage.getItem("themeBkgBox"): themeOptions["default"][2];
    let themePrimary = (localStorage.getItem("themePrimary")) ? localStorage.getItem("themePrimary"): themeOptions["default"][3];
    let themeSecondary = (localStorage.getItem("themeSecondary")) ? localStorage.getItem("themeSecondary"): themeOptions["default"][4];
    let themeAlt = (localStorage.getItem("themeAlt")) ? localStorage.getItem("themeAlt"): themeOptions["default"][5];

    // check for setting element
    const theme = document.getElementById("theme");
    if (theme) {
        theme.value = (localStorage.getItem("themeName")  && localStorage.getItem("themeName") != "default") ? localStorage.getItem("themeName"): "dark";
    }

    // change settings
    var root = document.querySelector(":root");
    root.style.setProperty('--bkg-linear-gradient-primary', themeBkgPrimary);
    root.style.setProperty('--bkg-secondary-color', themeBkgSecondary);
    root.style.setProperty('--bkg-box-color', themeBkgBox);
    root.style.setProperty('--primary-color', themePrimary);
    root.style.setProperty('--secondary-color', themeSecondary);
    root.style.setProperty('--blue-color', themeAlt);
}

function enableAnnyang() {
    const listenButton = document.getElementById("listening");

    if (localStorage.getItem("voiceEnabled")) {
        if (listenButton) {
            listenButton.textContent = "Turn On";
            listenButton.style.backgroundColor = "green";
        }
        localStorage.removeItem("voiceEnabled");
        annyang.abort();
    } else {
        if (listenButton) {
            listenButton.textContent = "Turn Off";
            listenButton.style.backgroundColor = "red";
        }
        localStorage.setItem("voiceEnabled", true);
        annyang.start();
    }
}

function loadAnnyang() {
    let enabled = (localStorage.getItem("voiceEnabled")) ? localStorage.getItem("voiceEnabled"): false;

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
                listenButton.style.backgroundColor = "red";
                listenButton.textContent = "Turn Off";
            } else {
                listenButton.style.backgroundColor = "green";
                listenButton.textContent = "Turn On";
            }
        }

        // Load commands
        const commands = {
            'Navigate to *page': function(page) { changePage(page); },
            'Search for *query': function(query) { search(query); },
            'Disable voice commands': () => { enableAnnyang(); },
            'Change font to *fontType': function(fontType) { 
                updateSettings("font", fontType.toLowerCase());
                updateFont(); 
            },
            'Change theme to *themeType': function(themeType) { 
                updateSettings("theme", themeType.toLowerCase());
                updateTheme();
            },
            'Clear settings': () => { resetSettings(); }
        }
        annyang.addCommands(commands);
    
        if (enabled) {
            annyang.start();
        }
    }
}

function updateSettings(setting, value) {
    console.log(setting, value);
    if (setting.toLowerCase() == "font") {
        localStorage.setItem("fontPrimary", fontOptions[value][0]);
        localStorage.setItem("fontSecondary", fontOptions[value][1]);
        localStorage.setItem("fontName", value);
    } else if (setting.toLowerCase() == "theme") {
        localStorage.setItem("themeBkgPrimary", themeOptions[value][0]);
        localStorage.setItem("themeBkgSecondary", themeOptions[value][1]);
        localStorage.setItem("themeBkgBox", themeOptions[value][2]);
        localStorage.setItem("themePrimary", themeOptions[value][3]);
        localStorage.setItem("themeSecondary", themeOptions[value][4]);
        localStorage.setItem("themeAlt", themeOptions[value][5]);
        localStorage.setItem("themeName", value);
    } else {
        console.log("Setting does not exist: ", setting);
    }
}

function resetSettings() {
    localStorage.clear();
    if (localStorage.getItem("voiceEnabled")) {
        enableAnnyang();
    }
    updateFont();
    updateTheme();
}

function loadSettings() {
    updateFont();
    updateTheme();
    loadAnnyang();
}

window.addEventListener("load", loadSettings);