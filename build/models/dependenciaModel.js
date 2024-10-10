"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependencia = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const subsedeModel_1 = require("./subsedeModel");
const equipoModel_1 = require("./equipoModel");
const ambienteModel_1 = require("./ambienteModel");
let Dependencia = class Dependencia extends typeorm_1.BaseEntity {
};
exports.Dependencia = Dependencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_dependencia' }),
    __metadata("design:type", Number)
], Dependencia.prototype, "idDependencia", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    (0, class_validator_1.Length)(3, 50, { message: "El nombre de la dependencia debe tener entre 3 y 50 caracteres" }),
    __metadata("design:type", String)
], Dependencia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subsedeModel_1.Subsede, (subsede) => subsede.dependencias),
    (0, typeorm_1.JoinColumn)({ name: 'id_subsede' }),
    __metadata("design:type", subsedeModel_1.Subsede)
], Dependencia.prototype, "subsede", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.dependencia),
    __metadata("design:type", Array)
], Dependencia.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ambienteModel_1.Ambiente, (ambiente) => ambiente.dependencia),
    __metadata("design:type", Array)
], Dependencia.prototype, "ambientes", void 0);
exports.Dependencia = Dependencia = __decorate([
    (0, typeorm_1.Entity)('dependencias')
], Dependencia);
