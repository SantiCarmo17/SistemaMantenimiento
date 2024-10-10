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
exports.Sede = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const subsedeModel_1 = require("./subsedeModel");
const equipoModel_1 = require("./equipoModel");
let Sede = class Sede extends typeorm_1.BaseEntity {
};
exports.Sede = Sede;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_sede' }),
    __metadata("design:type", Number)
], Sede.prototype, "idSede", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    (0, class_validator_1.Length)(3, 50, { message: "El nombre de la Sede debe tener entre 3 y 50 caracteres" }),
    __metadata("design:type", String)
], Sede.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipoModel_1.Equipo, (equipo) => equipo.sede),
    __metadata("design:type", Array)
], Sede.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subsedeModel_1.Subsede, (subsede) => subsede.sede),
    __metadata("design:type", Array)
], Sede.prototype, "subsedes", void 0);
exports.Sede = Sede = __decorate([
    (0, typeorm_1.Entity)('sedes')
], Sede);
