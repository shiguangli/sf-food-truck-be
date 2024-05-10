import { Injectable } from '@nestjs/common';

import mobileFoodTruckData from './mobile_food_truck.json';

@Injectable()
export class FoodTruckService {
  getListByUserInput(input): any[] {
    let result = []
    if (input) {
      mobileFoodTruckData.filter((truck) => {
        if (truck.FoodItems.toLowerCase().includes(input.toLowerCase())) {
          result.push(truck)
        }
      })
    } else {
      result = mobileFoodTruckData
    }
    return result
  }
}
