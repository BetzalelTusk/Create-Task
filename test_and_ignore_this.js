let variable = 0;
let sum = 0;
for (let i = 0; i < 10; i++) {
  variable = variable + 2;
  console.log(variable + " variable " + i);
  sum = sum + variable;
  console.log(sum + " sum " + i);
}
