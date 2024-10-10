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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cuentaDanteModel_1 = require("../models/cuentaDanteModel");
const class_validator_1 = require("class-validator");
class PropietariosController {
    constructor() {
    }
    agregarCuentaDante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento, nombre, dependencia, departamento, tipoContrato, equipos, estado } = req.body;
                const cuentadante = new cuentaDanteModel_1.CuentaDante();
                cuentadante.documento = documento;
                cuentadante.nombre = nombre;
                cuentadante.dependencia = dependencia;
                cuentadante.departamento = departamento;
                cuentadante.tipoContrato = tipoContrato;
                cuentadante.equipos = equipos;
                cuentadante.estado = estado;
                const errors = yield (0, class_validator_1.validate)(cuentadante);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                //Verificación existencia del propietario
                const cuentaDanteExistente = yield cuentaDanteModel_1.CuentaDante.findOneBy({ documento: documento });
                if (cuentaDanteExistente) {
                    return res.status(400).json({ error: 'Este CuentaDante ya está registrado' });
                }
                const registro = yield cuentaDanteModel_1.CuentaDante.save(req.body);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Listado de Propietarios
    listarCuentaDantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield cuentaDanteModel_1.CuentaDante.find({ relations: { equipos: true, estado: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Obtener propietario específcio
    obtenerCuentaDantesPorDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            try {
                const data = yield cuentaDanteModel_1.CuentaDante.findOneBy({ documento: Number(documento) });
                if (!data) {
                    throw new Error('CuentaDante no encontrado');
                }
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    modificarDatosCuentadante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            const _a = req.body, { estado } = _a, otherFields = __rest(_a, ["estado"]);
            try {
                const cuentadante = yield cuentaDanteModel_1.CuentaDante.findOne({ where: { documento: Number(documento) }, relations: ['estado'] });
                if (!cuentadante) {
                    throw new Error('Cuentadante no encontrado');
                }
                // Asigna los nuevos valores a las propiedades del cuentadante
                const cuentadanteModificado = Object.assign(Object.assign(Object.assign({}, cuentadante), otherFields), { estado });
                // Guarda los cambios en la base de datos
                yield cuentaDanteModel_1.CuentaDante.save(cuentadanteModificado);
                const registroActualizado = yield cuentaDanteModel_1.CuentaDante.findOne({
                    where: { documento: Number(documento) }
                });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new PropietariosController();
