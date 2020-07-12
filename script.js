const texto = document.getElementById('texto');
const btnPlay = document.getElementById('btnPlay');
const btnEscuchar = document.getElementById('btnEscuchar');

// let recognition = new SpeechRecognition();
let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResults = false;

let estadoPlay = false;
btnPlay.addEventListener('click', () => {
    if (estadoPlay) {
        recognition.stop();
        estadoPlay = false;
    }
    else {
        recognition.start();
        estadoPlay = true;
    }
})

recognition.onresult = function (event) {
    let results = event.results;
    let transcript = results[event.results.length - 1][0].transcript;
    texto.value += transcript;
}

recognition.onend = (event) => {
    console.log("Se dejo de grabar");
}

recognition.onerror = (event) => {
    console.log(event.error);
}

btnEscuchar.addEventListener('click', () => {
    leerTexto(texto.value)
})

function leerTexto(text) {
    const synthesisUtterance = new SpeechSynthesisUtterance();
    synthesisUtterance.text = text;
    synthesisUtterance.volume = 1;
    synthesisUtterance.rate = 1;
    synthesisUtterance.pitch = 1;
    window.speechSynthesis.speak(synthesisUtterance)
}