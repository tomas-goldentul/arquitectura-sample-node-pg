import Db from './db-pg.js';
export default class CalificacionesRepository {
    constructor() {
        console.log('Estoy en: CalificacionesRepository.constructor()');
        this.db = new Db();
    }

    getAllCalificaciones = async () => {
        console.log(`CalificacionesRepository.getAllCalificaciones()`);
        const sql = `select c.id, c.id_alumno, a.nombre as nombre_alumno, a.apellido  as apellido_alumno, c.id_materia, m.nombre as nombre_materia, c.nota, c.fecha
            from calificaciones c
            inner join alumnos a on c.id_alumno = a.id
            inner join materias m on c.id_materia = m.id`;
        return await this.db.queryAll(sql);
    }
    getCalificacionesId = async (id) => {
        console.log(`CalificacionesRepository.getCalificacionesId(${id})`);
        const sql = `select c.id, c.id_alumno, a.nombre as nombre_alumno, a.apellido  as apellido_alumno, c.id_materia, m.nombre as nombre_materia, c.nota, c.fecha
            from calificaciones c
            inner join alumnos a on c.id_alumno = a.id
            inner join materias m on c.id_materia = m.id
            WHERE c.id = $1`;
        const values = [id]
        return await this.db.queryOne(sql, values);
    }
    getAllCalificacionesAlumno = async (idAlumno) => {
        console.log(`CalificacionesRepository.getAllCalificacionesAlumno(${idAlumno})`);
        const sql = `
        SELECT c.id, c.id_materia, m.nombre as nombre_materia, c.nota, c.fecha
        FROM calificaciones c
        inner join materias m ON c.id_materia = m.id
        WHERE c.id_alumno = $1
    `;
        const values = [idAlumno]
        return await this.db.queryAll(sql, values);

    }
    crearCalificacion = async (idAlumno, idMateria, nota, fecha) => {
        let sql, values;
        if (fecha) {
            sql = `INSERT INTO calificaciones (id_alumno, id_materia, nota, fecha) VALUES ($1, $2, $3, $4) RETURNING *`;
            values = [idAlumno, idMateria, nota, fecha];
        } else {
            sql = `INSERT INTO calificaciones (id_alumno, id_materia, nota) VALUES ($1, $2, $3) RETURNING *`;
            values = [idAlumno, idMateria, nota];
        }
        return await this.db.queryOne(sql, values);
    }

    getAlumnoMateria = async (idAlumno, id_materia) => {
        const sql = `
        select id, id_alumno, id_materia, nota, fecha
        from calificaciones
        where id_alumno = $1 AND id_materia = $2
    `;
        const values = [idAlumno, id_materia];
        return await this.db.queryOne(sql, values);

    }

    modificarCalificacion = async (id, nota, fecha) => {
        const sql = `UPDATE calificaciones SET nota = $2, fecha = $3 WHERE id = $1;`
        const values = [id, nota, fecha]
        return await this.db.queryRowCount(sql, values);

    }

    eliminarCalificacion = async (id) => {
        const sql = `DELETE FROM calificaciones WHERE id = $1 RETURNING id`
        const values = [id]

       const resultado =  await this.db.queryRowCount(sql, values);
        return  resultado;
    }


}