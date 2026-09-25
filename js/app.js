// JavaScript de la invitación de boda

const carta = document.getElementById("openInvitation");
const landing = document.getElementById("landing");
const musica = document.getElementById("backgroundMusic");
const botonMusica = document.getElementById("musicToggle");

let musicaApagadaPorUsuario = false;

// --------------------------------------------------
// Actualizar estado visual del botón de música
// --------------------------------------------------

function actualizarBotonMusica() {
    if (!botonMusica || !musica) return;

    if (musica.paused) {
        botonMusica.textContent = "♪";
        botonMusica.setAttribute("aria-label", "Encender música");
        botonMusica.classList.remove("music-playing");
    } else {
        botonMusica.textContent = "♫";
        botonMusica.setAttribute("aria-label", "Apagar música");
        botonMusica.classList.add("music-playing");
    }
}

// --------------------------------------------------
// Intentar reproducir música
// --------------------------------------------------

async function reproducirMusica() {
    if (!musica || musicaApagadaPorUsuario) return;

    try {
        await musica.play();
    } catch {
        // El navegador puede bloquear el autoplay.
        // El clic sobre la carta será una interacción válida
        // para intentar iniciar la reproducción.
    }

    actualizarBotonMusica();
}

// --------------------------------------------------
// Estado inicial
// --------------------------------------------------

if (musica) {
    musica.addEventListener("play", actualizarBotonMusica);
    musica.addEventListener("pause", actualizarBotonMusica);

    // Intento de reproducción automática al cargar.
    reproducirMusica();
}

// --------------------------------------------------
// Apertura de la invitación
// --------------------------------------------------

if (carta && landing) {

    carta.addEventListener("click", async () => {

        // El clic sobre la carta es una interacción directa
        // del usuario y permite intentar iniciar el audio.
        await reproducirMusica();

        // Desbloquear el scroll
        document.body.classList.remove("invitation-locked");
        document.body.classList.add("invitation-unlocked");

        // Efecto de apertura
        landing.classList.add("opening");

        // Ir a la imagen 2
        setTimeout(() => {

            const segundaPagina = document.querySelector(".invitation-page");

            if (segundaPagina) {
                segundaPagina.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }, 450);
    });
}

// --------------------------------------------------
// Botón de música
// --------------------------------------------------

if (botonMusica && musica) {

    botonMusica.addEventListener("click", (evento) => {

        // Evitar que el clic llegue a otros elementos
        evento.stopPropagation();

        if (musica.paused) {

            // El usuario decidió volver a encenderla
            musicaApagadaPorUsuario = false;
            reproducirMusica();

        } else {

            // El usuario decidió apagarla
            musicaApagadaPorUsuario = true;
            musica.pause();

            actualizarBotonMusica();
        }
    });
}


// --------------------------------------------------
// Cuenta regresiva - 18 de diciembre de 2026
// 11:30 a. m.
// --------------------------------------------------

const elementoDias = document.getElementById("days");
const elementoHoras = document.getElementById("hours");
const elementoMinutos = document.getElementById("minutes");
const elementoSegundos = document.getElementById("seconds");

if (
    elementoDias &&
    elementoHoras &&
    elementoMinutos &&
    elementoSegundos
) {

    const fechaBoda = new Date("2026-12-18T11:30:00-05:00").getTime();

    function actualizarCuentaRegresiva() {

        const ahora = Date.now();
        const diferencia = fechaBoda - ahora;

        if (diferencia <= 0) {

            elementoDias.textContent = "00";
            elementoHoras.textContent = "00";
            elementoMinutos.textContent = "00";
            elementoSegundos.textContent = "00";

            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );
        const minutos = Math.floor(
            (diferencia / (1000 * 60)) % 60
        );
        const segundos = Math.floor(
            (diferencia / 1000) % 60
        );

        elementoDias.textContent = String(dias).padStart(2, "0");
        elementoHoras.textContent = String(horas).padStart(2, "0");
        elementoMinutos.textContent = String(minutos).padStart(2, "0");
        elementoSegundos.textContent = String(segundos).padStart(2, "0");
    }

    actualizarCuentaRegresiva();

    setInterval(actualizarCuentaRegresiva, 1000);
}
