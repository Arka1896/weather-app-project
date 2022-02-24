const path =require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');


//console.log(__dirname)//path of directoty of file
//onsole.log(__filename)//path of the file
//console.log(path.join(__dirname,'../public'))
const app= express() 

//Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
   res.render('index',{
      title:'Weather',
      name:'Arka Ghosh'
   })
})

// app.get('',(req,res)=>{
//    //res.send('Hello Express!!')
//    res.send('<h1>Hello Express</h1>')
// })

// app.get('/help',(req,res)=>{
//    //res.send('Help Page')
//    res.send([{name:'ARKA',
//              age:26},{
//             name:'DEB' ,
//             age:25
//              }])
// })

app.get('/help',(req,res)=>{
   res.render('help',{
      title:'Help Page',
       name:'Arka Ghosh',
       helpText:'This is some helpfull text.'
   })
   
})

// app.get('/about',(req,res)=>{
//     //res.send( 'About Page')
//     res.send('<h1>About</h1>')
//  })

app.get('/about',(req,res)=>{
    
    res.render('about',{
       title:'About Me',
       name:'Arka Ghosh'
    })
 })

 app.get('/weather',(req,res)=>{
    //res.send('Weather Page')
    if(!req.query.address){
        return res.send({
           error:'Please Provide Address for Search Criteria'
        })
    }
    //const address=req.query.address
    //Requesting Data from API
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if(error){
         return res.send({
            error
         })//console.log('Error:',error)//to be modified
      }
      forecast(latitude,longitude,(error,forecastdata)=>{
         if(error){
            return res.send({
               error
            })//console.log('Error:',error)//to be modified
         }
         res.send({weather:forecastdata,
               location,
               address:req.query.address
              })

      })
    })

    /*res.send({weather:'Its Haze and 16 degree Celcius',
               location:'Kolkata',
               address:req.query.address
              })*/
 })
 
 app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
          error:'You ust provide a search term'
       })
    }
    //console.log(req.query.search)
    res.send({
       products:[]
    })
 })

 app.get('/help/*',(req,res)=>{
   //res.send('Error 404 help data Not Found')
   res.render('404',{
      errorMessage:'Help article Not Found',
      name:'Arka Ghosh',
      title:404
   })
 })
 
 app.get('*',(req,res)=>{
   //res.send('Error 404 Data Not Found')
   res.render('404',{
      errorMessage:'Page Not Found',
      name:'Arka Ghosh',
      title:404
   })
 })
 

//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log('Server is Up')
})