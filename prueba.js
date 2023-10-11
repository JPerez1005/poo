// Definición de la clase "Persona" para representar un objeto
class Persona {
    constructor(id, nombre, edad) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
    }

  // Métodos para acceder y modificar los datos de la persona
    obtenerDatos() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Edad: ${this.edad}`;
    }

    actualizarDatos(nuevoNombre, nuevaEdad) {
        this.nombre = nuevoNombre;
        this.edad = nuevaEdad;
    }
}

// Definición de un "Repositorio" que almacena y administra objetos Persona
class RepositorioPersonas {
    constructor() {
        this.personas = [];
    }

    // Agregar una nueva persona al repositorio
    agregarPersona(persona) {
        this.personas.push(persona);
    }

  // Buscar una persona por ID
    buscarPersonaPorId(id) {
        return this.personas.find((persona) => persona.id === id);
    }

    // Actualizar los datos de una persona
    actualizarPersona(id, nuevoNombre, nuevaEdad) {
        const persona = this.buscarPersonaPorId(id);
        if (persona) {
        persona.actualizarDatos(nuevoNombre, nuevaEdad);
        }
    }

    // Eliminar una persona por ID
    eliminarPersona(id) {
        this.personas = this.personas.filter((persona) => persona.id !== id);
    }

    // Obtener todas las personas en el repositorio
    obtenerTodasLasPersonas() {
        return this.personas;
    }
}

// Crear objetos de la clase Persona y agregarlos al Repositorio
const repositorio = new RepositorioPersonas();
repositorio.agregarPersona(new Persona(1, "Juan", 30));
repositorio.agregarPersona(new Persona(2, "María", 25));

// Realizar operaciones CRUD
console.log("Personas en el repositorio:");
console.log(repositorio.obtenerTodasLasPersonas());

console.log("Actualizar datos de la persona con ID 1:");
repositorio.actualizarPersona(1, "Juan Pérez", 32);
console.log(repositorio.buscarPersonaPorId(1).obtenerDatos());

console.log("Eliminar la persona con ID 2:");
repositorio.eliminarPersona(2);
console.log(repositorio.obtenerTodasLasPersonas());
