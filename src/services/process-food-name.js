function ProcessFoodName(name){
  let arr = name.split(',');
    if (arr[arr.length - 1].includes('UPC: ') || arr[arr.length - 1].includes('GTIN: '))
      arr.pop();
    return arr.join(',')
}
export default ProcessFoodName;