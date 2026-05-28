import CalificacionesRepository from '../repositories/calificaciones-repository.js';
import AlumnosRepository from '../repositories/alumnos-repository.js';

export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
        this.AlumnosRepository = new AlumnosRepository();

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
}

