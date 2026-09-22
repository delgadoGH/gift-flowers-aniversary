// Sincronizar las letras con la canción de Bruno Mars
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos con cada línea y su segundo exacto de aparición
var lyricsData = [

  { text: "Jump in the Cadillac", time: 35 },
  { text: "Girl, let's put some miles on it", time: 35.5 },
  { text: "Anything you want just to put a smile on it", time: 37 },
  { text: "You deserve it, baby, you deserve it", time: 40 },
  { text: "And I'm going to give it to you", time: 44 },
  { text: "Cool jewelry shine, it's so bright", time: 45 },
  { text: "Strawberry champagne", time: 45 },
  { text: "Lucky for you, that's what I like", time: 47 },
  { text: "That's what I like", time: 49 },
  { text: "Lucky for you, that's what I like", time: 52 },
  { text: "That's what I like", time: 55 },
  
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    var fadeInDuration = 0.1;
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

// Función para ocultar el título (duración ajustada a la canción, ej. 211 segundos)
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

setTimeout(ocultarTitulo, 211000);
