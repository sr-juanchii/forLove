// ===================== VARIABLES GLOBALES =====================

let maxClicks = 9; // Máximo de clics permitidos inicialmente
let clicks = 0; // Contador de clics realizados
let timeoutId = null; // ID del temporizador para reiniciar el progreso
let reachedMaxCount = 0; // Veces que se llegó al máximo de clics
let isBlocked = false; // Indica si el clic está bloqueado

const progressBar = document.getElementById('progressBar'); // Barra de progreso
const heartContainer = document.getElementById('heart-container'); // Contenedor de corazones
const enlace = document.getElementById('enlaceCorazones'); // Enlace de corazones
const heartImage = document.getElementById('imgCorazon'); // Imagen de corazón base
const numCorazones = 6; // Número de corazones a mostrar
const resetDelay = 500; // Tiempo de espera antes de reiniciar (ms)
const fechaInicio = new Date('2022-02-24T00:00:00'); // Cambia la fecha a la que desees

// ===================== FUNCIONES DE UTILIDAD =====================

// Función para reiniciar el progreso
function resetProgress() {
    clicks = 0; // Reinicia el contador de clics
    progressBar.style.width = '0%'; // Reinicia la barra de progreso
}

// Función para mostrar un popup personalizado
function showCustomPopup(message) {
    if (document.getElementById('customPopup')) return; // Evita mostrar más de un popup

    const popupBg = document.createElement('div'); // Crea el fondo del popup
    popupBg.id = 'customPopup'; // Asigna un id al fondo del popup
    Object.assign(popupBg.style, {
        position: 'fixed', // Posición fija
        top: 0, // Arriba
        left: 0, // Izquierda
        width: '100vw', // Ancho total de la ventana
        height: '100vh', // Alto total de la ventana
        background: 'rgba(0,0,0,0.5)', // Fondo semitransparente
        display: 'flex', // Usa flexbox
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        zIndex: 1000 // Superpone el popup
    });

    const popupBox = document.createElement('div'); // Crea la caja del popup
    Object.assign(popupBox.style, {
        background: 'white', // Fondo blanco
        padding: '2em', // Espaciado interno
        borderRadius: '10px', // Bordes redondeados
        textAlign: 'center', // Texto centrado
        boxShadow: '0 2px 16px rgba(0,0,0,0.3)' // Sombra
    });

    const msg = document.createElement('p'); // Crea el elemento de mensaje
    msg.textContent = message; // Asigna el mensaje

    const btn = document.createElement('button'); // Crea el botón de cerrar
    btn.textContent = 'Cerrar'; // Texto del botón
    btn.style.marginTop = '1em'; // Margen superior
    btn.onclick = () => popupBg.remove(); // Elimina el popup al hacer clic

    popupBox.appendChild(msg); // Agrega el mensaje a la caja
    popupBox.appendChild(btn); // Agrega el botón a la caja
    popupBg.appendChild(popupBox); // Agrega la caja al fondo
    document.body.appendChild(popupBg); // Agrega el fondo al body
}

function tiempoTranscurrido(fechaInicio) {
    const ahora = new Date();
    let años = ahora.getFullYear() - fechaInicio.getFullYear();
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    let dias = ahora.getDate() - fechaInicio.getDate();
    let horas = ahora.getHours() - fechaInicio.getHours();
    let minutos = ahora.getMinutes() - fechaInicio.getMinutes();
    let segundos = ahora.getSeconds() - fechaInicio.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        // Ajusta los días según el mes anterior
        const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
        dias += mesAnterior.getDate();
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        años--;
    }

    return `${años} años, ${meses} meses, ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
}

// ===================== EVENTOS PRINCIPALES =====================

// Evento al cargar el DOM
document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté listo
    // Evento click en el enlace de corazones
    enlace.addEventListener('click', (evento) => { // Maneja el clic en el enlace
        evento.preventDefault(); // Previene el comportamiento por defecto
        if (isBlocked) return; // Si está bloqueado, no hace nada

        console.log(`Clicks realizados: ${clicks}`); // Muestra los clics en consola

        // ===================== ANIMACIÓN DE CORAZONES =====================
        for (let i = 0; i < numCorazones; i++) { // Repite para cada corazón
            const heart = document.createElement('img'); // Crea la imagen del corazón
            heart.classList.add('heart'); // Agrega la clase 'heart'
            heart.src = heartImage.src; // Usa la imagen base
            heart.alt = 'Corazón flotante'; // Texto alternativo

            Object.assign(heart.style, {
                left: `${Math.random() * 100}%`, // Posición horizontal aleatoria
                top: `${Math.random() * 100}%`, // Posición vertical aleatoria
                position: 'absolute', // Posición absoluta
                animationDelay: `${Math.random() * 1.5}s`, // Retardo de animación aleatorio
                animationDuration: `${3 + Math.random() * 2}s`, // Duración de animación aleatoria
                width: `${20 + Math.random() * 30}px`, // Ancho aleatorio
                height: 'auto' // Altura automática
            });

            heartContainer.appendChild(heart); // Agrega el corazón al contenedor
            heart.addEventListener('animationend', () => heart.remove()); // Elimina el corazón al terminar la animación
        }

        // ===================== LÓGICA DE PROGRESO Y POPUPS =====================
        clicks++; // Incrementa el contador de clics
        const percent = (clicks / maxClicks) * 100; // Calcula el porcentaje de progreso
        progressBar.style.width = percent + '%'; // Actualiza la barra de progreso

        if (clicks >= maxClicks) { // Si se alcanza el máximo de clics
            isBlocked = true; // Bloquea más clics
            reachedMaxCount++; // Incrementa el contador de máximos alcanzados

            if (reachedMaxCount === 1) { // Primer máximo alcanzado
                showCustomPopup('Gracias, Gracias por estar en mi vida, millones de gracias por que este conmigo jsjs, te amo con todititititito mi coarazon, si gue tocando la pantalla'); // Muestra el primer mensaje
            } else if (reachedMaxCount === 2) { // Segundo máximo alcanzado
                const tiempo = tiempoTranscurrido(fechaInicio);
                showCustomPopup(`Hoy tenemos ${tiempo} juntos ❤️ donde me haces la persona más feliz del mundo, gracias por cada momento, por cada risa, por cada abrazo, por cada beso, por cada palabra de aliento, por cada mirada, por cada locura que hacemos juntos, por cada aventura que vivimos juntos, por cada día que pasamos juntos, por cada segundo que pasamos juntos. Te amo con todo mi corazón ❤️`); // Muestra el segundo mensaje
            }
            else if (reachedMaxCount === 3) { // Tercer máximo alcanzado
                showCustomPopup('Te adoro, me encanta, te deseo, te extraño, tantas cosas por ti, y esta fue la manera que se me ocurrio para demostrarte lo que siento, poniendo en practica todo lo que me quiero dedicar, pero haciendolo hacia ti como mi fuente de inspiracion, mi fuente para seguir y hacer cosas mejores de adoro mucho mi princesa hermosa ❤️'); // Muestra el tercer mensaje
                reachedMaxCount = 0; // Reinicia el contador de máximos alcanzados
            }

            setTimeout(() => { // Espera antes de reiniciar
                resetProgress(); // Reinicia el progreso
                maxClicks *= 2; // Duplica el máximo de clics
                isBlocked = false; // Desbloquea los clics
            }, 500);

        } else {
            clearTimeout(timeoutId); // Limpia el temporizador anterior
            timeoutId = setTimeout(() => { // Inicia un nuevo temporizador
                resetProgress(); // Reinicia el progreso si no hay más clics
            }, resetDelay);
        }
    });
});
