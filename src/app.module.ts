import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { UsersModule } from './users/users.module';
import { AvailabilityModule } from './availability/availability.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CarModule,
    UsersModule,
    AvailabilityModule,
    BookingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
