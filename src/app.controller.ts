import { IsNumber } from 'class-validator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { max } from 'rxjs';

@Controller()
@ApiTags('default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  // 获取好的牌组
  @Get('/goodDeck')
  getGoodDeck(@Query() count: string) {
    let num = 19;
    if (!isNaN(Number(count))) {
      num = Number(count) > 19 ? 19 : Number(count);
    }

    // 初始化牌库
    // 13 种牌： A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
    // 为方便运算，先令 A = 1, J = 11, Q = 12, K = 13
    // 4 种花色: 红桃, 方块, 黑桃, 梅花
    const cardKindArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    const flowerKindArray = ['红桃', '方块', '黑桃', '梅花'];
    let cardLibrary:Object[] = [];
    for (let i = 0; i < cardKindArray.length; i++) {
      for (let j = 0; j < flowerKindArray.length; j++) {
        cardLibrary.push({
          card: cardKindArray[i],
          flower: flowerKindArray[j]
        })
      }
    }

    // 判断数字是否小于 3，如果小于 3，那么 组不出牌组
    if (num < 3) return '牌数小于3'

    // 获取 num 个数值为 0-52之间的整数
    let arr = getRandomNumberArray([], num, 52);
    
    // 根据上面的到的随机数数组选出牌库中对应的牌
    let selectedCard:Object[] = [];
    selectedCard = cardLibrary.filter((item, index) => {
      if (arr.indexOf(index) >= 0) {
        return item;
      }
    })

    // 根据以选择的牌组 得到不同的 组合，并比较出最大值，的到 最优的组合列表
    // 设一副包含点数从A到K,四种花色的52张牌,
    // 将 三张及以上同点数不同花色的牌组 或者三张以及上的同花顺称为 `组合`,
    // 求出给定一副20张以内的牌中,所能形成的最优的组合列表(最优即组合点数累加最大)
    let obj1:Object = {};
    let obj2:Object = {};
    // 第一种情况根据点数分组
    // 第二种情况根据花色分组
    // 两种情况都可以，所以牌可以复用
    for (let i = 0; i < selectedCard.length; i++) {
      let item = selectedCard[i];
      // 同点数不同花色
      let keys1 = Object.keys(obj1);
      if (keys1.includes(item['card'])) {
        obj1[item['card']].push(item);
      } else {
        obj1[item['card']] = [];
        obj1[item['card']].push(item);
      }
      // 同花顺
      let keys2 = Object.keys(obj2);
      if (keys2.includes(item['flower'])) {
        obj2[item['flower']].push(item);
      } else {
        obj2[item['flower']] = [];
        obj2[item['flower']].push(item);
      }
    }

    // console.log('----', obj2)


    let keys1 = Object.keys(obj1);
    let max1 = 0;
    let maxGroup1 = [];
    for (let i = 0; i < keys1.length; i++) {
      if (obj1[keys1[i]].length >= 3) {
        let tempArr = obj1[keys1[i]];
        let total = 0;
        for (let j = 0; j < tempArr.length; j++) {
          let item = tempArr[j];
          let cardNum = Number(item.card);
          total += cardNum;
        }
        if (total > max1) {
          max1 = total;
          maxGroup1 = tempArr;
        }
      }
    }

    let keys2 = Object.keys(obj2);
    let max2 = 0;
    let maxGroup2 = [];
    let tempGroups = [];
    for (let i = 0; i < keys2.length; i++) {
      if (obj2[keys2[i]].length >= 3) {
        let tempArr = obj2[keys2[i]];
        let tempGroup = [];
        let tempNumArr = tempArr.map(item => Number(item.card));
        tempNumArr = quickSort(tempNumArr); // 将数组从小到大进行排序，方便后续操作
        // [2, 4, 5, 6 , 8, 11]
        // 1, 4, 5, 6, 9, 10, 11
        // [4, 5,6 , 10, 11]
        let flag = tempNumArr[0]; // 标记数值，初始为最小值 4
        // console.log('---------', tempNumArr);
        let continueNumber = 0; // 连续递增的次数，初始为0
        for (let e in tempNumArr) { // e 是数组的下标
          let n = tempNumArr[e];
          if (n === flag) {
            continueNumber++;
            tempGroup.push(tempArr[e]);
            flag++; 
          } else {
            if (continueNumber < 3) {
              continueNumber = 1;
              tempGroup = [];
              tempGroup.push(tempArr[e]);
            } else {
              tempGroups.push(tempGroup);
              continueNumber = 1;
              tempGroup = [];
              tempGroup.push(tempArr[e]);
            }
            flag = n + 1;
          }
        }
        if (continueNumber >= 3) {
          tempGroups.push(tempGroup);
        }
      }

    }

    tempGroups.forEach(item => {
      let tempNum = item.map(i => Number(i.card)).reduce((a, b) => a + b);
      if (max2 < tempNum) {
        max2 = tempNum;
        maxGroup2 = item;
      }
    });

    console.log('&&&&&&&&&&&', {
      max1: max1,
      maxGroup1: maxGroup1,
      max2: max2,
      maxGroup2: maxGroup2
    });

    let tempCardArray = ['1', '11', '12', '13'];
    if (max1 > max2) {
      return {
        success: true,
        max: max1,
        msg: `所选牌组最优组合累计最大点数为: ${max1}`,
        list: maxGroup1.map(item => {
          return {
            card: tempCardArray.includes(item.card) ? transformCard(item.card) : item.card,
            flower: item.flower
          }
        })
      }
    } else if (max1 < max2) {
      return {
        success: true,
        max: max2,
        msg: `所选牌组最优组合累计最大点数为: ${max2}`,
        list: maxGroup2.map(item => {
          return {
            card: tempCardArray.includes(item.card) ? transformCard(item.card) : item.card,
            flower: item.flower
          }
        })
      }
    } else {
      return {
        success: true,
        max: max2,
        msg: `所选牌组最优组合累计最大点数为: ${max2}`,
        list: maxGroup1.map(item => {
          return {
            card: tempCardArray.includes(item.card) ? transformCard(item.card) : item.card,
            flower: item.flower
          }
        }).concat(maxGroup2.map(item => {
          return {
            card: tempCardArray.includes(item.card) ? transformCard(item.card) : item.card,
            flower: item.flower
          }
        }))
      }
    }


    

    return '123';
  }
  
}


function getRandomNumberArray(arr = [], count = 0, total = 52) {
  if (count > total) return [];
  if (arr.length === count) return arr;
  let a = Math.floor(Math.random() * total); 
  if (arr.indexOf(a) === -1) {
    arr.push(a)
  }

  return getRandomNumberArray(arr, count)
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivotIndex = Math.floor(arr.length / 2) ;
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++){
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};

function transformCard(card = '') {
  let result = '';
  switch (card) {
    case '1':
      result =  'A';
      break;
    case '11':
      result = 'J';
      break;
    case '12':
      result = 'Q';
      break;
    case '13':
      result = 'K';
      break;
    default:
      break;
  }
  return result;
}