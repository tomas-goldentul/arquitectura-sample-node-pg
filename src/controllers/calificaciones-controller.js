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
        if (returnArray.length > 0){
            res.status(StatusCodes.OK).json(returnArray);
        } else {
            res.status(StatusCodes.NOT_FOUND).json(`No hay calificaciones cargadas`);
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});



export default router;