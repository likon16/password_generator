const inputSlider=document.querySelector("[data-lengthSlider]");

const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passordDisplay=document.querySelector("[data-passwordDisplay]");

const copyBtn =document.querySelector("[data-copyBtn]");
const copyMsg=document.querySelector("[data-copyMsg]");


const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator =document.querySelector("[data-indeCator]");
const generateBtn=document.querySelector("#generate-btn");

const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*~`<>,=+-.(){}[]|\/?;:';



let password="";
let passwordLength=10;
let checkCount =0;
useSlider();







function useSlider(){

inputSlider.value=passwordLength;
lengthDisplay.innerText = passwordLength;
//or kuch v karna chaiye
}


function setIndicator(color){
    indicator.style.backgroundColor=color;

}


function getRandomInt(min,max){
  return Math.floor( Math.random()*(max-min))+min
}
function generateRandomNumber(){
    return  getRandomInt(0,9);
}
function generateLowercase(){
   return String.fromCharCode(getRandomInt(97,123));
}  





function generateUppercase(){
   return String.fromCharCode(getRandomInt(65,91));
 } 
 
 


 function generateSymbol(){
    const randNum=getRandomInt(0,symbols.length);
    return symbols.charAt(randNum);

 }

 function calcStrength(){

    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;
   if(uppercaseCheck.checked) hasUpper=true; 
   if(lowercaseCheck.checked) hasLower=true;
   if(numbersCheck.checked) hasNumber=true;
   if(symbolsCheck.checked) hasSymbol=true;

   if(hasUpper && hasLower&&(hasNumber||hasSymbol)&&passwordLength>=8){
    setIndicator("0f0");
   }else if(
    (hasLower||hasUpper)&&(hasNumber||hasSymbol)&&passwordLength>=6
   ){
    setIndicator("ff7");

   }else{
    setIndicator("f7f");
   }

 }
 
 async function copyContent(){


try{
    await navigator.clipboard.writeText(passordDisplay.value);
    copyMsg.innerText="Copied";

}


   catch(e){
    copyMsg.innerText="Error";

   }

  
   copyMsg.classList.add("active");
   setTimeout(() => {
    copyMsg.classList.remove("active");
   }, 700);
 }


 function shufflePassword(array){


   //Fisher yates method

for(let i=array.length-1;i>0; i--){
   const j=Math.floor(Math.random()*(i+1));
   const temp  =array[i];
   array[i] = array[j];
   array[j] = temp;
}
let str ="";
array.forEach((el) => (str += el));
return str; 


 }

 function handleCheckBoxChange(){

   checkCount=0;
   
   allCheckBox.forEach( (checkbox) => {
      if(checkbox.checked)
         checkCount++;
   });


   if(passwordLength<checkCount){
      passwordLength=checkCount;
      useSlider();
 }

 } 


 allCheckBox.forEach( (checkbox)=>{
   checkbox.addEventListener('change',handleCheckBoxChange);
 });
 
 inputSlider.addEventListener('input',(e)=>{

    passwordLength = e.target.value;
    useSlider();

 })

 copyBtn.addEventListener('click',()=>{
    if(passordDisplay.value)
        copyContent();
 })

 generateBtn.addEventListener('click',()=>{


   //none of the check box selected
 
    if(checkCount ==0)
      return ;

    if(passwordLength<checkCount){
      passwordLength=checkCount;
      useSlider();

    }


password="";





let funcArr=[];
if(uppercaseCheck.checked)
   funcArr.push(generateUppercase);


if(lowercaseCheck.checked)
   funcArr.push(generateLowercase);

   if(numbersCheck.checked)
funcArr.push(generateRandomNumber);


if(symbolsCheck.checked)
   funcArr.push(generateSymbol); 


///compulsory addition

for( let i =0; i<funcArr.length; i++){
   password += funcArr[i]()

}

//remaining addition
for(let j = 0; j < passwordLength-funcArr.length; j++) {
   let randIndex=getRandomInt(0,funcArr.length);
   password +=funcArr[randIndex]();
}


//shuggle the passwprd
password =shufflePassword(Array.from(password));

//show ui
 
 passordDisplay.value=password;

 //calculate strength


calcStrength();

 });





 


