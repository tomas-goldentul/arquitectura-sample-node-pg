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
        console.log(`CalificacionesRepository.crearCalificacion(${idAlumno})`);
        const sql = `INSERT INTO calificaciones (id_alumno, id_materia, nota, fecha) VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [idAlumno, idMateria, nota, fecha];
        return await this.db.queryAll(sql, values);

    }
    traerFechaActual = async () => {
        const sql = `select CURRENT_DATE`
        return await this.db.queryAll(sql);

    }
    getAlumnoMateria = async (idAlumno, id_materia) => {
        const sql = `
        select id, id_alumno, id_materia, nota, fecha
        from calificaciones
        where id_alumno = $1 AND id_materia = $2
    `;
        const values = [idAlumno, id_materia];
        return await this.db.queryAll(sql, values);

    }


}