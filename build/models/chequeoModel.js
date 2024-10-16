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
exports.Chequeo = void 0;
const typeorm_1 = require("typeorm");
const equipoModel_1 = require("./equipoModel");
const mantenimientoModel_1 = require("./mantenimientoModel");
let Chequeo = class Chequeo extends typeorm_1.BaseEntity {
};
exports.Chequeo = Chequeo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_chequeo' }),
    __metadata("design:type", Number)
], Chequeo.prototype, "idChequeo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Chequeo.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 150 }),
    __metadata("design:type", String)
], Chequeo.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: 'link_evidencia', length: 250 }),
    __metadata("design:type", String)
], Chequeo.prototype, "linkEvidencia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipoModel_1.Equipo, (equipo) => equipo.chequeos),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_serial' }),
    __metadata("design:type", equipoModel_1.Equipo)
], Chequeo.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mantenimientoModel_1.Mantenimiento, (mantenimiento) => mantenimiento.chequeos),
    (0, typeorm_1.JoinColumn)({ name: 'mantenimiento_id' }),
    __metadata("design:type", mantenimientoModel_1.Mantenimiento)
], Chequeo.prototype, "mantenimiento", void 0);
exports.Chequeo = Chequeo = __decorate([
    (0, typeorm_1.Entity)('chequeos')
], Chequeo);
