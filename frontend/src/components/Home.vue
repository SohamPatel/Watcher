<template>
  <v-container>
    <v-row class="text-center">
      <v-carousel cycle hide-delimiters hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(movie, i) in trendingMovies" :key="i">
          <v-img :src="movie.poster" height="100%">
            <v-row class="fill-height pb-12 title-background" align="end" justify="center">
              <div class="font-weight-black movie-title">{{ movie.title }}</div>
            </v-row>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: function () {
      return {
        TMDB_BASE_TREND_URL: "https://api.themoviedb.org/3/trending/movie/day",
        TMDB_BASE_IMG_URL: "https://image.tmdb.org/t/p/original",
        trendingMovies: [],
      }
    },
    mounted: function () {
      
      let apiKey = process.env.VUE_APP_TMDB_API_KEY;
      let xmlHttp = new XMLHttpRequest();
      let url = this.TMDB_BASE_TREND_URL + "?api_key=" + apiKey;
      xmlHttp.open( "GET", url, false ); // false for synchronous request
      xmlHttp.send( null );
      let response = JSON.parse(xmlHttp.responseText);
      // console.log(response);
      response.results.forEach(movie => {
        let currMovie = {
          "title": movie.title,
          "poster": this.TMDB_BASE_IMG_URL + movie.backdrop_path,
          "popularity": movie.popularity
        }
        this.trendingMovies.push(currMovie);
      });

      this.trendingMovies.sort((a, b) => {
        return b.popularity - a.popularity;
      });

      this.trendingMovies = this.trendingMovies.slice(0,10);
      
      // console.log(this.trendingMovies);
      return;
    }
  }
</script>

<style scoped>
.movie-title {
  background-color: rgba(0, 0, 0, 0.15);
  width: 100%;
  color: white;
  text-overflow: ellipsis;
  font-family: 'Baloo Da 2', cursive;
  font-size: 3rem;
}
</style>
