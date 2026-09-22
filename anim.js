// Sincronizar las letras con el fragmento de la canción (2:35 a 3:22)
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de letras con los segundos reales dentro de la canción (desde 155 en adelante)
var lyricsData = [
  { text: "But here I am, baby. Here I am, baby.", time: 156 },
  { text: "What's on your mind?", time: 162 },
  { text: "If you want it, girl, come and get it.", time: 166 },
  { text: "This is here for you.", time: 169 },
  { text: "Tell me baby, tell me, tell me baby, what you trying to do?", time: 173 },
  { text: "Shining bright. Strawberry champagne for you.", time: 177 },
  { text: "That's what I like. That's what I like.", time: 181 },
  { text: "That's what I like by the fire and diamonds.", time: 186 },
  { text: "I like it. That's why I like it.", time: 192 }
];

// Animar las letras
function updateLyrics() {
  var time = audio.currentTime;
  
  // Si la canción llega al segundo 203, la devolvemos al inicio del fragmento (segundo 155)
  if (time >= 203) {
    audio.currentTime = 155;
    return;
  }

  // Buscar la línea actual según el tiempo real del audio
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 4
  );

  if (currentLine) {
    var fadeInDuration = 0.2;
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

// Comprobar el tiempo de manera fluida cada 200 milisegundos
setInterval(updateLyrics, 200);

// Función para ocultar el título inicial
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }
}

setTimeout(ocultarTitulo, 10000);
