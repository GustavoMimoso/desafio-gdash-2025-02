"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogsModule = void 0;
// src/catalogs/catalogs.module.ts
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const catalog_schema_1 = require("./catalog.schema");
const catalogs_service_1 = require("./catalogs.service");
const catalogs_controller_1 = require("./catalogs.controller");
let CatalogsModule = class CatalogsModule {
};
exports.CatalogsModule = CatalogsModule;
exports.CatalogsModule = CatalogsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: catalog_schema_1.Catalog.name, schema: catalog_schema_1.CatalogSchema }])],
        providers: [catalogs_service_1.CatalogsService],
        controllers: [catalogs_controller_1.CatalogsController],
    })
], CatalogsModule);
//# sourceMappingURL=catalogs.module.js.map