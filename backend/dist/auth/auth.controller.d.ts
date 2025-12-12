import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
//# sourceMappingURL=auth.controller.d.ts.map