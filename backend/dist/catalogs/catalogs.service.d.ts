import { Model } from 'mongoose';
import { Catalog } from './catalog.schema';
export declare class CatalogsService {
    private catalogModel;
    constructor(catalogModel: Model<Catalog>);
    create(name: string, description: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Catalog, {}, {}> & Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Catalog, {}, {}> & Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Catalog, {}, {}> & Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, name: string, description: string, status: string): Promise<import("mongoose").Document<unknown, {}, Catalog, {}, {}> & Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, Catalog, {}, {}> & Catalog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=catalogs.service.d.ts.map