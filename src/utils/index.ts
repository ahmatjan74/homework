export const formatNumberAndFix2 = (num: number) => {
    let result = Number(num.toFixed(2));    
    // const itemArray = result.toString().split('');
    // if (Number(itemArray[itemArray.length - 1]) < 5) {
    //     itemArray[itemArray.length - 1] = '5';
    //     result =  Number(itemArray.join(''))
    // }
    return result;
}