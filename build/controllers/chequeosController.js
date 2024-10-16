"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChequeosController = void 0;
const chequeoModel_1 = require("../models/chequeoModel");
const equipoModel_1 = require("../models/equipoModel");
const mantenimientoModel_1 = require("../models/mantenimientoModel");
class ChequeosController {
    constructor() {
    }
    addOrUpdateChequeo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { equipoSerial, mantenimientoId, descripcion, observaciones, linkEvidencia } = req.body;
            try {
                // Buscar si ya existe un chequeo para el equipo y mantenimiento dado
                let chequeo = yield chequeoModel_1.Chequeo.findOne({
                    where: { equipo: { serial: equipoSerial }, mantenimiento: { idMantenimiento: mantenimientoId } },
                    relations: ['equipo', 'mantenimiento']
                });
                if (chequeo) {
                    //Si existe chequeo, actualizamos la descripción y observaciones
                    chequeo.descripcion = descripcion;
                    chequeo.observaciones = observaciones;
                    chequeo.linkEvidencia = linkEvidencia;
                }
                else {
                    //Si no existe, creamos uno nuevo
                    const equipo = yield equipoModel_1.Equipo.findOne({ where: { serial: equipoSerial } });
                    const mantenimiento = yield mantenimientoModel_1.Mantenimiento.findOne({ where: { idMantenimiento: mantenimientoId } });
                    if (!equipo || !mantenimiento) {
                        return res.status(404).json({ message: 'Equipo o Mantenimiento no encontrado' });
                    }
                    chequeo = new chequeoModel_1.Chequeo();
                    chequeo.descripcion = descripcion;
                    chequeo.observaciones = observaciones;
                    chequeo.linkEvidencia = linkEvidencia;
                    chequeo.equipo = equipo;
                    chequeo.mantenimiento = mantenimiento;
                }
                //Guardamos el chequeo en la base de datos
                yield chequeo.save();
                res.status(200).json({ message: 'Chequeo guardado correctamente', chequeo });
            }
            catch (error) {
                console.error('Error al guardar el chequeo:', error);
                res.status(500).json({ message: 'Error al guardar el chequeo' });
            }
        });
    }
    ;
    getChequeosByMantenimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mantenimientoId } = req.params;
            try {
                const chequeos = yield chequeoModel_1.Chequeo.find({
                    where: { mantenimiento: { idMantenimiento: Number(mantenimientoId) } },
                    relations: ['equipo', 'mantenimiento']
                });
                if (!chequeos.length) {
                    return res.status(404).json({ message: 'No se encontraron chequeos para el mantenimiento especificado' });
                }
                res.status(200).json(chequeos);
            }
            catch (error) {
                console.error('Error al obtener los chequeos:', error);
                res.status(500).json({ message: 'Error al obtener los chequeos' });
            }
        });
    }
    ;
}
exports.ChequeosController = ChequeosController;
exports.default = new ChequeosController();
