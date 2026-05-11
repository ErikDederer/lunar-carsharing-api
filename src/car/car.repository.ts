import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Car } from '@prisma/client';
import { CarCreateInput } from './car.interface';

@Injectable()
export class CarRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Car[]> {
    return this.prisma.car.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: number): Promise<Car | null> {
    return this.prisma.car.findUnique({
      where: { id },
    });
  }

  delete(id: number): Promise<Car | null> {
    return this.prisma.car.delete({ where: { id } });
  }

  create(data: CarCreateInput) {
    return this.prisma.car.create({ data });
  }
}
