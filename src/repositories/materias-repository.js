import Db from './db-pg.js';
export default class MateriasRepository {
    constructor() {
        console.log('Estoy en: MateriasRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`MateriasRepository.getAllAsync()`);
        const sql = `SELECT * FROM materias`;
        return await this.db.queryAll(sql);
    }
    getMateriaPorId = async (id) => {
        console.log(`MateriasRepository.getMateriaPorId()`);
        const sql = `SELECT * FROM materias WHERE id = $1`;
        const params = [id];
        return await this.db.queryAll(sql, params);
    }
    crearMateria = async (nombre) => {
        console.log(`MateriasRepository.crearMateria()`);
        const sql = `INSERT INTO materias (nombre) VALUES ($1) RETURNING id`;
        const params = [nombre];
        return await this.db.queryAll(sql, params);
    }
    updateMateria = async (id, nombre) => {
        console.log(`MateriasRepository.updateMateria()`);
        const sql = `UPDATE materias SET nombre = $2 WHERE id = $1 RETURNING *`;
        const params = [id, nombre];
        return await this.db.queryAll(sql, params);
    }
    eliminarMateria = async (id) => {
        console.log(`MateriasRepository.eliminarMateria()`);
        const sql = `DELETE FROM materias where id = $1 RETURNING *`;
        const params = [id]
        return await this.db.queryAll(sql, params);

    }

}