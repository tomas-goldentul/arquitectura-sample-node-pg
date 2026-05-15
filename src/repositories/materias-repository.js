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
}