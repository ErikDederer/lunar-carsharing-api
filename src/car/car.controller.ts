import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { type CreateCarDto, CreateCarSchema } from './car.create.dto';
import { CarService } from './car.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { type User } from '@prisma/client';

@Controller('/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMyCars(@CurrentUser() user: User) {}

  @Get('/:id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.findById(id);
  }

  @Post()
  createCar(@Body(new ZodValidationPipe(CreateCarSchema)) dto: CreateCarDto) {
    return this.carService.create(dto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateCarDto>,
    @CurrentUser() user: User,
  ) {}
}
