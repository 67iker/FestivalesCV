document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('new-event');
    const botonesNuevo = document.querySelectorAll('.btn-new');
    const botonCerrar = document.getElementById('cerrar_new');

    // Comprobar que el pop-up existe en la página antes de asignar eventos
    if (popup) {
        // Asignar el evento de apertura a todos los botones de editar
        botonesNuevo.forEach(boton => {
            boton.addEventListener('click', () => {
                popup.showModal(); 
                document.body.classList.add('no-scroll');
            });
        });

        // Cerrar el pop-up al pulsar en el botón Cerrar
        if (botonCerrar) {
            botonCerrar.addEventListener('click', () => {
                popup.close();
                document.body.classList.remove('no-scroll');
            });
        }

        // Cerrar el pop-up si el usuario hace clic fuera de la ventana blanca (en el fondo)
        popup.addEventListener('click', (e) => {
            const dialogDimensions = popup.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                popup.close();
                document.body.classList.remove('no-scroll');
            }
        });
    }
});