import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { AvailabilityService } from './availability.service';

@Controller('/cars/:id/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  getAvailability() {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createSlot() {}

  @Delete('/:slotId')
  @UseGuards(JwtAuthGuard)
  deleteSlot() {}
}
