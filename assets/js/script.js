// composant pour l'image en poster

Vue.component('show-movies',{
  template : ` 
  <div class="oneMovie">
      <div class="imageMovie">
          <img :alt="title" :src="'https://image.tmdb.org/t/p/w500' + img_src ">
          <p class="img__description"> {{descrp}} </br> note : {{note}} /10</p>         
      </div>
      <div class="releaseDateMovie">
          <p> {{date}} </p>
      <div class="box-btn-like">
      <div @click = "buttonLike(id_movies)" class="hover">
          <img src = "/assets/img/btn-like-empty.png" ></img>
      </div>
      </div>
  </div>
  </div>`,
  
  methods : {
      buttonLike (id_movies){
          this.$emit('change-button' , id_movies)
      }

  },

  props:["img_src" , "date" , "title" , "note" , "id_movies" , "descrp" , "note"],


})


Vue.component('show-movies-favorite',{
  template : ` 
  <div class="oneMovie">
      <div class="imageMovie">
          <img :alt="title" :src="'https://image.tmdb.org/t/p/w500' + img_src ">
          <p class="img__description"> {{descrp}} </br> note : {{note}} /10</p>         
      </div>
      <div class="releaseDateMovie">
          <p> {{date}} </p>
      <div class="box-btn-like">
      <div @click = "buttonLike(id_movies)" class="hover">
          <img src = "/assets/img/btn-like-empty.png" ></img>
      </div>
      </div>
  </div>
  </div>`,
  


  props:["img_src" , "date" , "title" , "note" , "id_movies" , "descrp" , "note"],


})

// Composant image paysage
Vue.component("show-other-movies", {
  template: ` 
    <div class="oneOtherMovie">
        <div class="imageMovie">
            <div class="test" v-bind:style="{ 'background-image': 'url(' + img + ')'}"><p class="title">{{title}}</p></div>            
        </div>
    </div>`,

  props: ["title", "img", "id_img"],

  props: {
    title_props: String,
    id_img: Number,
  },

  data: function () {
    return {
      img: "",
      title: this.title_props,
      img_id: this.id_img,
    };
  },

  mounted: function () {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=c360503f47b672932977a1df1e34ea58&language=fr&page=1"
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.results);
        this.title = data.results[this.img_id].title;
        this.img =
          "https://image.tmdb.org/t/p/w500/" +
          data.results[this.img_id].backdrop_path;
        console.log(this.img);
      });
  },
});


new Vue({
  el: "#app",
  data:{
    baseURL : 'https://api.themoviedb.org/3/search/movie?api_key=c360503f47b672932977a1df1e34ea58&query=',
    search:"",
    recherche:"",
    searchResult:"",
    source:"",
    titre:"",
    bc:"",
    moviesList: [],
    moviesListFavorite: [],
    isActive : false,
    message: "Vous n'avez pas de favoris pour l'instant , quel dommage !"
  },
  methods:{
    searchMovie: function(){
      this.recherche = this.baseURL + this.search;
      fetch(this.recherche).then(result=>result.json())
      .then((data)=>{
          //process the returned data
          this.searchResult = JSON.stringify(data);
          var obj = JSON.parse(this.searchResult);
          console.log(obj.results[0].title);
          this.titre = obj.results[0].title;
          this.source = 'https://image.tmdb.org/t/p/w500/' + obj.results[0].poster_path;
          this.bc = "background-color:#131313"

          //work with results array...
        })
    },
    hideSearch: function(){
      this.source = "";
      this.titre = "";
      this.bc = ""
    },

    changeButtonLike : function(id) {
      this.isActive = !this.isActive
      getLog = JSON.parse(localStorage.getItem('movies')); 

      if(this.isActive && getLog)
          {   

              let data = [...getLog, id]
              localStorage.setItem('movies', JSON.stringify(data));
          }
          else if(this.isActive == true && !getLog)
          {
              localStorage.setItem('movies', JSON.stringify([id]));
          }
          else if(this.isActive == false && getLog)
          {
              let data = getLog.filter((item)=>{return item != id})
              localStorage.setItem('movies', JSON.stringify(data));
          }
      }
    },

    mounted (){
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=c360503f47b672932977a1df1e34ea58&language=fr&page=1").then((resp) => resp.json()).then((data) => {
          this.moviesList = data.results
          console.log(this.moviesList);        

      })

  }
});

let slides = document.getElementsByClassName("slider__slide");
let navlinks = document.getElementsByClassName("slider__navlink");
let currentSlide = 0;

// changeSlide(currentSlide + 1);

document.getElementById("nav-button--next").addEventListener("click", () => {
  changeSlide(currentSlide + 1);
});
document.getElementById("nav-button--prev").addEventListener("click", () => {
  changeSlide(currentSlide - 1);
});

function changeSlide(moveTo) {
  if (moveTo >= slides.length) { moveTo = 0; };
  if (moveTo < 0) { moveTo = slides.length - 1; };
  slides[currentSlide].classList.toggle("active");
  navlinks[currentSlide].classList.toggle("active");
  slides[moveTo].classList.toggle("active");
  navlinks[moveTo].classList.toggle("active");
  currentSlide = moveTo;
  // setTimeout(changeSlide, 2000);
}

document.querySelectorAll(".slider__navlink").forEach((bullet, bulletIndex) => {
  bullet.addEventListener("click", () => {
    if (currentSlide !== bulletIndex) {
      changeSlide(bulletIndex);
    }
  });
});

AOS.init();
