// document.addEventListener("DOMContentLoaded", function () {
//   // Set background color using JavaScript
//   const container = document.querySelector('.title-welcome');
//   const overlay = document.createElement('div');
//   overlay.classList.add('overlay');
//   container.appendChild(overlay);
// })
// window.addEventListener("DOMContentLoaded",()=>{
//   window.location.href="join.html"
// })
let userid=localStorage.getItem("id");
console.log(userid);
const API_KEY = 'api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_URL = BASE_URL + '/movie/popular?' + API_KEY;
const TOPRATED_URL = BASE_URL + '/movie/top_rated?' + API_KEY;
const UPCOMING_URL = BASE_URL + '/movie/upcoming?' + API_KEY;
const POPULARTV_URL = BASE_URL + '/tv/popular?' + API_KEY;
const TOPRATEDTV_URL = BASE_URL + '/tv/top_rated?' + API_KEY;
// const BGR_URL= BASE_URL+''+ API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
card = document.getElementsByClassName("card");
image = document.querySelector(".image");
 const userrating=document.getElementById("user-ratingbtn");
var startslice = 1;
var endslice = 8;
let movcount=0;
let modalCounter = 0;
function login(){
  window.location.href="login.html";
}
async function popularmovies() {
  // console.log('getting data');
  let response = await fetch(POPULAR_URL);
  let data = await response.json();
  // console.log(data.results);
  data.results.slice(startslice, endslice).forEach(element => {
    movcount+=1;
    const cast_URL= `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    modalCounter++;
    const rating=parseFloat(element.vote_average.toFixed(2));
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
         <div type="button" id="modalopenbtn" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
         <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="card-img-top" alt="No Image">
         </div>
           <div class="card-body" id="${element.title}">
           <h5 class="card-title">${element.title}</h5>
           <h8 class="card-releasedate">Released On:<br>${element.release_date}</h8><br>   
           <span class="card-rating"><img src="photos/star.avif" width='15px'>${rating}</span> <br>
           <button type="button" id="${userid+element.title}watchlist" class="user-watchlistbtn">Add to Watchlist</button>  
           <button type="button" id="${userid+element.title}rating" class="user-ratingbtn">Add Rating</button>
           <div class="user-ratinginputbar" id="${userid+element.title}ratinginput">
           <select class="rating-input" id="${element.id}">
           <option disabled selected value="select">Enter Rating</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
       </select>
           <button id="submit-btn${element.id}" class="btn btn-success">Enter</button>
           </div> 
           <div id="ratingresult${element.id}"></div>
           </div>
        </div>
      `;
      
      document.getElementById("popmoviedata").appendChild(cardElement);
      document.getElementById(`${userid+element.title}watchlist`).addEventListener("click",()=>{
        document.getElementById(`${userid+ element.title}watchlist`).style.backgroundColor='green';
        document.getElementById(`${userid+element.title}watchlist`).style.color='white';
        document.getElementById(`${userid+element.title}watchlist`).innerText='Added to Watchlist';
        localStorage.setItem(`${userid+element.title}-watchlist`,`${element.id}`);

    })
    
    if(parseInt(`${element.id}`) == parseInt (localStorage.getItem(`${userid+element.title}-watchlist`))){
      document.getElementById(`${userid+element.title}watchlist`).style.backgroundColor='green';
      document.getElementById(`${userid+element.title}watchlist`).style.color='white';
      document.getElementById(`${userid+element.title}watchlist`).innerText='Added to Watchlist';

    }



      document.getElementById(`${userid+element.title}rating`).addEventListener("click",()=>{
        console.log(`clicked ${element.title}`);
        document.getElementById(`submit-btn${element.id}`).addEventListener("click",()=>{
          var storedRating= document.getElementById(`${element.id}`).value;
          if (storedRating !== null&storedRating!=="select") {
            console.log(storedRating);
            localStorage.setItem(`${userid+element.title}-rating`,storedRating);
            localStorage.setItem(`${ userid+element.title}-ratingid`,`${element.id}`);
            document.getElementById(`${userid+element.title}ratinginput`).style.display="none";
            document.getElementById(`${userid+element.title}rating`).style.width='100px';
            document.getElementById(`${userid+element.title}rating`).innerText="Change Rating";
    

          }
        })
        document.getElementById(`${userid+element.title}ratinginput`).style.display='flex';

    })
    

  document.getElementById(`${userid+element.title}rating`).innerText="Change Rating";

    
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.title}</h5>
            
          </div>
          <div class="modal-body" id="modal${element.title}Label">     
            <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
            <h8 class="card-modalreleasedate">Released On:${element.release_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h5>Cast Details:</h5>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
            `;
            
            document.body.appendChild(modal);
            async function castdata(){
              let response2=await fetch(cast_URL);
        let data2= await response2.json();
        data2.cast.forEach(elem=>{
          var CastElement=document.createElement("div");
          CastElement.classList="card-modalcastdetails";
          CastElement.innerHTML=`
          <div class="card" id='card-cast'>
          <div class="card-castdetailsimage">
          <img src="${elem.profile_path? IMG_URL + elem.profile_path:"https://previews.123rf.com/images/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg"}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
          </div>
          `
          document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          
        })
      }
      castdata()
    })
  }
    if(movcount<=20&&movcount>=0){
        function nextpage(){
          document.getElementById("popmoviedata").innerHTML=" ";
          popularmovies()
        }
        function prevpage(){
          document.getElementById("popmoviedata").innerHTML=" ";  
          startslice-=7;
          endslice-=7;
          popularmovies();
        }
      }
      // if(parseInt(startslice)==15){
      // document.getElementById('nextpng').style.display=="none";
      // }
      popularmovies()
async function populartvshows() {
  // console.log('getting data');
  let response = await fetch(POPULARTV_URL);
  let data = await response.json();
  // console.log(data.results);
  let poptvstartslice = Math.floor(Math.random() * 15)
  data.results.slice(parseInt(poptvstartslice), parseInt(poptvstartslice) + 7).forEach(element => {
    modalCounter++;
    const rating=parseFloat(element.vote_average.toFixed(2));
    const casttv_URL= `https://api.themoviedb.org/3/tv/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
    <div class="card">
    <div id="modalopenbtn" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
         <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="card-img-top" alt="No Image">
         </div>
           <div class="card-body">
           <span class="card-rating"><img src="photos/star.avif" width='15px'>${rating}</span> <br> 
           <h5 class="card-title">${element.original_name}</h5>
           <h8 class="card-releasedate">First Episode:<br>${element.first_air_date}</h8>           
           <button type="button" id="${userid+element.original_name}watchlist" class="user-watchlistbtn">Add to Watchlist</button> 
           <button type="button" id="${userid+element.original_name}rating" class="user-ratingbtn">Add Rating</button>
           <div class="user-ratinginputbar" id="${userid+element.original_name}ratinginput">
           <select class="rating-input" id="${element.id}">
           <option disabled selected value="select">Enter Rating</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
       </select>
           <button id="submit-btn${element.id}" class="btn btn-success">Enter</button>
           </div> 
           <div id="ratingresult${element.id}"></div>
           
          </div>
        </div>
      `;
    document.getElementById("poptvdata").appendChild(cardElement);
    document.getElementById(`${userid+element.original_name}watchlist`).addEventListener("click", () => {
      document.getElementById(`${userid+element.original_name}watchlist`).style.backgroundColor = 'green';
      document.getElementById(`${userid+element.original_name}watchlist`).style.color = 'white';
      document.getElementById(`${userid+element.original_name}watchlist`).innerText = 'Added to Watchlist';
      localStorage.setItem(`${userid+element.original_name}-tvwatchlist`, `${element.id}`);

    })
    if (parseInt(`${element.id}`) == parseInt(localStorage.getItem(`${userid+ element. original_name}-tvwatchlist`))) {
      document.getElementById(`${userid+element.original_name}watchlist`).style.backgroundColor = 'green';
      document.getElementById(`${userid+element. original_name}watchlist`).style.color = 'white';
      document.getElementById(`${userid+element.original_name}watchlist`).innerText = 'Added to Watchlist';

  }
    document.getElementById(`${userid+element.original_name}rating`).addEventListener("click",()=>{
      console.log(`clicked ${element.original_name}`);
      document.getElementById(`submit-btn${element.id}`).addEventListener("click",()=>{
        var storedRating= document.getElementById(`${element.id}`).value;
        if (storedRating !== null&storedRating!=="select") {
          console.log(storedRating);
          localStorage.setItem(`${userid+element. original_name}-tvrating`,storedRating);
          localStorage.setItem(`${userid+element.original_name}-tvratingid`,`${element.id}`);
          document.getElementById(`${userid+element.original_name}ratinginput`).style.display="none";
          document.getElementById(`${userid+element.original_name}rating`).style.width='100px';
          document.getElementById(`${userid+element.original_name}rating`).innerText="Change Rating";

        }
      })
      document.getElementById(`${userid+element.original_name}ratinginput`).style.display = 'flex';
    })
  document.getElementById(`${userid+element.original_name}rating`).innerText="Change Rating";
  
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element. original_name}</h5>
          </div>
          <div class="modal-body" id="modal${element.original_name}Label">     
            <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}"class="img-fluid" alt="Modal Image">
            <span class="modal-rating"><img src="photos/star.avif" width='15px'>${rating}</span><br>
            <h8 class="card-modalreleasedate">Released On:${element.first_air_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h5>Cast Details:</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    
    document.body.appendChild(modal);
    async function casttvdata() {
        let response2 = await fetch(casttv_URL);
        let data2 = await response2.json();
        // console.log(data2.cast);
        data2.cast.forEach(elem => {
            var CastElement = document.createElement("div");
            CastElement.classList = "card-modalcastdetails";
            CastElement.innerHTML=`
            <div class="card" id='card-cast'>
            <div class="card-castdetailsimage">
            <img src="${elem.profile_path? IMG_URL + elem.profile_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
            </div>
            <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
           </div>
             `
             document.getElementById(`modal${element.original_name}Label`).appendChild(CastElement);
            
        })
      
      }
    
    casttvdata()
  })
}
populartvshows()

function popmovbutton() {
  document.getElementById("poptvdata").style.display = 'none';
  document.getElementById("popmoviedata").style.display = 'flex';
}
function poptvbutton() {
  document.getElementById("popmoviedata").style.display = 'none';
  document.getElementById("poptvdata").style.display = 'flex';
}



async function topratedmovies() {
  // console.log('getting data');
  let response = await fetch(TOPRATED_URL);
  let data = await response.json();
  // console.log(data.results);
  let topmovstartslice = Math.floor(Math.random() * 15)
  data.results.slice(parseInt(topmovstartslice), parseInt(topmovstartslice) + 7).forEach(element => {
    modalCounter++;
    const rating=parseFloat(element.vote_average.toFixed(2));
    const cast_URL= `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
        <div  id="modalopenbtn" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
        <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="card-img-top" alt="No Image">
        </div>   
           <div class="card-body">
           <span class="card-rating"><img src="photos/star.avif" width='15px'>${rating}</span> <br> 
            <h5 class="card-title">${element.title}</h5>
           <h8 class="card-releasedate">Released On:<br>${element.release_date}</h8>     
            
           <button type="button" id="${userid+ element.title}watchlist" class="user-watchlistbtn">Add to Watchlist</button>  
           <button type="button" id="${userid+ element.title}rating" class="user-ratingbtn">Add Rating</button>
           <div class="user-ratinginputbar" id="${userid+element.title}ratinginput">
           <select class="rating-input" id="${element.id}">
           <option disabled selected value="select">Enter Rating</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
       </select>
           <button id="submit-btn${element.id}" class="btn btn-success">Enter</button>
           </div> 
           <div id="ratingresult${element.id}"></div> 
           
          </div>
        </div>
      `;
    document.getElementById("topmoviedata").appendChild(cardElement);
    document.getElementById(`${userid+element.title}rating`).addEventListener("click",()=>{
      console.log(`clicked ${element.title}`);
      document.getElementById(`submit-btn${element.id}`).addEventListener("click",()=>{
        var storedRating= document.getElementById(`${element.id}`).value;
        if (storedRating !== null&storedRating!=="select") {
          console.log(storedRating);
          localStorage.setItem(`${userid+ element.title}-ratingid`,`${element.id}`);
          localStorage.setItem(`${userid+element.title}-rating`,storedRating);
          document.getElementById(`${userid+element.title}ratinginput`).style.display="none";
          document.getElementById(`${userid+element.title}rating`).style.width='100px';
          document.getElementById(`${userid+element.title}rating`).innerText="Change Rating";
         

        }
      })
      document.getElementById(`${userid+ element.title}ratinginput`).style.display='flex';
      
    })
    document.getElementById(`${userid+element.title}watchlist`).addEventListener("click",()=>{
      document.getElementById(`${userid+element.title}watchlist`).style.backgroundColor='green';
      document.getElementById(`${userid+element.title}watchlist`).style.color='white';
      document.getElementById(`${userid+element.title}watchlist`).innerText='Added to Watchlist';
    localStorage.setItem(`${userid+element.title}-watchlist`,`${element.id}`);
    })
    if(parseInt(`${element.id}`) == parseInt (localStorage.getItem(`${userid+element.title}-watchlist`))){
      document.getElementById(`${userid+element.title}watchlist`).style.backgroundColor='green';
      document.getElementById(`${userid+element.title}watchlist`).style.color='white';
      document.getElementById(`${userid+ element.title}watchlist`).innerText='Added to Watchlist';

    }
  
  document.getElementById(`${userid+ element.title}rating`).innerText="Change Rating";
  
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.title}</h5>
          </div>
          <div class="modal-body" id="modal${element.title}Label">     
            <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
            <span class="modal-rating"><img src="photos/star.avif" width='15px'>${rating}</span><br> 
            
            <h8 class="card-modalreleasedate">Released On:${element.release_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h5>Cast Details:</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
      async function castdata(){
        let response2=await fetch(cast_URL);
        let data2= await response2.json();
        // console.log(data2.cast);
        data2.cast.forEach(elem=>{
          var CastElement=document.createElement("div");
          CastElement.classList="card-modalcastdetails";
          CastElement.innerHTML=`
          <div class="card" id='card-cast'>
          <div class="card-castdetailsimage">
          <img src="${elem.profile_path? IMG_URL + elem.profile_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          
           
        })
      }
        castdata()
  })
}
topratedmovies()


