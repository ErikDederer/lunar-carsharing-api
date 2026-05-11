import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { type User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe() {}

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Body() dto: unknown) {}

  @Post('/me/avatar')
  @UseGuards(JwtAuthGuard)
  uploadAvatar() {}

  @Post('/me/documents')
  @UseGuards(JwtAuthGuard)
  uploadDocuments() {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getUserById() {}
}
