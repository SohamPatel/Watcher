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
import Vue from 'vue'

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
      
      const TMDB_TRENGING_URL = this.TMDB_BASE_TREND_URL;
      const API_KEY = process.env.VUE_APP_TMDB_API_KEY;

      let headers = {
        params: {
          api_key: API_KEY
        }
      }
      
      // GET Tranding Movies
      Vue.http.get(TMDB_TRENGING_URL, headers).then(response => {
        response.body.results.forEach(movie => {
          let currMovie = {
            "title": movie.title,
            "poster": this.TMDB_BASE_IMG_URL + movie.backdrop_path,
            "popularity": movie.popularity
          }
          this.trendingMovies.push(currMovie);
        })
        
        this.trendingMovies.sort((a, b) => {
          return b.popularity - a.popularity;
        });

        this.trendingMovies = this.trendingMovies.slice(0,10);
      });
      
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
