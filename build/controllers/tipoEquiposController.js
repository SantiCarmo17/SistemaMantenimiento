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
exports.TipoEquiposController = void 0;
const tipoEquipoModel_1 = require("../models/tipoEquipoModel");
const class_validator_1 = require("class-validator");
class TipoEquiposController {
    constructor() {
    }
    listarTipoEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield tipoEquipoModel_1.TipoEquipo.find();
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Agregar Nuevo tipo de equipo
    agregarTipoEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre } = req.body;
                const tipo = new tipoEquipoModel_1.TipoEquipo();
                tipo.nombre = nombre;
                const errors = yield (0, class_validator_1.validate)(tipo);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield tipoEquipoModel_1.TipoEquipo.save(tipo);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar Tipos
    modificarTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const otherFields = __rest(req.body, []);
            try {
                const tipoEquipo = yield tipoEquipoModel_1.TipoEquipo.findOne({ where: { id: Number(id) } });
                if (!tipoEquipo) {
                    throw new Error('tipoEquipo no encontrado');
                }
                //Asignamos los nuevos valores a las propiedades del Tipo equipo
                const tipoEquipoModificado = Object.assign(Object.assign({}, tipoEquipo), otherFields);
                //Guardamos los cambios en la base de datos
                yield tipoEquipoModel_1.TipoEquipo.save(tipoEquipoModificado);
                const registroActualizado = yield tipoEquipoModel_1.TipoEquipo.findOne({
                    where: { id: Number(id) }
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
exports.TipoEquiposController = TipoEquiposController;
exports.default = new TipoEquiposController();
