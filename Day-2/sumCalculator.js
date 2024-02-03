function calculateSum(arr) {
    let sum = 0;
    arr.forEach(element => sum += element)
    return sum;
}

const numbers = [1, 2, 3, 4, 5];
const result = calculateSum(numbers);

console.log(`The sum of the array is: ${result}`);
