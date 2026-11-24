document.addEventListener('click', (e) => {
    const popup = document.getElementById('new-event');

    if (!popup) return;

    // Abrir desde cualquier botón .btn-new
    if (e.target.closest('.btn-new')) {
        // Evitar reabrir el popup desde un botón que esté dentro de él
        if (popup.contains(e.target)) return;

        if (!popup.open) {
            popup.showModal();
            document.body.classList.add('no-scroll');
        }

        return;
    }

    // Cerrar desde el botón Cerrar
    if (e.target.closest('#cerrar_new')) {
        popup.close();
        document.body.classList.remove('no-scroll');
    }
});

// Cerrar al hacer clic fuera del contenido blanco
document.addEventListener('click', (e) => {
    const popup = document.getElementById('new-event');

    if (popup && popup.open && e.target === popup) {
        popup.close();
        document.body.classList.remove('no-scroll');
    }
});

// Restaurar el scroll cuando el popup se cierre
document.addEventListener('close', (e) => {
    if (e.target.id === 'new-event') {
        document.body.classList.remove('no-scroll');
    }
}, true);