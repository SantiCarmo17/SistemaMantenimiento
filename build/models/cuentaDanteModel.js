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
exports.CuentaDante = void 0;
const typeorm_1 = require("typeorm");
const equipoModel_1 = require("./equipoModel");
const estadoModel_1 = require("./estadoModel");
const class_validator_1 = require("class-validator");
let CuentaDante = class CuentaDante extends typeorm_1.BaseEntity {
};
exports.CuentaDante = CuentaDante;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], CuentaDante.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 80 }),
    (0, class_validator_1.Length)(4, 50, { message: "El nombre debe tener entre 4 y 50 caracteres" }),
    __metadata("design:type", String)
], CuentaDante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    (0, class_validator_1.Length)(4, 20, { message: "La dependencia debe tener entre 4 y 20 caracteres" }),
    __metadata("design:type", String)
], CuentaDante.prototype, "dependencia", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    (0, class_validator_1.Length)(4, 50, { message: "El departamento debe tener entre 4 y 50 caracteres" }),
    __metadata("design:type", String)
], CuentaDante.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30, name: "tipo_contrato" }),
    __metadata("design:type", String)
], CuentaDante.prototype, "tipoContrato", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.cuentaDante),
    __metadata("design:type", Array)
], CuentaDante.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estadoModel_1.Estado, (estado) => estado.cuentaDante),
    (0, typeorm_1.JoinColumn)({ name: 'estado_id' }),
    __metadata("design:type", estadoModel_1.Estado)
], CuentaDante.prototype, "estado", void 0);
exports.CuentaDante = CuentaDante = __decorate([
    (0, typeorm_1.Entity)('cuentadantes')
], CuentaDante);