async function topratedtvshows() {
  // console.log('getting data');
  let response = await fetch(TOPRATEDTV_URL);
  let data = await response.json();
  // console.log(data.results);
  let toptvstartslice = Math.floor(Math.random() * 10)
  data.results.slice(parseInt(toptvstartslice), parseInt(toptvstartslice) + 7).forEach(element => {
    modalCounter++;
    const rating=parseFloat(element.vote_average.toFixed(2));
    const casttv_URL= `https://api.themoviedb.org/3/tv/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
    <div class="card">
    <div id="modalopenbtn" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
         <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="card-img-top" alt="No Image">
         </div>
           <div class="card-body">
           <span class="card-rating"><img src="photos/star.avif" width='15px'>${rating}</span> <br> 
            
           <h5 class="card-title">${element.original_name}</h5>
           <h8 class="card-releasedate">First Episode:<br>${element.first_air_date}</h8>           
           
           <button type="button" id="${userid+ element.original_name}watchlist" class="user-watchlistbtn">Add to Watchlist</button> 
           <button type="button" id="${userid+element.original_name}rating" class="user-ratingbtn">Add Rating</button>
           <div class="user-ratinginputbar" id="${userid+element.original_name}ratinginput">
           <select class="rating-input" id="${element.id}">
           <option disabled selected value="select">Enter Rating</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
       </select>
           <button id="submit-btn${element.id}" class="btn btn-success">Enter</button>
           </div> 
           <div id="ratingresult${element.id}"></div>
          </div>
        </div>
      `;
    document.getElementById("toptvdata").appendChild(cardElement);
    document.getElementById(`${userid+element.original_name}watchlist`).addEventListener("click", () => {
      document.getElementById(`${userid+element.original_name}watchlist`).style.backgroundColor = 'green';
      document.getElementById(`${userid+element.original_name}watchlist`).style.color = 'white';
      document.getElementById(`${userid+element. original_name}watchlist`).innerText = 'Added to Watchlist';
      localStorage.setItem(`${userid+element.original_name}-tvwatchlist`, `${element.id}`);

    })
    if (parseInt(`${element.id}`) == parseInt(localStorage.getItem(`${userid+element.original_name}-tvwatchlist`))) {
      document.getElementById(`${userid+ element.original_name}watchlist`).style.backgroundColor = 'green';
      document.getElementById(`${userid+element.original_name}watchlist`).style.color = 'white';
      document.getElementById(`${userid+element.original_name}watchlist`).innerText = 'Added to Watchlist';

  }
    document.getElementById(`${userid+element.original_name}rating`).addEventListener("click",()=>{
      console.log(`clicked ${element. original_name}`);
      document.getElementById(`submit-btn${element.id}`).addEventListener("click",()=>{
        var storedRating= document.getElementById(`${element.id}`).value;
        if (storedRating !== null&storedRating!=="select") {
          console.log(storedRating);
          localStorage.setItem(`${userid+element.original_name}-tvrating`,storedRating);
          localStorage.setItem(`${userid+element.original_name}-tvratingid`,`${element.id}`);
          document.getElementById(`${userid+element.original_name}ratinginput`).style.display="none";
          document.getElementById(`${userid+element.original_name}rating`).style.width='100px';
          document.getElementById(`${userid+element.original_name}rating`).innerText="Change Rating";

        }
      })
      document.getElementById(`${userid+element.original_name}ratinginput`).style.display = 'flex';
    })

  document.getElementById(`${userid+element.original_name}rating`).innerText="Change Rating";
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.original_name}</h5>
          </div>
          <div class="modal-body" id="modal${element.original_name}Label">     
            <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
            <span class="modal-rating"><img src="photos/star.avif" width='15px'>${rating}</span><br> 
           
            <h8 class="card-modalreleasedate">Released On:${element.first_air_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    async function casttvdata() {
      let response2 = await fetch(casttv_URL);
      let data2 = await response2.json();
      // console.log(data2.cast);
      data2.cast.forEach(elem => {
          var CastElement = document.createElement("div");
          CastElement.classList = "card-modalcastdetails";
          CastElement.innerHTML=`
          <div class="card" id='card-cast'>
          <div class="card-castdetailsimage">
          <img src="${elem.profile_path? IMG_URL + elem.profile_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.original_name}Label`).appendChild(CastElement);
          
      })
    
    }
  
  casttvdata()

  })
}
topratedtvshows()
function topmovbutton() {
  document.getElementById("toptvdata").style.display = 'none';
  document.getElementById("topmoviedata").style.display = 'flex';
}
function toptvbutton() {
  document.getElementById("topmoviedata").style.display = 'none';
  document.getElementById("toptvdata").style.display = 'flex';
}

