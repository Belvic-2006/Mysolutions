function openCalculator(){
    window.open('Calculator.html','_blank')
}

function add(){
    
let num1 = Number(document.getElementById("num1").value);
let num2 = Number(document.getElementById("num2").value);
    let sum = num1 + num2;
    document.getElementById("result").innerHTML = `${sum}`;
}

function sub(){
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    document.getElementById("result").innerHTML = `${num1 - num2}`;
}

function mult(){
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    document.getElementById("result").innerHTML = `${num1 * num2}`;
}

function clearAll(){
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("result").innerHTML = "";
}