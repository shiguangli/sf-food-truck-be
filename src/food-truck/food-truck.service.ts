import { Injectable } from '@nestjs/common';

import { parse } from "@rsql/parser";
// import { isComparisonNode, getSelector, getValue } from "@rsql/ast";

import mobileFoodTruckData from './mobile_food_truck.json';

const rsqlOperators = [`==`, `!=`, `<`, `>`, `<=`, `>=`, `=in=`, `=out=`]

@Injectable()
export class FoodTruckService {
  analyzeRsqlString(rsqlString: string): any {
    const exp = parse(rsqlString)
    console.log(`ft srv - alz rsql - ${exp} (${typeof exp})`)
    // TODO: 转成json格式
    // return exp
    return {}
  }
  analyzeAst (o: any): any {
    let r = {}
    const _t = o?.type.toUpperCase()
    if (_t === 'COMPARISON') {
      let _k = o?.left?.selector
      let _v = o?.right?.value
      r[_k] = o?.operator === '==' ? _v : `${o?.operator} ${_v}`
    } else if (_t === 'LOGICAL') {
      const r1 = this.analyzeAst(o.left)
      const r2 = this.analyzeAst(o.right)
      r = Object.assign(r, r1, r2)
    }
    return r
  }

  getListByUserInput(input): any[] {
    // 判断input是否为RSQL字符串（包含特殊字符）
    let isRsql = false
    rsqlOperators.forEach(o => {
      if (input.includes(o)) {
        isRsql = true
      }
    })

    const result = []

    if (isRsql) {
      const ast = this.analyzeRsqlString(input)
      console.log(`ft srv - isRsql - ast: ${ast}`)
      const fields = this.analyzeAst(ast)
      const compareFields = Object.keys(fields)
      mobileFoodTruckData.filter((truck) => {
        compareFields.forEach(field => {
          let v0 = truck[field].toLowerCase()
          let v1 = fields[field].toLowerCase()
          if (!v0.includes('=') && v0.includes(v1)) {
            result.push(truck)
          } else if (v0.includes('=')) {
            let r = false
            eval(`r=v0${v1}`)
            if (r) {
              result.push(truck)
            }
          }
        })
      })
    } else {
      mobileFoodTruckData.filter((truck) => {
        let r = false
        for (let field in truck) {
          let _t = typeof truck[field]
          let v0 = truck[field]
          if (
            ( _t == 'string' && v0.toLowerCase().includes(input.trim().toLowerCase()) ) || 
            ( _t != 'string' && (v0 == input) )
          ) {
            r = true
          }
        }
        if (r) { result.push(truck) }
      })
      return result
    }
  }
}
