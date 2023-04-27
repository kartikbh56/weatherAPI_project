const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const https=require("https")

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){res.sendFile(__dirname+"/index.html")});

app.post("/",function(req,res){
    const place=req.body.place
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=80fa2aa38241aafe1f05f0c1d628101d&units=metric`
    https.get(url,function(response){
                response.on("data",function(data){
                    //data is hexadecimal, we have to convert it to JSON
                        const weatherData=JSON.parse(data)
                        // console.log(weatherData)
                        // now the JSON is store in weatherData variable
                        var temp=weatherData.main.temp;
                        var description=weatherData.weather[0].description;
                        var id=weatherData.weather[0].icon
                        var imgURL=`https://openweathermap.org/img/wn/${id}.png`
                       //inside the JSON there is a key called mian inside which temp exist
                    //   console.log("temparature: "+temp)
                    //   console.log(description)
                    //you can get this path just by right clicking on copy path when you are using JSON viewer chrome extension
                    res.send(
                        `<div style=" width: 600px;
                        height: 100px;
                        color:white;
                        border:4px solid black;
                        background-color:black;
                        font-family: 'JetBrains Mono';
                        font-weight: 600;
                        border-radius: 15px;
                        position: relative;
                        padding:10px;
                        left: 400px;
                        top: 100px;
                        text-align: center;
                        "><center>${place}</center>Temperature=${temp} Description:${description} <img src="${imgURL}">
                        </div>`) 
                  });
                });           
});


app.listen(process.env.PORT || 3000,()=>console.log("server started in port 3000"))


// const url="https://api.openweathermap.org/data/2.5/weather?q=Bagalkot&appid=80fa2aa38241aafe1f05f0c1d628101d&units=metric"
// https.get(url,
//     function(response){
//         response.on("data",
//             function(data){
//             //data is hexadecimal, we have to convert it to JSON
//                 const weatherData=JSON.parse(data)
//                 // console.log(weatherData)
//                 // now the JSON is store in weatherData variable
//                 temp=weatherData.main.temp;
//                 description=weatherData.weather[0].description;
//                //inside the JSON there is a key called mian inside which temp exist
//             //   console.log("temparature: "+temp)
//             //   console.log(description)
//             //you can get this path just by right clicking on copy path when you are using JSON viewer chrome extension
//           });
//         });