import { Injectable, NotFoundException } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CreateCarDto } from './car.create.dto';
import { CarCreateInput } from './car.interface';

@Injectable()
export class CarService {
  constructor(private readonly repo: CarRepository) {}

  async findAll() {
    return await this.repo.findAll();
  }

  async findById(id: string) {
    const car = await this.repo.findById(id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  async delete(id: string) {
    const car = await this.repo.findById(id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return this.repo.delete(car.id);
  }

  async create(dto: CreateCarDto & { ownerId: string }) {
    return this.repo.create(dto as CarCreateInput);
  }
}
