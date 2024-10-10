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
exports.Subsede = void 0;
const typeorm_1 = require("typeorm");
const equipoModel_1 = require("./equipoModel");
const class_validator_1 = require("class-validator");
const dependenciaModel_1 = require("./dependenciaModel");
const sedeModel_1 = require("./sedeModel");
let Subsede = class Subsede extends typeorm_1.BaseEntity {
};
exports.Subsede = Subsede;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_subsede' }),
    __metadata("design:type", Number)
], Subsede.prototype, "idSubsede", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    (0, class_validator_1.Length)(3, 50, { message: "El nombre de la subsede debe tener entre 3 y 50 caracteres" }),
    __metadata("design:type", String)
], Subsede.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.subsede),
    __metadata("design:type", Array)
], Subsede.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sedeModel_1.Sede, (sede) => sede.subsedes),
    (0, typeorm_1.JoinColumn)({ name: 'id_sede' }),
    __metadata("design:type", sedeModel_1.Sede)
], Subsede.prototype, "sede", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dependenciaModel_1.Dependencia, (dependencia) => dependencia.subsede),
    __metadata("design:type", Array)
], Subsede.prototype, "dependencias", void 0);
exports.Subsede = Subsede = __decorate([
    (0, typeorm_1.Entity)('subsedes')
], Subsede);
