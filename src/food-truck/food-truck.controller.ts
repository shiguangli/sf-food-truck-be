import { Controller, Get, Query } from '@nestjs/common';
import { FoodTruckService } from './food-truck.service';

@Controller('food-truck')
export class FoodTruckController {
  constructor(private readonly foodTruckService: FoodTruckService) {}

  @Get('/search')
  async search (
    @Query('input') input: string = ''
  ) {
    const output = input ? (await this.foodTruckService.getListByUserInput(input)) : [];
    return output;
  }

  @Get('/convert-rsql-to-ast')
  async convertRsqlToAst (
    @Query('input') input: string = ''
  ) {
    const output = await this.foodTruckService.analyzeRsqlString(input)
    console.log(`ft ctrl - convert - input: ${input} -- output: ${output}`)
    return output
  }
}
