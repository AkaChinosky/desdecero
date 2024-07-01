const inputQuantity =document.querySelector('input-quantity')
const btnIncrement = document.querySelector('#incremennt')
const btnDecrement = document.querySelector('#decrement')

let valueByDefault = parseInt(inputQuantity.value)



btnIncrement.addEventListener('click', () => {
    valueByDefault+=1
    inputQuantity.value=valueByDefault
})

btnDecrement.addEventListener('click', () => {
    if(valueByDefault===1){
    return
}
    valueByDefault-=1
    inputQuantity.value=valueByDefault
})


const ToggleDescription=document.querySelector('.title-description')
const ToggleAdditionalInformation=document.querySelector('title-additional-information')

const contentDescription=document.querySelector('.text-description')
const contentAdditionalInformation=document.querySelector('text-additional-information')

ToggleDescription.addEventListener('click', () => {
    contentDescription.classList.toggle('hidden');
    
    
    })

ToggleAdditionalInformation.addEventListener('click', () => {
    contentAdditionalInformation.classList.toggle('hidden');
        
        
        })