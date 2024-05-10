import { Test, TestingModule } from '@nestjs/testing';
import { FoodTruckController } from './food-truck.controller';

describe('FoodTruckController', () => {
  let controller: FoodTruckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodTruckController],
    }).compile();

    controller = module.get<FoodTruckController>(FoodTruckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
