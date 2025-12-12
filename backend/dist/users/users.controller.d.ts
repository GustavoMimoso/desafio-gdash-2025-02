import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<(import("mongoose").FlattenMaps<import("../schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getUser(id: string): Promise<import("mongoose").FlattenMaps<import("../schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map