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
exports.ChequeoMantenimiento = void 0;
const typeorm_1 = require("typeorm");
const chequeoModel_1 = require("./chequeoModel");
const equipoModel_1 = require("./equipoModel");
const mantenimientoModel_1 = require("./mantenimientoModel");
let ChequeoMantenimiento = class ChequeoMantenimiento extends typeorm_1.BaseEntity {
};
exports.ChequeoMantenimiento = ChequeoMantenimiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChequeoMantenimiento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chequeoModel_1.Chequeo),
    (0, typeorm_1.JoinColumn)({ name: 'chequeo_id' }),
    __metadata("design:type", chequeoModel_1.Chequeo)
], ChequeoMantenimiento.prototype, "chequeo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipoModel_1.Equipo),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_serial' }),
    __metadata("design:type", equipoModel_1.Equipo)
], ChequeoMantenimiento.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mantenimientoModel_1.Mantenimiento),
    (0, typeorm_1.JoinColumn)({ name: 'mantenimiento_id' }),
    __metadata("design:type", mantenimientoModel_1.Mantenimiento)
], ChequeoMantenimiento.prototype, "mantenimiento", void 0);
exports.ChequeoMantenimiento = ChequeoMantenimiento = __decorate([
    (0, typeorm_1.Entity)('chequeos_mantenimientos')
], ChequeoMantenimiento);
