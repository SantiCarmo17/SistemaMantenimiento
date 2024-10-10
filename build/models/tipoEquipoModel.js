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
exports.TipoEquipo = void 0;
const typeorm_1 = require("typeorm");
const equipoModel_1 = require("./equipoModel");
const class_validator_1 = require("class-validator");
let TipoEquipo = class TipoEquipo extends typeorm_1.BaseEntity {
};
exports.TipoEquipo = TipoEquipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TipoEquipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30 }),
    (0, class_validator_1.IsNotEmpty)({ message: "El tipo de equipo es obligatorio" }),
    (0, class_validator_1.Length)(3, 20, { message: "El tipo debe tener entre 4 y 20 caracteres" }),
    __metadata("design:type", String)
], TipoEquipo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.tipoEquipo),
    __metadata("design:type", Array)
], TipoEquipo.prototype, "equipos", void 0);
exports.TipoEquipo = TipoEquipo = __decorate([
    (0, typeorm_1.Entity)('tipo_equipos')
], TipoEquipo);