async function upcomingmovies() {
  console.log('getting data');
  let response = await fetch(UPCOMING_URL);
  let data = await response.json();
  // console.log(data.results);
  let upmovstartslice = Math.floor(Math.random() * 15)
  data.results.slice(parseInt(upmovstartslice), parseInt(upmovstartslice) + 7).forEach(element => {
    modalCounter++;
    const cast_URL= `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    const rating=parseFloat(element.vote_average.toFixed(2));
    
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
        <div id="modalopenbtn" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
         <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="card-img-top" alt="No Image"  >
         </div>
           <div class="card-body">
           <span class="card-rating"><img src="photos/star.avif" width='15px'>${rating}</span> <br> 
           
           <h5 class="card-title">${element.title}</h5>
           <h8 class="card-releasedate">Released On:<br>${element.release_date}</h8>           
            
           <button type="button" id="${userid+element.title}watchlist" class="user-watchlistbtn">Add to Watchlist</button>  
           <button type="button" id="${userid+element.title}rating" class="user-ratingbtn">Add Rating</button>
           <div class="user-ratinginputbar" id="${userid+element.title}ratinginput">
           <select class="rating-input" id="${element.id}">
           <option disabled selected value="select">Enter Rating</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
       </select>
           <button id="submit-btn${element.id}" class="btn btn-success">Enter</button>
           </div> 
           <div id="ratingresult${element.id}"></div> 
           
          
          </div>
        </div>
      `;
      // document.getElementById("dropdown-popmovitemfav").addEventListener("click",()=>{
      //   console.log("clicked")
      // })
    document.getElementById("upcomingmovies").appendChild(cardElement);
    document.getElementById(`${userid+element.title}rating`).addEventListener("click",()=>{
      console.log(`clicked ${element.title}`);
      document.getElementById(`submit-btn${element.id}`).addEventListener("click",()=>{
        var storedRating= document.getElementById(`${element.id}`).value;
        if (storedRating !== null&storedRating!=="select") {
          console.log(storedRating);
          localStorage.setItem(`${userid+element.title}-rating`,storedRating);
          localStorage.setItem(`${userid+element.title}-ratingid`,`${element.id}`);
         
          document.getElementById(`${userid+element.title}ratinginput`).style.display="none";
          document.getElementById(`${userid+element.title}rating`).style.width='100px';
          document.getElementById(`${userid+element.title}rating`).innerText="Change Rating";
        
        }
      })
      document.getElementById(`${userid+element.title}ratinginput`).style.display='flex';
      
    })
    document.getElementById(`${userid+element.title}watchlist`).addEventListener("click",()=>{
      document.getElementById(`${userid+element.title}watchlist`).style.backgroundColor='green';
      document.getElementById(`${userid+element.title}watchlist`).style.color='white';
      document.getElementById(`${userid+element.title}watchlist`).innerText='Added to Watchlist';
    localStorage.setItem(`${userid+element.title}-watchlist`,`${element.id}`);
    })
    if(parseInt(`${element.id}`) == parseInt (localStorage.getItem(`${userid+element.title}-watchlist`))){
      document.getElementById(`${userid+element.title}watchlist`).style.backgroundColor='green';
      document.getElementById(`${userid+element.title}watchlist`).style.color='white';
      document.getElementById(`${userid+element.title}watchlist`).innerText='Added to Watchlist';
    }
  var storedRating=localStorage.getItem(`${userid+element.title}-rating`);
  document.getElementById(`${userid+element.title}rating`).innerText="Change Rating";
  

    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.title}</h5>
          </div>
          <div class="modal-body" id="modal${element.title}Label">     
            <img src="${element.poster_path? IMG_URL + element.poster_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
            <span class="modal-rating"><img src="photos/star.avif" width='15px'>${rating}</span> <br> 
            
            <h8 class="card-modalreleasedate">Released On:${element.release_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h6>Cast Details:</h6>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
      async function castdata(){
        let response2=await fetch(cast_URL);
        let data2= await response2.json();
        // console.log(data2.cast);
        data2.cast.forEach(elem=>{
          var CastElement=document.createElement("div");
          CastElement.classList="card-modalcastdetails";
          
          CastElement.innerHTML=`
          <div class="card" id='card-cast'>
          <div class="card-castdetailsimage">
          <img src="${elem.profile_path? IMG_URL + elem.profile_path:"../photos/No photo.jpg"}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          
        })
      }
        castdata()

  })
}
upcomingmovies()
function search() {
  console.log("clicked");
  var searchinput = document.getElementById("searchinput").value;
  displayResults(searchinput);
  const moviename = document.getElementById("searchResults").innerHTML;
  console.log(moviename);
  
  window.localStorage.setItem("movie", moviename);
  
}
function displayResults(query) {
  var resultsContainer = document.getElementById("searchResults");
  var results = query;
  resultsContainer.innerHTML = results;
  // console.log(document.getElementById("searchResults").innerHTML);
}
if(userid!="null"){
  
}
// function handleKeyPress(event) {
//   // Check if the pressed key is Enter (key code 13)
//   if (event.key === 'Enter') {
//     console.log("hi");
//     // Trigger the button click
//     search();
//   }
// }
document.getElementById("search-btn").addEventListener("onkeydown",(event)=>{
if(event.key==='Enter'){
  console.log("hi");
}
})




// function handleEnterKeyPress(event) {
            
//   if (event.keyCode === 13) {
//       search();
//   }
// }
// document.getElementById("searchinput").addEventListener("onkeydown", handleEnterKeyPress);


// document.getElementById('dropdown-popitem').addEventListener('click', function() {
//   localStorage.setItem('previousPage', window.location.href);
// });