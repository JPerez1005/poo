let estudiantes=[];
let cursos=[];
let horario=[];

class Estudiante {
    constructor(id, nombre, carrera) {
        this.id = id;
        this.nombre = nombre;
        this.carrera = carrera;
        this.cursos = []; // Un estudiante puede inscribirse en múltiples cursos
    }

    inscribirseEnCurso(curso) {
        this.cursos.push(curso);
    }

    desinscribirseDeCurso(curso) {
        const index = this.cursos.findIndex(c => c.id === curso.id);
        if (index !== -1) {
            this.cursos.splice(index, 1);
        }
    }
}


class Curso {
    constructor(id, nombre, duracion, creditos) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.creditos = creditos;
        this.estudiantes = []; // Lista de estudiantes inscritos en el curso
    }

    inscribirEstudiante(estudiante) {
        this.estudiantes.push(estudiante);
    }

    eliminarEstudiante(estudiante) {
        const index = this.estudiantes.findIndex(e => e.id === estudiante.id);
        if (index !== -1) {
            this.estudiantes.splice(index, 1);
        }
    }

    modificarEstudiante(estudianteId, nuevoNombre, nuevaCarrera) {
        const estudiante = this.estudiantes.find(e => e.id === estudianteId);
        if (estudiante) {
            estudiante.nombre = nuevoNombre;
            estudiante.carrera = nuevaCarrera;
        } else {
            console.log("El estudiante no se encontró en este curso.");
        }
    }
}

class Horario {
    constructor(curso_cod, estudiante_cod, dia, horaInicio, horaFin) {
        this.curso_cod = curso_cod;
        this.estudiante_cod = estudiante_cod;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.cursos = []; // Lista de cursos programados para este horario
    }

    agregarCurso(curso) {
        this.cursos.push(curso);
    }

    modificarCurso(cursoId, nuevoNombre, nuevaDuracion) {
        const curso = this.cursos.find(c => c.id === cursoId);
        if (curso) {
        curso.nombre = nuevoNombre;
        curso.profesor = nuevaDuracion;
        } else {
        console.log("El curso no se encontró en este horario.");
        }
    }

    eliminarCurso(curso) {
        const index = this.cursos.findIndex(c => c.id === curso.id);
        if (index !== -1) {
        this.cursos.splice(index, 1);
        }
    }
}

// 

const d=document;

function crearEstudiante() {
    let id=d.getElementById('estudianteId');
    let nombre=d.getElementById('estudianteNombre');
    let carrera=d.getElementById('estudianteCarrera');

    let estudiante=new Estudiante(id.value, nombre.value, carrera.value);

    id.value= '';
    nombre.value='';
    carrera.value='';

    estudiantes.push(estudiante);
    console.log(estudiantes);
    mostrarEstudiantes(d.getElementById('seleccion'));
    mostrarEstudiantes(d.getElementById('seleccion2'));
}

function mostrarEstudiantes(selectElement) {
    if (estudiantes.length >= 0) {
        selectElement.innerHTML = '';
        for (let i = 0; i < estudiantes.length; i++) {
            const estudiante = estudiantes[i];
            selectElement.innerHTML += `<option>${estudiante.nombre}</option>`;
        }
    } else {
        console.log('no hay usuarios');
    }
}

function mostrarCursos(selectElement){
    if(estudiantes.cursos.length>=0){
        selectElement.innerHTML='';
        for (let i = 0; i < estudiantes.cursos.length; i++) {
            const curso = estudiantes.cursos[i];
            selectElement.innerHTML += `<option>${curso.nombre}</option>`;
        }
    }else{
        console.log(' no hay cursos');
    }
}


function crearCurso() {
    let estudianteSeleccionado = d.getElementById('seleccion').value;
    let nombreCurso = d.getElementById('cursoNombre').value;
    let duracionCurso = d.getElementById('cursoDuracion').value;
    let creditosCurso = d.getElementById('cursoCreditos').value;

    const estudiante = estudiantes.find(e => e.nombre === estudianteSeleccionado);
    if (estudiante) {
        let curso = new Curso(
            cursos.length + 1,//aumenta a uno
            nombreCurso,
            duracionCurso,
            creditosCurso
        );
        curso.inscribirEstudiante(estudiante);
        estudiante.inscribirseEnCurso(curso);
        cursos.push(curso);
        console.log(estudiantes);
    } else {
        console.log('Estudiante no encontrado');
    }

    // Limpiar los campos del formulario
    d.getElementById('cursoNombre').value = '';
    d.getElementById('cursoDuracion').value = '';
    d.getElementById('cursoCreditos').value = '';

    mostrarCursos(d.getElementById('seleccionC1'));
}

function crearHorario(){
    let estudianteSeleccionado = d.getElementById('seleccion2').value;
    let cursoSeleccionado = d.getElementById('seleccionC1').value;

    const estudiante = estudiantes.find(e => e.nombre === estudianteSeleccionado);
    if(estudiante){
        const curso = estudiantes.find(e => e.nombre === cursoSeleccionado);
    }
}

/* function mostrarCursosDeEstudiante() {
    const estudianteSeleccionado = d.getElementById('seleccion2').value;
    const estudiante = estudiantes.find(e => e.nombre === estudianteSeleccionado);

    if (estudiante) {
        const cursosEstudiante = estudiante.cursos;
        if (cursosEstudiante.length > 0) {
            console.log(`Cursos de ${estudiante.nombre}:`);
            cursosEstudiante.forEach(curso => {
                console.log(`ID: ${curso.id}, Nombre: ${curso.nombre}, Duración: ${curso.duracion}`);
            });
        } else {
            console.log(`${estudiante.nombre} no está inscrito en ningún curso.`);
        }
    } else {
        console.log('Estudiante no encontrado');
    }
} */

// Ejemplo de uso:
const estudiante1 = new Estudiante(1, "Estudiante A", 20);
const estudiante2 = new Estudiante(2, "Estudiante B", 22);
const curso1 = new Curso(1, "Matemáticas", "Profesor A");
const curso2 = new Curso(2, "Historia", "Profesor B");
const horario1 = new Horario(1, "Lunes", "09:00 AM", "11:00 AM");

curso1.inscribirEstudiante(estudiante1);
curso2.inscribirEstudiante(estudiante2);

estudiante1.inscribirseEnCurso(curso1);
estudiante2.inscribirseEnCurso(curso2);

console.log("Información del estudiante 1:");
console.log(estudiante1);

console.log("Información del curso 1:");
console.log(curso1);

console.log("Horario del curso 1:");
console.log(horario1);
//hola