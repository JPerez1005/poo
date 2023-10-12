let estudiantes=[];
let cursos=[];
let horarios=JSON.parse(localStorage.getItem('gestion')) || [];

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
    mostrarEstudiantes(d.getElementById('seleccion2'));
}

function mostrarEstudiantes(selectElement) {
    if (estudiantes.length >= 0) {
        selectElement.innerHTML = '';
        for (let i = 0; i < estudiantes.length; i++) {
            const estudiante = estudiantes[i];
            selectElement.innerHTML += `<option>${estudiante.id}</option>`;
        }
    } else {
        console.log('no hay usuarios');
    }
}


function mostrarCursos(selectElement){
    if(cursos.length>=0){
        selectElement.innerHTML='';
        for (let i = 0; i < cursos.length; i++) {
            const curso = cursos[i];
            selectElement.innerHTML += `<option>${curso.id}</option>`;
        }
    }else{
        console.log(' no hay cursos');
    }
}


function crearCurso() {
    let nombreCurso = d.getElementById('cursoNombre').value;
    let idCurso = d.getElementById('cursoId').value;
    let duracionCurso = d.getElementById('cursoDuracion').value;
    let creditosCurso = d.getElementById('cursoCreditos').value;

    let curso = new Curso(
        idCurso,
        nombreCurso,
        duracionCurso,
        creditosCurso
    );
    cursos.push(curso);

    // Limpiar los campos del formulario
    d.getElementById('cursoNombre').value = '';
    d.getElementById('cursoDuracion').value = '';
    d.getElementById('cursoCreditos').value = '';

    mostrarCursos(d.getElementById('seleccionC1'));
}

function crearHorario(){
    let dia = d.getElementById('dia').value;
    let horaInicio = d.getElementById('horaInicio').value;
    let horaFin = d.getElementById('horaFin').value;

    let estudianteSeleccionado = d.getElementById('seleccion2').value;
    let cursoSeleccionado = d.getElementById('seleccionC1').value;

    const estudiante = estudiantes.find(e => e.id === estudianteSeleccionado);
    if (estudiante){
        const curso = cursos.find(c => c.id === cursoSeleccionado);
        if (curso){
            let horario = new Horario(
                curso.id, // Pasa el curso directamente al horario
                estudiante.id,
                dia,
                horaInicio,
                horaFin
            );

            horarios.push(horario);
            localStorage.setItem('gestion',JSON.stringify(horarios));
        } else {
            console.log('No se encontró el curso');
        }
    } else {
        console.log('No se encontró el estudiante');
    }
}

function mostrarHorario() {
    const modal_ver = document.getElementById('ver_horario');
    modal_ver.classList.toggle('active');
    let list = document.getElementById('list');

    list.innerHTML = '';

    const dias = {};

    for (let i = 0; i < horarios.length; i++) {
        const horario = horarios[i];
        const dia = horario.dia;

        if (!dias[dia]) {
            dias[dia] = [];
        }
        dias[dia].push(horario);
    }

    for (const dia in dias) {
        list.innerHTML += `<h1>${dia.charAt(0).toUpperCase() + dia.slice(1)}:</h1><br>`;
        dias[dia].forEach((horario) => {
            list.innerHTML += `<li>id estudiante: ${horario.estudiante_cod}, Curso: ${horario.curso_cod}, Hora inicio: ${horario.horaInicio}, Hora Fin: ${horario.horaFin}</li>`;
        });
    }
}
