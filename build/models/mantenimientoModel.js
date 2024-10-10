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
exports.Mantenimiento = void 0;
const typeorm_1 = require("typeorm");
const usuarioModel_1 = require("./usuarioModel");
const equipoModel_1 = require("./equipoModel");
const class_validator_1 = require("class-validator");
const IsBeforeConstraint_1 = require("../validators/IsBeforeConstraint");
const chequeoModel_1 = require("./chequeoModel");
let Mantenimiento = class Mantenimiento extends typeorm_1.BaseEntity {
};
exports.Mantenimiento = Mantenimiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_mantenimiento' }),
    __metadata("design:type", Number)
], Mantenimiento.prototype, "idMantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, class_validator_1.Length)(5, 200, { message: "El objetivo debe tener entre 5 y 200 caracteres" }),
    __metadata("design:type", String)
], Mantenimiento.prototype, "objetivo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Mantenimiento.prototype, "tipoMantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'fecha_prox_mantenimiento' }),
    __metadata("design:type", Date)
], Mantenimiento.prototype, "fechaProxMantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'fecha_ultimo_mantenimiento' }),
    (0, IsBeforeConstraint_1.IsBefore)('fechaProxMantenimiento', { message: "La fecha debe ser anterior a la fecha del próximo mantenimiento" }),
    __metadata("design:type", Date)
], Mantenimiento.prototype, "fechaUltimoMantenimiento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuarioModel_1.Usuario, (usuario) => usuario.mantenimientos),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_documento' }),
    __metadata("design:type", usuarioModel_1.Usuario)
], Mantenimiento.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => equipoModel_1.Equipo, equipo => equipo.mantenimientos),
    __metadata("design:type", Array)
], Mantenimiento.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chequeoModel_1.Chequeo, chequeo => chequeo.mantenimiento),
    __metadata("design:type", Array)
], Mantenimiento.prototype, "chequeos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Mantenimiento.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Mantenimiento.prototype, "updatedAt", void 0);
exports.Mantenimiento = Mantenimiento = __decorate([
    (0, typeorm_1.Entity)('mantenimientos')
], Mantenimiento);
