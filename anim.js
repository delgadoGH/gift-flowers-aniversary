// Sincronizar las letras con el fragmento de la canción (2:35 a 3:22)
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de letras con los segundos reales dentro de la canción (desde 155 en adelante)
var lyricsData = [
  { text: "But here I am, baby. Here I am, baby.", time: 156 },
  { text: "What's on your mind?", time: 162 },
  { text: "If you want it, girl, come and get it.", time: 166 },
  { text: "All this is here for you.", time: 169 },
  { text: "Tell me baby, tell me, tell me baby", time: 173 },
  { text: "what you tryna do?", time: 175 },
  { text: "Gold jewelry shining so bright.", time: 179 },
  { text: "Strawberry champagne on ice", time: 182 },
  { text: "Lucky for you,That's what I like.", time: 184 },
  { text: "That's what I like.", time: 186 },
  { text: "Lucky for you,That's what I like.", time: 188 },
  { text: "That's what I like.", time: 190 },
  { text: "Sex by the fire at night", time: 193 },
  { text: "Silk sheets and diamonds all white", time: 195 },
  { text: "Sex by the fire at night", time: 197 },
  { text: "Lucky for you,That's what I like.", time: 199 },
  { text: "That's what I like.", time: 203 },
  { text: "Lucky for you,That's what I like.", time: 206 },
  { text: "That's what I like.", time: 209 },

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
