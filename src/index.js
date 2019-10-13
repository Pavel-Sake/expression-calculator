function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let inputString = expr.replace(/\s/g, "");

    let arrowNumber = inputString.split("");

    let counter = 0;

    for (let i = 0; i < arrowNumber.length; i++) {
        let currentItem = arrowNumber[i];

        if (currentItem !== "-" && currentItem !== "+" && currentItem !== "*" && currentItem !== "/" && currentItem !== "(" && currentItem !== ")") {
            counter++;
        } else {
            counter = 0;
        }

        if (counter > 1) {
            arrowNumber[i] = arrowNumber[i - 1] + arrowNumber[i];
            arrowNumber.splice(i - 1, 1);
            i--;
        }
    }
    let counterOpen = 0;
    let counterClose = 0;

    for (let i = 0; i < arrowNumber.length; i++) {
        if (arrowNumber[i] === "(") {
            counterOpen++;
        }
        if (arrowNumber[i] === ")") {
            counterClose++;
        }
    }

    if (counterOpen !== counterClose) {
        throw `ExpressionError: Brackets must be paired`;
    }

    while (arrowNumber.indexOf("(") !== -1) {
        getNumber(arrowNumber);
        counterOpen++;
    }

    if (arrowNumber.indexOf("(") !== -1) {
        divisionMultiplicationAndAdditionSubtraction(arrowNumber);
    }

    while (arrowNumber.indexOf(")") !== -1) {
        counterClose++;
    }


    divisionMultiplicationAndAdditionSubtraction(arrowNumber);


    const answer = arrowNumber[0];
    return answer;
}

function getNumber(anyArrow,) {
    let newArrowNumber = [];
    let goCount = 0;
    let stopCount = 0;

    for (let i = 0; i < anyArrow.length; i++) {
        let currentItem = anyArrow[i];

        if (currentItem === "(") {
            goCount = i + 1;
        } else if (currentItem === ")") {
            stopCount = i;
            newArrowNumber = anyArrow.slice(goCount, i);
            let newArrowNumberLength = newArrowNumber.length
            anyArrow[goCount - 1] = divisionMultiplicationAndAdditionSubtraction(newArrowNumber,);
            anyArrow.splice(goCount, newArrowNumberLength + 1);
            goCount = 0;
            stopCount = 0;
            i = -1;
        }
    }

    divisionMultiplicationAndAdditionSubtraction(newArrowNumber);

    return divisionMultiplicationAndAdditionSubtraction(newArrowNumber);
}

function divisionMultiplicationAndAdditionSubtraction(anyArrow) {
    for (let i = 0; i < anyArrow.length; i++) {
        let currentItem = anyArrow[i];

        if (currentItem === "*" || currentItem === "*") {

            if (currentItem === "*") {
                let prev = anyArrow[i - 1];
                let next = anyArrow[i + 1];

                anyArrow[i] = prev * next;
                anyArrow.splice(i - 1, 1);
                anyArrow.splice(i, 1);
                i--;
            }
        }

        if (currentItem === "/") {

            if (anyArrow[i + 1] === "0") {
                    throw `TypeError: Division by zero.`
            }
            anyArrow[i] = anyArrow[i - 1] / anyArrow[i + 1];
            anyArrow.splice(i - 1, 1);
            anyArrow.splice(i, 1);
            i--;
        }
    }


    for (let i = 0; i < anyArrow.length; i++) {
        let currentItem = anyArrow[i];

        if (currentItem === "+" || currentItem === "-") {

            if (currentItem === "+") {
                anyArrow[i] = +anyArrow[i - 1] + +anyArrow[i + 1];
                anyArrow.splice(i - 1, 1);
                anyArrow.splice(i, 1);
                i--;
            }
        }
        if (currentItem === "-") {
            anyArrow[i] = anyArrow[i - 1] - anyArrow[i + 1];
            anyArrow.splice(i - 1, 1);
            anyArrow.splice(i, 1);
            i--;
        }

    }

    const result = anyArrow[0];
    return result;
}

module.exports = {
    expressionCalculator
}