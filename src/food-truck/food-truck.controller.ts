import { Controller, Get, Query } from '@nestjs/common';
import { FoodTruckService } from './food-truck.service';

@Controller('food-truck')
export class FoodTruckController {
  constructor(private readonly foodTruckService: FoodTruckService) {}

  @Get('/search')
  async search (
    @Query('input') input: string = ''
  ) {
    const result = input ? (await this.foodTruckService.getListByUserInput(input)) : [];
    return result;
  }
}
