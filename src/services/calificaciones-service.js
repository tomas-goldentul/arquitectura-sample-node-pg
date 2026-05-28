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

    getCalificacionesId = async (id) => {
                console.log(`CalificacionesService.getCalificacionesId()`);
                 const resultado = await this.CalificacionesRepository.getCalificacionesId(id);
        return resultado;
    }


}