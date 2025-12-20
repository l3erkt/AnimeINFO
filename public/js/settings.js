function loadVoiceButtons() {
    const listenButton = document.getElementById("listening");
    const fontButton = document.getElementById("change_font");
    const themeButton = document.getElementById("change_theme");
    const clearButton = document.getElementById("clear");
    const fonts = document.getElementById("fonts");
    const theme = document.getElementById("theme");

    listenButton.addEventListener("click", enableAnnyang);
    fontButton.addEventListener("click", function() {
        updateSettings("font", fonts.value);
        updateFont();
    });
    themeButton.addEventListener("click", function() {
        updateSettings("theme", theme.value);
        updateTheme();
    });
    clearButton.addEventListener("click", resetSettings);
}

window.addEventListener("load", loadVoiceButtons);


async function loadUserData(){
    console.log("Working on loading user data");
}