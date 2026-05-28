import MateriasRepository from '../repositories/materias-repository.js';

export default class MateriasService {
    constructor() {
        console.log('Estoy en: MateriasService.constructor()');
        this.MateriasRepository = new MateriasRepository();
    }

    getAllAsync = async () => {
        console.log(`MateriasService.getAllAsync()`);
        const returnArray = await this.MateriasRepository.getAllAsync();
        return returnArray;

    }

    getMateriaPorId = async (id) => {
        console.log(`MateriasService.getMateriaPorId(${id})`);
        const materia = await this.MateriasRepository.getMateriaPorId(id);
        return materia;

    }

    crearMateria = async (nombre) => {
        console.log(`MateriasService.crearMateria(${nombre})`);
        const id = await this.MateriasRepository.crearMateria(nombre);
        return id;
    }
    updateMateria = async (id, nombre) => {
        console.log(`MateriasService.updateMateria(${id}, ${nombre})`);

        if (!nombre || nombre.trim() === "") {
            const error = new Error('El nombre de la materia es obligatorio.');
            error.statusCode = 400;
            throw error;
        }
        const resultadoArray = await this.MateriasRepository.updateMateria(id, nombre);
        const rowsAffected = resultadoArray.length;
        return rowsAffected;
    }

    eliminarMateria = async (id) => {
        console.log(`MateriasService.eliminarMateria(${id})`);
        const resultado = await this.MateriasRepository.eliminarMateria(id);
        return resultado;
    }
}