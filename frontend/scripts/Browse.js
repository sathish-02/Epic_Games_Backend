   import { footer} from "../components/navFooter.js";
   import apiCall from "./fetch.js";
   document.querySelector("#footer").innerHTML = footer();
   var page = 1;
   var size = 10;
   var url = "http://localhost:3000/games?page="+page+"&size= "+size+"";
    var data;
   var res = apiCall(url);
   res.then((res) => {
       console.log(res)
       appendData(res);
       data = res;
       //console.log(data)
   });

   document.querySelector("#next > #nextpage").addEventListener("click",nextPage);
   document.querySelector("#next > #prevpage").addEventListener("click",prevPage);
  
   function nextPage(selected){
        
       var selected = document.querySelector("#nextpage").textContent;
       //console.log(selected)
       if (selected === "Next >>>>"){
           //console.log(selected)
        page = page+1;
        //console.log(selected);
        let url = "http://localhost:3000/games?page="+page+"&size="+size+"";
    
        let res = apiCall(url);
        res.then((res) => {
            console.log(res)
            appendData(res);
        })
       } 
   
   }

    function prevPage(){
    let selected = document.querySelector("#prevpage").textContent;
//     console.log(selected);
        if (selected === "<<<< Prev"){
            //console.log(selected)
        page = page-1;
        console.log(page)
        //console.log(selected);
        let url = "http://localhost:3000/games?page="+page+"&size="+size+"";

        let res = apiCall(url);
        res.then((res) => {
            console.log(res)
            appendData(res);
        })
        } 
    }

   var userName = JSON.parse(localStorage.getItem("UserName"));
   console.log(userName);
   if (userName !== null){
    document.querySelector("#signin").textContent= userName;
   }
   else {

   }
   let gamesArr = JSON.parse(localStorage.getItem("cartGameData")) || [];
   
   document.querySelector("#cartTotal").innerText = `${gamesArr.length}`;


   function appendData(res) {
    document.querySelector("#displayGames").textContent="";
       res.map((el) => {
        console.log(el._id)
           let { strikeprice, price, id, thumbnail, _id, title, short_description } = el;
           var div = document.createElement("div");
           div.addEventListener("click",function (){
               let idNum = {
                   id,
               }
               localStorage.setItem("idNum",JSON.stringify(idNum));
               window.location.href=`gameDetailsPage.html?${_id}`;
           })
           var image = document.createElement("img");
           image.src = thumbnail;
           var tit = document.createElement("h2");
           tit.textContent = title;
           var des = document.createElement("p");
           des.textContent = short_description;
           var div1 = document.createElement("div");
           div1.setAttribute("id", "Gameprice")
           var strikeP = document.createElement("h3");
           strikeP.textContent = "???" + numberWithCommas(strikeprice);
           strikeP.style.textDecoration="line-through";
           strikeP.style.color="skyblue"
           var rupees = document.createElement("h3");
           rupees.textContent = "???" + numberWithCommas(price);
           function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

           div1.append(strikeP,rupees)
           div.append(image, tit, des, div1);
           document.querySelector("#displayGames").append(div);
           
       })
   }
   

