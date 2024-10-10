"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBefore = IsBefore;
const class_validator_1 = require("class-validator");
let IsBeforeConstraint = class IsBeforeConstraint {
    validate(propertyValue, args) {
        if (!(propertyValue instanceof Date)) {
            propertyValue = new Date(propertyValue);
        }
        let relatedValue = args.object[args.constraints[0]];
        if (!(relatedValue instanceof Date)) {
            relatedValue = new Date(relatedValue);
        }
        return propertyValue < relatedValue;
    }
    defaultMessage(args) {
        return `La fecha ${args.property} debe ser anterior a ${args.constraints[0]}`;
    }
};
IsBeforeConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsBeforeConstraint);
function IsBefore(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsBeforeConstraint,
        });
    };
}
