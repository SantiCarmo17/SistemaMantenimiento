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
exports.Equipo = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const tipoEquipoModel_1 = require("./tipoEquipoModel");
const cuentaDanteModel_1 = require("./cuentaDanteModel");
const estadoModel_1 = require("./estadoModel");
const chequeoModel_1 = require("./chequeoModel");
const mantenimientoModel_1 = require("./mantenimientoModel");
const sedeModel_1 = require("./sedeModel");
const subsedeModel_1 = require("./subsedeModel");
const dependenciaModel_1 = require("./dependenciaModel");
const ambienteModel_1 = require("./ambienteModel");
let Equipo = class Equipo extends typeorm_1.BaseEntity {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
exports.Equipo = Equipo;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Equipo.prototype, "serial", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 60 }),
    (0, class_validator_1.Length)(2, 20, { message: "La marca debe tener entre 2 y 20 caracteres" }),
    __metadata("design:type", String)
], Equipo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    (0, class_validator_1.Length)(4, 50, { message: "La referencia debe tener entre 4 y 20 caracteres" }),
    __metadata("design:type", String)
], Equipo.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'fecha_compra' }),
    __metadata("design:type", Date)
], Equipo.prototype, "fechaCompra", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 30, name: 'placa_sena' }),
    (0, class_validator_1.Length)(6, 20, { message: "La placa debe tener entre 4 y 20 caracteres" }),
    __metadata("design:type", String)
], Equipo.prototype, "placaSena", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Equipo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Equipo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipoEquipoModel_1.TipoEquipo, (tipoEquipo) => tipoEquipo.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'tipo_id' }),
    __metadata("design:type", tipoEquipoModel_1.TipoEquipo)
], Equipo.prototype, "tipoEquipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cuentaDanteModel_1.CuentaDante, (cuentadante) => cuentadante.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'cuentadante_documento' }),
    __metadata("design:type", cuentaDanteModel_1.CuentaDante)
], Equipo.prototype, "cuentaDante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estadoModel_1.Estado, (estado) => estado.equipo),
    (0, typeorm_1.JoinColumn)({ name: 'estado_id' }),
    __metadata("design:type", estadoModel_1.Estado)
], Equipo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chequeoModel_1.Chequeo, (chequeo) => chequeo.equipo),
    __metadata("design:type", Array)
], Equipo.prototype, "chequeos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sedeModel_1.Sede, (sede) => sede.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'sede_id' }),
    __metadata("design:type", sedeModel_1.Sede)
], Equipo.prototype, "sede", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subsedeModel_1.Subsede, (subsede) => subsede.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'subsede_id' }),
    __metadata("design:type", subsedeModel_1.Subsede)
], Equipo.prototype, "subsede", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dependenciaModel_1.Dependencia, (dependencia) => dependencia.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'dependencia_id' }),
    __metadata("design:type", dependenciaModel_1.Dependencia)
], Equipo.prototype, "dependencia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ambienteModel_1.Ambiente, (ambiente) => ambiente.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'ambiente_id' }),
    __metadata("design:type", ambienteModel_1.Ambiente)
], Equipo.prototype, "ambiente", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => mantenimientoModel_1.Mantenimiento, mantenimiento => mantenimiento.equipos),
    (0, typeorm_1.JoinTable)({
        name: 'mantenimientos_equipos',
        joinColumn: { name: 'equipo_serial', referencedColumnName: 'serial' },
        inverseJoinColumn: { name: 'mantenimiento_id', referencedColumnName: 'idMantenimiento' }
    }),
    __metadata("design:type", Array)
], Equipo.prototype, "mantenimientos", void 0);
exports.Equipo = Equipo = __decorate([
    (0, typeorm_1.Entity)('equipos'),
    __metadata("design:paramtypes", [Object])
], Equipo);
