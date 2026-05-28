import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import MateriasService from './../services/materias-service.js'
import res from 'express/lib/response.js';

const router = Router();
const currentService = new MateriasService();

//trae todas las materias
router.get('', async (req, res) => {
    try {
        console.log(`MateriasController.get`);
        const returnArray = await currentService.getAllAsync();
        if (returnArray != null) {
            res.status(StatusCodes.OK).json(returnArray);
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//materia por id
router.get('/:id', async (req, res) => {
    try {
        console.log(`MateriasController.getById`);
        const id = req.params.id;
        const materia = await currentService.getMateriaPorId(id);
        if (materia != null && materia.length > 0) {
            res.status(StatusCodes.OK).json(materia);
        } else {
            res.status(StatusCodes.NOT_FOUND).send('Materia no encontrada');
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//crear materia
router.post('', async (req, res) => {
    try {
        console.log(`MateriasController.crearMateria`);

        const { nombre } = req.body;
        if (!nombre || nombre.trim() === "") {
            return res.status(StatusCodes.BAD_REQUEST).send('El nombre de la materia es obligatorio.');
        }
        const dbResult = await currentService.crearMateria(nombre);
        const idFinal = Array.isArray(dbResult) ? dbResult[0].id : dbResult;
        res.status(StatusCodes.CREATED).json(idFinal);

    } catch (error) {
        console.log(error);

        if (error.statusCode === StatusCodes.BAD_REQUEST) {
            return res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//Modificar materia
router.put('/:id', async (req, res) => {
    try {
        console.log(`MateriasController.updateMateria`);
        const id = req.params.id;
        const { nombre } = req.body;
        const rowsAffected = await currentService.updateMateria(id, nombre);

        if (rowsAffected === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No se encontró la materia (id: ${id}).`);
        }
        res.status(StatusCodes.OK).json(rowsAffected);

    } catch (error) {
        console.log(error);
        if (error.statusCode === StatusCodes.BAD_REQUEST) {
            return res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }
});

//eliminar Materia
router.delete('/:id', async (req, res) => {
    try {
        console.log(`MateriasController.eliminarMateria`);
        const id = req.params.id;
        const resultado = await currentService.eliminarMateria(id);
        if (resultado.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json("No existe la materia");
        }
        else {
            res.status(StatusCodes.OK).json("se elimino correctamente");

        }

    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
    }


});
export default router;