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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const catalog_schema_1 = require("./catalog.schema");
let CatalogsService = class CatalogsService {
    constructor(catalogModel) {
        this.catalogModel = catalogModel;
    }
    async create(name, description, userId) {
        const catalog = new this.catalogModel({
            name,
            description,
            createdBy: userId,
        });
        return await catalog.save();
    }
    async findAll() {
        return await this.catalogModel.find().populate('createdBy', 'email').sort({ createdAt: -1 });
    }
    async findById(id) {
        return await this.catalogModel.findById(id).populate('createdBy', 'email');
    }
    async update(id, name, description, status) {
        return await this.catalogModel.findByIdAndUpdate(id, { name, description, status }, { new: true });
    }
    async delete(id) {
        return await this.catalogModel.findByIdAndDelete(id);
    }
};
exports.CatalogsService = CatalogsService;
exports.CatalogsService = CatalogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(catalog_schema_1.Catalog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CatalogsService);
//# sourceMappingURL=catalogs.service.js.map