import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    register(email: string, password: string): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
        };
        access_token: string;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
        };
        access_token: string;
    }>;
    validateUser(userId: string): Promise<import("mongoose").FlattenMaps<import("../schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map