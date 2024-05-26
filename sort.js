import inquirer from "inquirer";
import chalk from "chalk";
const sleep = (ms = 2000) => setTimeout(() => ms);
function welcome() {
    console.log(`
        ${chalk.blue.bold.underline("Game Rules")}
        - This program will take unlimited number from users
        - User will provide the type of sorting
        - This program will sort the input numbers based on the type of sorting selected by the user
    `);
    sleep();
}
function array_sort(sortType, ...arr) {
    let temp;
    let compare;
    let op = sortType.toLowerCase() == "ascending" ? compare = (a, b) => a > b : compare = (a, b) => a < b;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (compare(arr[i], arr[j])) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
async function main() {
    let completed = false;
    let input = await inquirer.prompt([{
            name: "sortList",
            type: "input",
            message: "Please provide a comma separated list of numbers"
        },
        {
            name: "sortType",
            type: "list",
            message: "Please select a sorting type",
            choices: ["Ascending", "Descending"]
        }]);
    let inputSortType = input.sortType;
    let inputSortList = input.sortList.split(",").map((x) => parseInt(x));
    let sortedArray = array_sort(inputSortType, ...inputSortList);
    console.log(sortedArray);
    let ans = await inquirer.prompt([{
            type: "confirm",
            name: "askAgain",
            message: "Do you want to do it again? Press (Y/N)",
            default: true
        }]);
    if (ans.askAgain) {
        console.log("\n\n");
        main();
    }
}
;
console.clear();
welcome();
main();
