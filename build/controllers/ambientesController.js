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
const ambienteModel_1 = require("../models/ambienteModel");
const class_validator_1 = require("class-validator");
class AmbientesController {
    constructor() {
    }
    //Método para agregar Ambientes
    agregarAmbiente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, dependencia } = req.body;
                const ambiente = new ambienteModel_1.Ambiente();
                ambiente.nombre = nombre;
                ambiente.dependencia = dependencia;
                const errors = yield (0, class_validator_1.validate)(ambiente);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield ambienteModel_1.Ambiente.save(ambiente);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para listar ambientes
    listarAmbientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ambienteModel_1.Ambiente.find({ relations: { dependencia: true, equipos: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar Ambientes
    modificarAmbientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAmbiente } = req.params;
            const otherFields = __rest(req.body, []);
            try {
                const ambiente = yield ambienteModel_1.Ambiente.findOne({ where: { idAmbiente: Number(idAmbiente) } });
                if (!ambiente) {
                    throw new Error('Ambiente no encontrado');
                }
                //Asignamos los nuevos valores a las propiedades de la sede
                const ambienteModificado = Object.assign(Object.assign({}, ambiente), otherFields);
                //Guardamos los cambios en la base de datos
                yield ambienteModel_1.Ambiente.save(ambienteModificado);
                const registroActualizado = yield ambienteModel_1.Ambiente.findOne({
                    where: { idAmbiente: Number(idAmbiente) }
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
exports.default = new AmbientesController();
