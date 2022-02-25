const request=require('request')

// const forecast=(latitude,longitude,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=eff1043f518a6c47b96f48ab6703387c&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
//     request({url:url,json:true},(error,response)=>{
//         if(error){
//            callback('Unable to connect to weather service!',undefined)
//         }else if(response.body.error){
//             callback('Unable to find location',undefined)
//         }
//         else{
//             callback(undefined,
//                 // {
//                 // description: response.body.current.weather_descriptions,
//                 // temperature: response.body.current.temperature,
//                 // feelslike: response.body.current.feelslike
//                 // }
//                 response.body.current.weather_descriptions+" .It is currently "+response.body.current.temperature+" degrees out.It feels like "+response.body.current.feelslike+" degrees out."
//             )
//         }
//     })
// }

//Using object Property ShortHand and Destructuring

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=eff1043f518a6c47b96f48ab6703387c&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url,json:true},(error,{body}={})=>{
        if(error){
           callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions+" .It is currently "+body.current.temperature+" degrees out.It feels like "+body.current.feelslike+" degrees out.The Humidity is "+body.current.humidity+",WindSpeed is "+body.current.wind_speed+" and Chances of Rain is "+body.current.precip+"% ."
            )
        }
    })

}
module.exports=forecast