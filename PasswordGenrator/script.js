let passwordDisplay = document.querySelector(".password");
const copyButton = document.querySelector(".copybtn");
const slider = document.querySelector(".slider");
 const PasswordLength = document.querySelector(".Password-Length");
 const UpperCaseCheckbox = document.querySelector(".Uppercase");
 const LowerCaseCheckbox = document.querySelector(".Lowercase");
 const NumbersCheckBox = document.querySelector(".Numbers");
 const SymbolsCheckbox = document.querySelector(".Symbols");
 const strengthIndicator = document.querySelector(".strength-light") 
 const GeneratePassword = document.querySelector(".Generate-password");
 const Symbols = '!@#$%^&*()_+{}~|}=-'
let password = ""
let passwordSize = 10;
let counter = 1;
inputSlider()

function inputSlider(){
    slider.value = passwordSize;
    PasswordLength.innerText = passwordSize;
}
function strengthLight(color){
    strengthIndicator.style.backgroundColor = color;
}
function GenerateRandomNum(min , max){
  return  Math.floor(Math.random() * (max-min)) + min;
} 
// getting a number 
function GetramdomNumber(){
return GenerateRandomNum(0,9)
} 
// getting a lowercase 
function GetrandomUppercase(){
    return String.fromCharCode(GenerateRandomNum(97,122));
}
// getting a UPPERCASE 
function GetrandomUppercase(){
    return String.fromCharCode(GenerateRandomNum(65,90));
}
// getting a symbol
function GetrandomSymbol(){
    let symbolindex = GenerateRandomNum(0 , Symbols.length)
    return Symbols.charAt(symbolindex);
}









