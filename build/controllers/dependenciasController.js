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
const class_validator_1 = require("class-validator");
const dependenciaModel_1 = require("../models/dependenciaModel");
class DependenciasController {
    constructor() {
    }
    //Método para agregar dependencias
    agregarDependencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, subsede } = req.body;
                const dependencia = new dependenciaModel_1.Dependencia();
                dependencia.nombre = nombre;
                dependencia.subsede = subsede;
                const errors = yield (0, class_validator_1.validate)(dependencia);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield dependenciaModel_1.Dependencia.save(dependencia);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    listarDependencias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dependenciaModel_1.Dependencia.find({ relations: { subsede: true, ambientes: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar Dependencias
    modificarDependencias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idDependencia } = req.params;
            const otherFields = __rest(req.body, []);
            try {
                const dependencia = yield dependenciaModel_1.Dependencia.findOne({ where: { idDependencia: Number(idDependencia) } });
                if (!dependencia) {
                    throw new Error('Dependencia no encontrada');
                }
                //Asignamos los nuevos valores a las propiedades del Area
                const dependenciaModificada = Object.assign(Object.assign({}, dependencia), otherFields);
                //Guardamos los cambios en la base de datos
                yield dependenciaModel_1.Dependencia.save(dependenciaModificada);
                const registroActualizado = yield dependenciaModel_1.Dependencia.findOne({
                    where: { idDependencia: Number(idDependencia) }
                });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                console.error('Error al modificar la dependencia:', err);
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new DependenciasController();
