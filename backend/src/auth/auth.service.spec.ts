import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn(), verify: jest.fn() },
        },
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register user successfully', async () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'Test123!@',
      name: 'Test User',
    };

    jest.spyOn(jwtService, 'sign').mockReturnValue('token123');
    mockUserModel.create.mockResolvedValue({ _id: '123', ...registerDto });

    const result = await service.register(registerDto);
    expect(result).toHaveProperty('access_token');
  });

  it('should throw error for duplicate email', async () => {
    const registerDto = {
      email: 'existing@example.com',
      password: 'Test123!@',
      name: 'Test',
    };

    mockUserModel.findOne.mockResolvedValue({ email: 'existing@example.com' });

    await expect(service.register(registerDto)).rejects.toThrow();
  });

  it('should validate credentials on login', async () => {
    const loginDto = {
      email: 'admin@example.com',
      password: '123456',
    };

    const mockUser = {
      _id: '123',
      email: 'admin@example.com',
      password: 'hashed_password',
    };

    mockUserModel.findOne.mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('token123');

    const result = await service.login(loginDto);
    expect(result).toHaveProperty('access_token');
  });

  it('should reject invalid credentials', async () => {
    const loginDto = {
      email: 'admin@example.com',
      password: 'wrong_password',
    };

    mockUserModel.findOne.mockResolvedValue(null);

    await expect(service.login(loginDto)).rejects.toThrow();
  });
});
