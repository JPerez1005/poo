// Importar las clases aquí (Estudiante, Curso, Horario)

const estudiantes = [];
const cursos = [];
const horarios = [];

class Estudiante {
    constructor(id, nombre, carrera) {
        this.id = id;
        this.nombre = nombre;
        this.carrera = carrera;
        this.cursos = [];
        this.horarios = [];
    }

    inscribirseEnCurso(curso) {
        this.cursos.push(curso);
        curso.inscribirEstudiante(this);
    }

    inscribirseEnHorario(horario) {
        this.horarios.push(horario);
        horario.inscribirEstudiante(this);
    }

    // Otros métodos para eliminar y modificar cursos y horarios
}

class Curso {
    constructor(id, nombre, duracion, creditos) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.creditos = creditos;
        this.estudiantes = [];
    }

    inscribirEstudiante(estudiante) {
        this.estudiantes.push(estudiante);
    }

    // Otros métodos para eliminar y modificar estudiantes y horarios
}

class Horario {
    constructor(id, dia, horaInicio, horaFin) {
        this.id = id;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.cursos = [];
        this.estudiantes = [];
    }

    inscribirCurso(curso) {
        this.cursos.push(curso);
    }

    inscribirEstudiante(estudiante) {
        this.estudiantes.push(estudiante);
    }

    // Otros métodos para eliminar y modificar cursos y estudiantes
}

const estudianteForm = document.getElementById('estudiante-form');
const cursoForm = document.getElementById('curso-form');
const asignarCursoForm = document.getElementById('asignar-curso-form');
const mostrarEstudiantesBtn = document.getElementById('mostrar-estudiantes');
const mostrarCursosBtn = document.getElementById('mostrar-cursos');
const resultados = document.getElementById('resultados');

// Función para mostrar estudiantes
function mostrarEstudiantes() {
    resultados.innerHTML = '<h3>Estudiantes:</h3>';
    estudiantes.forEach(estudiante => {
        resultados.innerHTML += `<p>ID: ${estudiante.id}, Nombre: ${estudiante.nombre}, Carrera: ${estudiante.carrera}</p>`;
    });
}

// Función para mostrar cursos
function mostrarCursos() {
    resultados.innerHTML = '<h3>Cursos:</h3>';
    cursos.forEach(curso => {
        resultados.innerHTML += `<p>ID: ${curso.id}, Nombre: ${curso.nombre}, Duración: ${curso.duracion}</p>`;
    });
}

// Agregar evento para registrar un estudiante
estudianteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const carrera = document.getElementById('carrera').value;
    const estudiante = new Estudiante(estudiantes.length + 1, nombre, carrera);
    estudiantes.push(estudiante);
    document.getElementById('nombre').value = '';
    document.getElementById('carrera').value = '';
    console.log('Estudiante registrado:', estudiante);
});

// Agregar evento para registrar un curso
cursoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombreCurso = document.getElementById('nombreCurso').value;
    const duracion = document.getElementById('duracion').value;
    const curso = new Curso(cursos.length + 1, nombreCurso, duracion, 0);
    cursos.push(curso);
    document.getElementById('nombreCurso').value = '';
    document.getElementById('duracion').value = '';
    console.log('Curso registrado:', curso);
});

// Llenar select con estudiantes y cursos
const estudianteSelect = document.getElementById('estudianteSelect');
const cursoSelect = document.getElementById('cursoSelect');
estudiantes.forEach(estudiante => {
    const option = document.createElement('option');
    option.value = estudiante.id;
    option.textContent = estudiante.nombre;
    estudianteSelect.appendChild(option);
});

cursos.forEach(curso => {
    const option = document.createElement('option');
    option.value = curso.id;
    option.textContent = curso.nombre;
    cursoSelect.appendChild(option);
});

// Agregar evento para asignar un curso a un estudiante
asignarCursoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const estudianteId = estudianteSelect.value;
    const cursoId = cursoSelect.value;
    const estudiante = estudiantes.find(e => e.id === parseInt(estudianteId));
    const curso = cursos.find(c => c.id === parseInt(cursoId));

    if (estudiante && curso) {
        estudiante.inscribirseEnCurso(curso);
        console.log(`Curso asignado a ${estudiante.nombre}: ${curso.nombre}`);
    } else {
        console.log('Estudiante o curso no encontrado');
    }
});

// Agregar eventos para mostrar estudiantes y cursos
mostrarEstudiantesBtn.addEventListener('click', mostrarEstudiantes);
mostrarCursosBtn.addEventListener('click', mostrarCursos);
