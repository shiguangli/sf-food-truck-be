import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FoodTruckController } from './food-truck/food-truck.controller';
import { AppService } from './app.service';
import { FoodTruckService } from './food-truck/food-truck.service';

@Module({
  imports: [],
  controllers: [AppController, FoodTruckController],
  providers: [AppService, FoodTruckService],
})
export class AppModule {}
