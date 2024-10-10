"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estadosController_1 = __importDefault(require("../controllers/estadosController"));
const router = express_1.default.Router();
router.get('/', estadosController_1.default.listarEstados);
exports.default = router;
