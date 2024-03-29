import React from "react";

export function formatDate(fechaHora) {

    const fecha = new Date(fechaHora);
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);

    return `${fechaFormateada} a las ${horaFormateada}`;
}

