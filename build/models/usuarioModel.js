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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const rolModel_1 = require("./rolModel");
const mantenimientoModel_1 = require("./mantenimientoModel");
const estadoModel_1 = require("./estadoModel");
const IsBeforeConstraint_1 = require("../validators/IsBeforeConstraint");
let Usuario = class Usuario extends typeorm_1.BaseEntity {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 80 }),
    (0, class_validator_1.Length)(4, 20, { message: "El nombre de usuario debe tener entre 4 y 20 caracteres" }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'fecha_inicio' }),
    (0, IsBeforeConstraint_1.IsBefore)('fechaFin', { message: "La fecha de inicio debe ser anterior a la fecha de fin" }),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'fecha_fin' }),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Usuario.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 80 }),
    (0, class_validator_1.IsEmail)({}, { message: "Debe proporcionar un correo electrónico válido" }),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(6, 100, { message: "La contraseña debe tener al menos 6 caracteres" }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasenia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "tokenRestablecerContrasenia", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Usuario.prototype, "tokenRestablecerExpiracion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => rolModel_1.Rol, rol => rol.usuarios),
    (0, typeorm_1.JoinTable)({
        name: 'roles_usuarios',
        joinColumn: { name: 'usuario_documento', referencedColumnName: 'documento' },
        inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], Usuario.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mantenimientoModel_1.Mantenimiento, (mantenimiento) => mantenimiento.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "mantenimientos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estadoModel_1.Estado, (estado) => estado.usuario),
    (0, typeorm_1.JoinColumn)({ name: 'estado_id' }),
    __metadata("design:type", estadoModel_1.Estado)
], Usuario.prototype, "estado", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
