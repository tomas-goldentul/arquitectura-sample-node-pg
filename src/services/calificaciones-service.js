import CalificacionesRepository from '../repositories/calificaciones-repository.js';
export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
    }

    getAllCalificaciones = async () => {
        console.log(`CalificacionesService.getAllCalificaciones()`);
        const returnArray = await this.CalificacionesRepository.getAllCalificaciones();
        return returnArray;

    }

   
}