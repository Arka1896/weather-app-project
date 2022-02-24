//console.log('Client Side Java Script Loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
  
//     response.json().then((data)=>{
//        console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=kolkata').then((response)=>{
  
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.weather)
//             console.log(data.location)
//         }
       
//     })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const firstMessage=document.querySelector('#message-1')
const SecondMessage=document.querySelector('#message-2')

//firstMessage.textContent='ERROR MESSAGE'
//SecondMessage.textContent='WEATHER FORECAST'

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location=search.value

  //console.log('testing!!')
  //console.log(location)

  firstMessage.textContent='Loading.....'
  SecondMessage.textContent=''
  const fetchURL="http://localhost:3000/weather?address="+location
  fetch(fetchURL).then((response)=>{
      response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            firstMessage.textContent=data.error
            
        }else{
            console.log(data.weather)
            console.log(data.location)
            firstMessage.textContent=data.location
            SecondMessage.textContent=data.weather
        }
      })
  })
})