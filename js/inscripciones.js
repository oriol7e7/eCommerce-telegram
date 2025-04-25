// Horarios de las clases por cada grupo
const horarios = {
    kids: [
        "Lunes y Miércoles - 16:00 a 17:00",
        "Sábados - 10:00 a 11:00"
    ],
    junior: [
        "Martes y Jueves - 17:30 a 18:30",
        "Viernes - 18:00 a 19:30"
    ],
    senior: [
        "Lunes a Viernes - 19:00 a 20:30",
        "Sábados - 12:00 a 13:30"
    ]
};

// Evento al cambiar el grupo de edad
document.getElementById("edad").addEventListener("change", function() {
    const grupo = this.value;
    const selectHorario = document.getElementById("horario");

    // Limpiar opciones anteriores
    selectHorario.innerHTML = '<option value="">Elige el horario</option>';
    
    // Si se seleccionó un grupo válido, agregar sus horarios
    if (grupo && horarios[grupo]) {
        horarios[grupo].forEach(function(horario) {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
        });
    }
});