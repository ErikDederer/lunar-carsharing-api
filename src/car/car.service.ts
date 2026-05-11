import { Injectable, NotFoundException } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CreateCarDto } from './car.create.dto';

@Injectable()
export class CarService {
  constructor(private readonly repo: CarRepository) {}

  async findAll() {
    return await this.repo.findAll();
  }

  async findById(id: number) {
    const car = await this.repo.findById(id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  async delete(id: number) {
    const car = await this.repo.findById(id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return this.repo.delete(car.id);
  }

  async create(dto: CreateCarDto) {
    return this.repo.create(dto);
  }
}
