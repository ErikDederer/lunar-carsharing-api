import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthResponse } from './auth.types';
import { toUserResponse } from './auth.mapper';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const email = dto.email.toLowerCase().trim();

    const existing = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        hashed,
      },
    });

    const accessToken = this.jwt.sign({ sub: user.id, email: user.email });
    return { accessToken, user: toUserResponse(user) };
  }

  logout(): { message: string } {
    return { message: 'Logged out successfully' };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const email = dto.email.toLowerCase().trim();

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await compare(dto.password, user.hashed);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isBlocked) {
      throw new ForbiddenException('Account is blocked');
    }

    const accessToken = this.jwt.sign({ sub: user.id, email: user.email });
    return { accessToken, user: toUserResponse(user) };
  }
}