//    SortBy Alphabetical, price
   document.querySelector("#sortBtn").addEventListener("change",sortBy);
   function sortBy(){
       var selected = document.querySelector("#sortBtn").value;
       //console.log(selected);
       if (selected === "Alphabetical"){
           console.log(selected)
        let newProd = data.sort((a, b) =>{
            //console.log(a.title)
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        })
        appendData(newProd);
    }

        if (selected === "Low to High"){
            console.log(selected)
        let newProd = data.sort((a, b) =>{
                //console.log(a.title)
                return a.price - b.price;
            })
            appendData(newProd);
        }

        if (selected === "High to Low"){
            console.log(selected)
        let newProd = data.sort((a, b) =>{
                //console.log(a.title)
                return b.price - a.price;
            })
            appendData(newProd);
        }
       
       
       
   }

   


   // main search functionaity

   document.querySelector("#navSearch").addEventListener("keypress", getMainData);
    
    function getMainData(event){
    let input = document.querySelector("#navSearch").value 

        if (event.key === "Enter"){
            console.log(input)
            let url = "http://localhost:3000/games?title="+input+"&page="+page+"&size="+size+"";

       let res = apiCall(url);
       //console.log(res)
       res.then((res) => {
          
           data = res;
           console.log(data)
           console.log(data.length)
           if (data.length === 0){
               swal("Oops!", "No Result Found", "error")
           }
           appendData(res);
       })
       res.catch((error) => {
        console.log(error)

       })
        }
        
   }
   //input functionality

    document.querySelector("#input").addEventListener("keypress", getData);
    
    function getData(event){
    var input = document.querySelector("#input").value 

        if (event.key === "Enter"){
            console.log(input)
            let url = "http://localhost:3000/games?genre="+input+"&page="+page+"&size="+size+"";

       let res = apiCall(url);
       res.then((res) => {
           //console.log(res)
           data = res;
           console.log(data.length)
           if (data.length === 0){
               alert("No Result Found");
           }
           appendData(res);
       })
       res.catch((error) => {
        console.log(error)
       })
        }
        
    }

   //sort by price
   document.querySelector("#price").addEventListener("change",maxPrice);

   function maxPrice () {
    let selected = document.querySelector("#price").value;

    if (selected === "1000"){
        console.log(selected)
    let newProd = data.filter((el) =>{
            //console.log(a.title)
            return el.price >= 0 && el.price <= 1000;
        })
        appendData(newProd);
    }

    if (selected === "5000"){
        console.log(selected)
    let newProd = data.filter((el) =>{
            //console.log(a.title)
            return el.price > 1000 && el.price <= 5000;
        })
        appendData(newProd);
    }

    if (selected === "9000"){
        console.log(selected)
    let newProd = data.filter((el) =>{
            //console.log(a.title)
            return el.price > 5000 && el.price <= 9000;
        })
        appendData(newProd);
    }

    if (selected === "9100"){
        console.log(selected)
    let newProd = data.filter((el) =>{
            //console.log(a.title)
            return el.price > 9000;
        })
        appendData(newProd);
    }
   }
   
   //Sort by genre

   document.querySelector("#genre").addEventListener("change",sortByGenre);
   function sortByGenre(){
       let selected = document.querySelector("#genre").value;
       //console.log(selected);
       let url = "http://localhost:3000/games?genre="+selected+"&page="+page+"&size="+size+"";

       let res = apiCall(url);
       res.then((res) => {
           console.log(res)
           appendData(res);
       })
       
   }

   //sort by platform

   document.querySelector("#platform").addEventListener("change",sortByplatform);

   function sortByplatform(){
    let selected = document.querySelector("#platform").value;
    let url = "http://localhost:3000/games?platform="+selected+"&page="+page+"&size="+size+"";

       let res = apiCall(url);
       res.then((res) => {
           console.log(res)
           appendData(res);
       })
   
   }

   //clearing all filters

   document.querySelector("#clear").addEventListener("click",clearFilter)

   function clearFilter(){
       window.location.reload();
   }

   

//    document.querySelector(".carousel-cell").addEventListener("click",storeGenre)

//    function storeGenre(){
//        console.log("here")
//        var genre = document.querySelector("#genreData").textContent;
//        console.log(genre)
//        var genreData = [];
//        genreData.push(genre) 
//         localStorage.setItem("genreData", JSON.stringify(genreData))
//    }

   var games = [
       {
           image : "https://www.freetogame.com/g/212/thumbnail.jpg",
           title : "Fighting",
       },
       {
        image : "https://www.freetogame.com/g/233/thumbnail.jpg",
        title : "Strategy",
    },
    {
        image : "https://www.freetogame.com/g/474/thumbnail.jpg",
        title : "Sports",
    },
    {
        image : "https://www.freetogame.com/g/351/thumbnail.jpg",
        title : "Racing",
    },
    {
        image : "https://www.freetogame.com/g/20/thumbnail.jpg",
        title : "Shooter",
    },
    {
        image : "https://www.freetogame.com/g/19/thumbnail.jpg",
        title : "Card Game",
    },
    {
        image : "https://www.freetogame.com/g/18/thumbnail.jpg",
        title : "Social",
    },
    {
        image : "https://www.freetogame.com/g/17/thumbnail.jpg",
        title : "MMORPG",
    },
    {
        image : "https://www.freetogame.com/g/16/thumbnail.jpg",
        title : "MMO",
    }
   ];

   //appen(games);

   //console.log(games)
   games.map((el)=>{
       let {image,title} = el
    var div = document.createElement("div");
    div.setAttribute("class", "carousel-cell");
    div.addEventListener("click",function (){
        let genre = {
            title,
        }
        localStorage.setItem("genreData",JSON.stringify(genre));
        window.location.href="GameDatas.html";
    })
    var div1 = document.createElement("div");
    div1.setAttribute("class","ImgTag");
    var anchor = document.createElement("a");
    var img = document.createElement("img");
    img.src = image;
    var tit = document.createElement("h3");
    tit.textContent= title;
    //console.log(tit)
    anchor.append(img,tit);
    div1.append(anchor);
    div.append(div1);
    document.querySelector(".carousel").append(div)
   })


