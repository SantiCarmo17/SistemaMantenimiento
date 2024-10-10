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
const subsedeModel_1 = require("../models/subsedeModel");
const class_validator_1 = require("class-validator");
class SubsedeController {
    constructor() {
    }
    agregarSubsede(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, equipos, sede, dependencias } = req.body;
                const subsede = new subsedeModel_1.Subsede();
                subsede.nombre = nombre;
                subsede.equipos = equipos;
                subsede.sede = sede;
                subsede.dependencias = dependencias;
                const errors = yield (0, class_validator_1.validate)(subsede);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield subsedeModel_1.Subsede.save(subsede);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    listarSubsedes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield subsedeModel_1.Subsede.find({ relations: { sede: true, equipos: true, dependencias: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar Subsedes
    modificarSubsedes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSubsede } = req.params;
            const otherFields = __rest(req.body, []);
            try {
                const subsede = yield subsedeModel_1.Subsede.findOne({ where: { idSubsede: Number(idSubsede) } });
                if (!subsede) {
                    throw new Error('Subsede no encontrado');
                }
                //Asignamos los nuevos valores a las propiedades del Area
                const subsedeModificada = Object.assign(Object.assign({}, subsede), otherFields);
                //Guardamos los cambios en la base de datos
                yield subsedeModel_1.Subsede.save(subsedeModificada);
                const registroActualizado = yield subsedeModel_1.Subsede.findOne({
                    where: { idSubsede: Number(idSubsede) }
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
exports.default = new SubsedeController();
