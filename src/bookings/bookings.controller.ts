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
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { type User } from '@prisma/client';
import { BookingsService } from './bookings.service';

@Controller('/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBooking() {}

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  getMyBookings() {}

  @Get('/incoming')
  @UseGuards(JwtAuthGuard)
  getIncomingBookings() {}

  @Patch('/:id/confirm')
  @UseGuards(JwtAuthGuard)
  confirmBooking() {}

  @Patch('/:id/cancel')
  @UseGuards(JwtAuthGuard)
  cancelBooking() {}

  @Patch('/:id/complete')
  @UseGuards(JwtAuthGuard)
  completeBooking() {}
}
