const request=require('request')

// const geocode=(address,callback)=>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJrYTk2IiwiYSI6ImNreXhmcWJmYjBpMHYyb3Fpd2lwemMxM3gifQ.3uKTy2uk9qL3TvqlboHmUQ&limit=1'
//     request({url:url,json:true},(error,response)=>{
//          if(error){
//            callback('Unable to connect to Geocoding service!',undefined)
//          }else if(response.body.features.length===0){
//             callback('Unable to find  Geocode.Try another search!',undefined)
//          }else{
//             callback(undefined,{
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//          }
//     })
// }

//Using object Property ShortHand and Destructuring

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJrYTk2IiwiYSI6ImNreXhmcWJmYjBpMHYyb3Fpd2lwemMxM3gifQ.3uKTy2uk9qL3TvqlboHmUQ&limit=1'
    request({url,json:true},(error,{body}={})=>{
         if(error){
           callback('Unable to connect to Geocoding service!',undefined)
         }else if(body.features.length===0){
            callback('Unable to find  Geocode.Try another search!',undefined)
         }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
         }
    })
}


module.exports=geocode
