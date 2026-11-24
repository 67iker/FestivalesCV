const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");

// Páginas permitidas
const paginasPermitidas = [
    "dashboard",
    "clientes",
    "eventos",
    "presupuestos",
    "calendario"
];

// Cargar el sidebar
async function cargarSidebar() {
    const respuesta = await fetch("./sidebar.html");

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar sidebar.html");
    }

    sidebar.innerHTML = await respuesta.text();
}

// Obtener la ruta de una página
function obtenerRutaPagina(pagina) {
    return `./pages/${pagina}.html`;
}

// Actualizar el enlace activo
function actualizarMenuActivo(pagina) {
    sidebar.querySelectorAll("a[data-page]").forEach(enlace => {
        enlace.classList.toggle(
            "sidebar__item--active",
            enlace.dataset.page === pagina
        );
    });
}

// Cargar una página
async function cargarPagina(pagina, actualizarHistorial = true) {
    if (!paginasPermitidas.includes(pagina)) {
        return;
    }

    try {
        const respuesta = await fetch(obtenerRutaPagina(pagina));

        if (!respuesta.ok) {
            throw new Error(
                `Error ${respuesta.status}: ${obtenerRutaPagina(pagina)}`
            );
        }

        const html = await respuesta.text();

        // Insertar el contenido
        main.innerHTML = html;

        // Actualizar el menú activo
        actualizarMenuActivo(pagina);

        // Mantener la URL principal para evitar romper
        // las rutas relativas del sidebar y de los recursos
        if (actualizarHistorial) {
            history.pushState(
                { pagina: pagina },
                "",
                `./index.html?pagina=${pagina}`
            );
        }

        // Inicializar los scripts específicos de la página
        if (typeof window.inicializarPagina === "function") {
            window.inicializarPagina(pagina);
        }

    } catch (error) {
        console.error("Error al cargar la página:", error);
        main.innerHTML =
            "<p>No se ha podido cargar la página. Comprueba la consola.</p>";
    }
}

// Interceptar los clics del menú lateral
sidebar.addEventListener("click", event => {
    const enlace = event.target.closest("a[data-page]");

    if (!enlace) return;

    event.preventDefault();

    cargarPagina(enlace.dataset.page);
});

// Gestionar Atrás y Adelante
window.addEventListener("popstate", event => {
    const pagina = event.state?.pagina;

    if (paginasPermitidas.includes(pagina)) {
        cargarPagina(pagina, false);
    } else {
        cargarPagina("dashboard", false);
    }
});

// Inicializar la aplicación
(async function iniciar() {
    try {
        await cargarSidebar();

        // Recuperar la página indicada en la URL o mostrar Dashboard
        const paginaURL = new URLSearchParams(location.search).get("pagina");

        const paginaInicial = paginasPermitidas.includes(paginaURL)
            ? paginaURL
            : "dashboard";

        await cargarPagina(paginaInicial, false);

        // Guardar el estado inicial
        history.replaceState(
            { pagina: paginaInicial },
            "",
            `./index.html?pagina=${paginaInicial}`
        );

    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        main.innerHTML = "<p>Error al iniciar la aplicación.</p>";
    }
})();