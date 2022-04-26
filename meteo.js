/** @format */

const RootComponent = {
  data() {
    return {
      city: "",
      tableau: [], //tableau vide pour recupere mes element
    };
  },

  //La getWeatherméthode appelle fetchà faire une demande à l'API Open Weather Map pour obtenir les données météorologiques en fonction de l'entrée city.
  methods: {
    async getWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=dcd043fb7b0a55bb18b47a25fd770fc9&units=metric`
      );

      const data = await response.json(); //nous appelons res.jsonà convertir la réponse en un objet JavaScript.
      this.tableau = data.list; //tableau d'objet de prévision //Enfin, nous attribuons cela à this.resultafin de pouvoir l'afficher dans le modèle.
      console.log(data);
    },

    async mounted() {
      let meteo = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city.long}" + "${this.city.lat},fr&appid=3af94f82903a233370e2838ac7fe41fd&units=metric`
      );
      let data = await meteo.json();
      this.tableau = data.list;
    },
  },

  template: `
<div class ="container">
    <h1 id="top"><i class="wi wi-day-sunny"></i>METEO</h1>
    <form @submit.prevent="getWeather"> <!--prevent nous permet d'empêcher la soumission côté serveur et de faire une soumission côté client-->
    <div>
<!-- Nous lions la valeur entrée à la citypropriété réactive avec vmodel -->
        <input class="inputMeteo" v-model="city" placeholder="saisie ta ville"/> 
    </div>
    <!--La @submit nous permet d'écouter l'événement de soumission qui est déclenché lorsque nous cliquons sur le bouton get weather-->
    <button class="buttonMeteo" type="submit">AFFICHER-METEO</button> 
    </form>

    <!--En dessous, nous affichons le résultat de la réponse-->
<div class="a">
    <div class="containerBloc" v-for="(result, index) in tableau"> 
        <div>
        <h1>ville: {{ city }}</h1>
        <p>la meteo date/heure: {{ result.dt_txt }}</p>
        <p>temperature max: {{ result.main.temp_max }}</p>
        <p>temperature min: {{ result.main.temp_min}}</p>
        <p>vent vitesse: {{ result.wind.speed}}</p>
        <p>vent degre: {{ result.wind.deg}}°</p>
        <p>description: {{ result.weather[0].description}}</p>
        </div>
        <div class= "iconMeteo">
            <img :src="'http://openweathermap.org/img/wn/' + result.weather[0].icon + '@2x.png'">
        </div>

      
    </div>
</div>
</div>
     
  

    `,
};

Vue.createApp(RootComponent).mount("#root");
