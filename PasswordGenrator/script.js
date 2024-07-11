const passwordDisplay = document.querySelector(".password");
const copyButton = document.querySelector(".copybtn");
const slider = document.querySelector(".slider");
 const PasswordLength = document.querySelector(".Password-Length");
 const UpperCaseCheckbox = document.querySelector(".Uppercase");
 const LowerCaseCheckbox = document.querySelector(".Lowercase");
 const NumbersCheckBox = document.querySelector(".Numbers");
 const SymbolsCheckbox = document.querySelector(".Symbols");
 const strengthIndicator = document.querySelector(".strength-light") 
 const Symbols = '!@#$%^&*()_+{}~|}=-';
 const copiedmsg = document.querySelector(".copyMsg");
let allcheckboxes = document.querySelectorAll(".checkboxes");
const  Generatepassword = document.querySelector(".Generate-password");


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//ste strength circle color to grey
strengthLight("#ccc");


function handleSlider() {
    slider.value = password;
    PasswordLength.innerText = password;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ( (PasswordLength - min)*100/(max - min)) + "% 100%"

}
function strengthLight(color){
    strengthIndicator.style.backgroundColor = color;
    strengthIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function GenerateRandomNum(min , max){
  return  Math.floor(Math.random() * (max-min)) + min;
} 
// getting a number 
function GetramdomNumber(){
return GenerateRandomNum(0,9)
} 
// getting a lowercase 
function Getrandomlowercase(){
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
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (UpperCaseCheckbox.checked) hasUpper = true;
    if (LowerCaseCheckbox.checked) hasLower = true;
    if (NumbersCheckBox.checked) hasNumber = true;
    if (SymbolsCheckbox.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        strengthLight("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        PasswordLength >= 6
    ) {
        strengthLight("#ff0");
    } else {
        strengthLight("#f00");
    }
}
async  function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
       copiedmsg.innerText = "copied"
    }
    catch(e){
        copiedmsg.innerText = "error"
    }
    copiedmsg.classList.add("active")
   setTimeout(() => {
    copiedmsg.classList.remove("active")
   }, 2000);
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckboxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (PasswordLength < checkCount) {
        PasswordLength = checkCount;
        handleSlider();
    }
}

allcheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
slider.addEventListener('input', (event) => {
   
    password = event.target.value;

    handleSlider();
});
copyButton.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

 Generatepassword.addEventListener('click', function(){
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(PasswordLength < checkCount) {
        PasswordLength = checkCount;
        handleSlider();
    }
    //remove old password
    password = "";

    let funcArr = [];

    if(UpperCaseCheckbox.checked)
        funcArr.push(GetrandomUppercase);

    if(LowerCaseCheckbox.checked)
        funcArr.push(Getrandomlowercase);

    if(NumbersCheckBox.checked)
        funcArr.push(Getrandomlowercase);

    if(SymbolsCheckbox.checked)
        funcArr.push(GetrandomSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
   

    //remaining adddition
    for(let i=0; i<PasswordLength-funcArr.length; i++) {
        let randIndex = GenerateRandomNum(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
   
    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in UI
    passwordDisplay.value = password;
   
    //calculate strength
    calcStrength();
});