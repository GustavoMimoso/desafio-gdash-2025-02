import { Document, Types } from 'mongoose';
export declare class Catalog extends Document {
    name: string;
    description: string;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const CatalogSchema: import("mongoose").Schema<Catalog, import("mongoose").Model<Catalog, any, any, any, Document<unknown, any, Catalog, any, {}> & Catalog & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Catalog, Document<unknown, {}, import("mongoose").FlatRecord<Catalog>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Catalog> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=catalog.schema.d.ts.map