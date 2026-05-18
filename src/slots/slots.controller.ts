import { Controller, Delete, Get, Post } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('cars/:carId/slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  getSlots() {}

  @Post()
  addSlot() {}

  @Delete(':slotId')
  deleteSlot() {}
}
