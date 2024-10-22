const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


  
  const dropdowns= document.querySelectorAll(".dropdown select");
  const fromCurr= document.querySelector(".From select");
  const toCurr= document.querySelector(".to select");
  const msg= document.querySelector(".message");

  const btn= document.querySelector("form button");
 

   for(let select of dropdowns){
    for(  currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if(select.name==="From" && currCode==="USD"){
            newOption.selected= "selected";
        }
        else if(select.name==="To" && currCode==="INR"){
            newOption.selected= "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{

        updateFlag(evt.target);

    });
   }

   const updateExchangeRate= async ()=>{
    let amount= document.querySelector("form input");
    let amountval= amount.value;
    if(amountval==="" || amountval<1){
     amountval=1;
     amount.value=1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(fromCurr.value, toCurr.value);
 let response= await fetch(URL);
 let data= await response.json();
 let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmount=amountval * rate;
msg.innerText= `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
   }
    
   const updateFlag= (element)=>{

      let currCode= element.value;
      let countryCode= countryList[currCode];
      let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`
      let img= element.parentElement.querySelector("img");
      img.src= newSrc;
   }
          
  

   btn.addEventListener("click",  (evt)=>{
       evt.preventDefault(); 
       updateExchangeRate();
        
      
   }) 
  
   window.addEventListener("load",()=>{
    updateExchangeRate();
   }) 
