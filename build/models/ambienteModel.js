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
exports.Ambiente = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const dependenciaModel_1 = require("./dependenciaModel");
const equipoModel_1 = require("./equipoModel");
let Ambiente = class Ambiente extends typeorm_1.BaseEntity {
};
exports.Ambiente = Ambiente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_ambiente' }),
    __metadata("design:type", Number)
], Ambiente.prototype, "idAmbiente", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    (0, class_validator_1.Length)(3, 50, { message: "El nombre del ambiente debe tener entre 3 y 50 caracteres" }),
    __metadata("design:type", String)
], Ambiente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.ambiente),
    __metadata("design:type", Array)
], Ambiente.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dependenciaModel_1.Dependencia, (dependencia) => dependencia.ambientes),
    (0, typeorm_1.JoinColumn)({ name: 'id_dependencia' }),
    __metadata("design:type", dependenciaModel_1.Dependencia)
], Ambiente.prototype, "dependencia", void 0);
exports.Ambiente = Ambiente = __decorate([
    (0, typeorm_1.Entity)('ambientes')
], Ambiente);
