import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CalificacionesService from './../services/calificaciones-service.js'

const router = Router();
const currentService = new CalificacionesService();

//traer todas las calificaciones
router.get('', async (req, res) => {
    try {
        console.log(`CalificacionesController.get`);
        const returnArray = await currentService.getAllCalificaciones();
        if (returnArray.length > 0) {
            res.status(StatusCodes.OK).json(returnArray);
        } else {
            res.status(StatusCodes.NOT_FOUND).json(`No hay calificaciones cargadas`);
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//traer calificacion por id
router.get('/:id', async (req, res) => {
    try {
        console.log(`CalificacionesController.get`);
        const id = req.params.id;
        const resultado = await currentService.getCalificacionesId(id);
        if (resultado) {
            res.status(StatusCodes.OK).json(resultado);
        } else {
            res.status(StatusCodes.NOT_FOUND).json(`No se encontró la calificación (id: ${id})`);
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//traer calificaciones de alumno
router.get('/alumno/:idAlumno', async (req, res) => {
    try {
        console.log(`CalificacionesController.get`);
        const idAlumno = req.params.idAlumno;
        const resultado = await currentService.getAllCalificacionesAlumno(idAlumno);
        res.status(StatusCodes.OK).json(resultado);

    } catch (error) {
        console.log(error);
        if (error.status === 404) {
            return res.status(StatusCodes.NOT_FOUND).send("No se encontro al alumno");
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//crear calificacion
router.post('', async (req, res) => {
    try {
        const { idAlumno, idMateria, nota, fecha } = req.body;
        const nuevoAlumno = await currentService.crearCalificacion(idAlumno, idMateria, nota, fecha);
        res.status(StatusCodes.OK).json(nuevoAlumno);

    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).send(`Error: ${error.message}`);
    }
})
export default router;