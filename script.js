const equalButton=document.getElementById("equals")
const expression=document.getElementById("expression")
const answer=document.getElementById("answer")
const buttons=document.getElementsByClassName("buttons")
const clear=document.getElementById("clear")
const backspace=document.getElementById("back")

function shuntingYard(expression) {
    const precedence = {
        '+': 1,
        '-': 1,
        'x': 2,
        '÷': 2,
        '^': 3
    };

    const isOperator = (c) => ['+', '-', 'x', '÷', '^'].includes(c);

    const output = [];
    const operators = [];
    const tokens = expression.split(" ");
    console.log(tokens)
    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop();
        } else {
            while (operators.length &&
                   precedence[token] <= precedence[operators[operators.length - 1]]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        output.push(operators.pop());
    }
    console.log(output.join(" "))
    return output.join(' ');
}

function evaluateRPN(expression) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        'x': (a, b) => a * b,
        '÷': (a, b) => a / b,
        '^': (a, b) => Math.pow(a, b)
    };

    for (let token of expression.split(' ')) {
        if (token in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(parseFloat(token));
        }
    }

    return stack.pop();
}

function evaluateExpression(expression) {
    const postfixExpr = shuntingYard(expression);
    return evaluateRPN(postfixExpr);
}

let evaluationExpression=""

Array.from(buttons).forEach((element)=>{element.addEventListener('click',()=>{
    if(isNaN(element.innerText)){
        evaluationExpression+=" "+element.innerText+" "
    }
    else{
        evaluationExpression+=element.innerText
    }   
    expression.value=evaluationExpression
})})

clear.addEventListener('click',()=>{
    evaluationExpression=""
    expression.value=evaluationExpression
    answer.innerText=""
})

backspace.addEventListener('click',()=>{
    evaluationExpression=evaluationExpression.substring(0,evaluationExpression.length-1)
    expression.value=evaluationExpression
})

equalButton.addEventListener('click',()=>{
    answer.innerText=evaluateExpression(evaluationExpression)
})
