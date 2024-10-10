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
const sedeModel_1 = require("../models/sedeModel");
const class_validator_1 = require("class-validator");
class SedesController {
    constructor() {
    }
    //Método para agregar sedes
    agregarSede(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, equipos, subsedes } = req.body;
                const sede = new sedeModel_1.Sede();
                sede.nombre = nombre;
                sede.equipos = equipos;
                sede.subsedes = subsedes;
                const errors = yield (0, class_validator_1.validate)(sede);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield sedeModel_1.Sede.save(sede);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    listarSedes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield sedeModel_1.Sede.find();
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Método para actualizar Sedes
    modificarSedes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSede } = req.params;
            const otherFields = __rest(req.body, []);
            try {
                const sede = yield sedeModel_1.Sede.findOne({ where: { idSede: Number(idSede) } });
                if (!sede) {
                    throw new Error('Sede no encontrado');
                }
                //Asignamos los nuevos valores a las propiedades de la sede
                const sedeModificada = Object.assign(Object.assign({}, sede), otherFields);
                //Guardamos los cambios en la base de datos
                yield sedeModel_1.Sede.save(sedeModificada);
                const registroActualizado = yield sedeModel_1.Sede.findOne({
                    where: { idSede: Number(idSede) }
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
exports.default = new SedesController();
