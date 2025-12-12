import { CatalogsService } from './catalogs.service';
export declare class CatalogsController {
    private catalogsService;
    constructor(catalogsService: CatalogsService);
    create({ name, description }: {
        name: string;
        description: string;
    }, user: any): Promise<import("mongoose").Document<unknown, {}, import("./catalog.schema").Catalog, {}, {}> & import("./catalog.schema").Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./catalog.schema").Catalog, {}, {}> & import("./catalog.schema").Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./catalog.schema").Catalog, {}, {}> & import("./catalog.schema").Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, { name, description, status }: any): Promise<import("mongoose").Document<unknown, {}, import("./catalog.schema").Catalog, {}, {}> & import("./catalog.schema").Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=catalogs.controller.d.ts.map