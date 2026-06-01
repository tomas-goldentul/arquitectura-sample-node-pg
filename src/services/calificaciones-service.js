import CalificacionesRepository from '../repositories/calificaciones-repository.js';
import AlumnosRepository from '../repositories/alumnos-repository.js';
import AlumnosService from '../services/alumnos-service.js';
import MateriasService from '../services/materias-service.js';

function verificarNumero(numero) {
    return Number.isInteger(numero) && numero >= 0 && numero <= 10;
}



export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
        this.AlumnosRepository = new AlumnosRepository();
        this.AlumnosService = new AlumnosService();
        this.MateriasService = new MateriasService();

    }

    getAllCalificaciones = async () => {
        console.log(`CalificacionesService.getAllCalificaciones()`);
        const returnArray = await this.CalificacionesRepository.getAllCalificaciones();
        return returnArray;

    }

    getCalificacionesId = async (id) => {
        console.log(`CalificacionesService.getCalificacionesId()`);
        const resultado = await this.CalificacionesRepository.getCalificacionesId(id);
        return resultado;
    }
    getAllCalificacionesAlumno = async (idAlumno) => {
        const alumno = await this.AlumnosRepository.getByIdAsync(idAlumno);
        if (!alumno) {
            const error = new Error(`El alumno con id ${idAlumno} no existe.`);
            error.status = 404;
            throw error;
        }
        const calificaciones = await this.CalificacionesRepository.getAllCalificacionesAlumno(idAlumno);
        if (calificaciones == null) {
            return [];
        }
        return calificaciones;
    }
    crearCalificacion = async (idAlumno, idMateria, nota, fecha) => {

        let notaValida = verificarNumero(nota);
        if (!notaValida) {
            const error = new Error(`La nota debe ser un número entero entre 0 y 10`);
            error.status = 400;
            throw error;
        }
        const alumno = await this.AlumnosService.getByIdAsync(idAlumno);
        if (alumno == null) {
            const error = new Error(`El alumno con id ${idAlumno} no existe`);
            error.status = 400;
            throw error;
        }
        const materia = await this.MateriasService.getMateriaPorId(idMateria);

        if (materia == null) {
            const error = new Error(`La materia con id ${idMateria} no existe`);
            error.status = 400;
            throw error;
        }
        const existe = await this.CalificacionesRepository.getAlumnoMateria(idAlumno, idMateria);
        if (existe != null) {
            const error = new Error(`Ya existe una calificación para el alumno ${idAlumno} en la materia ${idMateria}`);
            error.status = 409;
            throw error;
        }
        const alumnoNuevo = await this.CalificacionesRepository.crearCalificacion(idAlumno, idMateria, nota, fecha);
        return alumnoNuevo
    }

    updateCalificacion = async (id, nota, fecha) => {
        const existeCalificacion = await this.CalificacionesRepository.getCalificacionesId(id);
        if (existeCalificacion == null) {
            const error = new Error(`No se encontró la calificación ${id}`);
            error.status = 404;
            throw error;
        }
        const notaValida = verificarNumero(nota);
        if (!notaValida) {
            const error = new Error(`La nota debe ser un número entero entre 0 y 10.`);
            error.status = 400;
            throw error;
        }
        let fechaFinal;
        if (fecha !== undefined && fecha !== null) {
            fechaFinal = fecha;
        } else {
            fechaFinal = new Date().toISOString();
        }

        const filasAfectadas = await this.CalificacionesRepository.modificarCalificacion(id, nota, fechaFinal)
        return filasAfectadas.lenght;
    }

    eliminarCalificacion = async (id) => {
        const existeCalificacion = await this.CalificacionesRepository.getCalificacionesId(id);
        if (existeCalificacion == null) {
            const error = new Error(`No se encontró la calificación ${id}`);
            error.status = 404;
            throw error;
        }
        const eliminado = await this.CalificacionesRepository.eliminarCalificacion(id);
        return eliminado
    }
}

