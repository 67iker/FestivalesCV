document.addEventListener('click', (e) => {
    const popup = document.getElementById('edit-event');

    if (!popup) return;

    // Abrir el popup desde cualquier botón de editar
    if (e.target.closest('.btn-editar')) {
        // Evitar que el botón Guardar del popup lo vuelva a abrir
        if (popup.contains(e.target)) return;

        if (!popup.open) {
            popup.showModal();
            document.body.classList.add('no-scroll');
        }

        return;
    }

    // Cerrar desde el botón correspondiente
    if (e.target.closest('#cerrar_edit')) {
        popup.close();
        document.body.classList.remove('no-scroll');
    }
});

// Cerrar al pulsar el fondo
document.addEventListener('click', (e) => {
    const popup = document.getElementById('edit-event');

    if (popup && popup.open && e.target === popup) {
        popup.close();
        document.body.classList.remove('no-scroll');
    }
});

// Restaurar el scroll cuando se cierre por cualquier motivo
document.addEventListener('close', (e) => {
    if (e.target.id === 'edit-event') {
        document.body.classList.remove('no-scroll');
    }
}, true);