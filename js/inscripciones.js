const horarios = {
    kids: [
        { value: "lun-mie-16", text: "Lunes y Miércoles - 16:00 a 17:00" },
        { value: "sab-10", text: "Sábados - 10:00 a 11:00" }
    ],
    junior: [
        { value: "mar-jue-17", text: "Martes y Jueves - 17:30 a 18:30" },
        { value: "vie-18", text: "Viernes - 18:00 a 19:30" }
    ],
    senior: [
        { value: "lun-vie-19", text: "Lunes a Viernes - 19:00 a 20:30" },
        { value: "sab-12", text: "Sábados - 12:00 a 13:30" }
    ]
};

document.getElementById("edad").addEventListener("change", function () {
    const grupo = this.value;
    const selectHorario = document.getElementById("horario");

    // Limpiar opciones anteriores
    selectHorario.innerHTML = '<option value="">Elige el horario</option>';

    if (grupo && horarios[grupo]) {
        horarios[grupo].forEach(horario => {
            const option = document.createElement("option");
            option.value = horario.value; // Valor compatible con el ENUM
            option.textContent = horario.text; // Texto visible
            selectHorario.appendChild(option);
        });
    }
});