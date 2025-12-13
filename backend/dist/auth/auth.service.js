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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async register(email, password) {
        // Verifica se usuário já existe
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('Usuário já existe');
        }
        // Cria novo usuário
        const user = await this.usersService.create(email, password);
        // Gera token JWT
        const token = this.jwtService.sign({
            sub: user._id,
            email: user.email,
        });
        return {
            message: 'Usuário registrado com sucesso',
            user: {
                id: user._id,
                email: user.email,
            },
            access_token: token,
        };
    }
    async login(email, password) {
        // Busca usuário
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        // Verifica senha (em produção, usar bcrypt)
        if (user.password !== password) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        // Gera token JWT
        const token = this.jwtService.sign({
            sub: user._id,
            email: user.email,
        });
        return {
            message: 'Login realizado com sucesso',
            user: {
                id: user._id,
                email: user.email,
            },
            access_token: token,
        };
    }
    async validateUser(userId) {
        return this.usersService.findById(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map