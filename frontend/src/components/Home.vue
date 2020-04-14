<template>
    <v-row class="text-center primary lighten-1">
      <!-- <v-container class="text-left">
        <h1>Trending Movies</h1>
      </v-container> -->
      <!-- <h1>Trending Movies</h1> -->
      <v-carousel cycle hide-delimiters hide-delimiter-background :show-arrows="false" height="100%">
        <v-container>
          <v-carousel-item v-for="(movie, i) in trendingMovies" :key="i">
            <v-row no-gutters>
              <v-col cols="4">
                <v-card class="pa-2" flat>
                  <v-img :src="movie.poster"></v-img>
                </v-card>
              </v-col>
              <v-col cols="8">
                <v-card class="pa-2 pl-5 text-left" flat>
                  <div class="font-weight-bold movie-title">
                    {{ movie.title }}
                  </div>
                  <div>
                    <v-chip v-for="genre in movie.genres" :key="genre" class="ma-2" color="pink" label text-color="white">
                      {{genre}}
                    </v-chip>
                  </div>
                  <div>
                    {{ movie.overview }}
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <!-- <v-img :src="movie.poster">
              <v-row class="fill-height pb-12 title-background" align="end" justify="center">
                <div class="font-weight-black movie-title">{{ movie.title }}</div>
              </v-row>
            </v-img> -->
          </v-carousel-item>
        </v-container>
      </v-carousel>
    </v-row>
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
          console.log(movie);
          let currMovie = {
            "title": movie.title,
            "overview": movie.overview,
            "backdrop": this.TMDB_BASE_IMG_URL + movie.backdrop_path,
            "poster": this.TMDB_BASE_IMG_URL + movie.poster_path,
            "popularity": movie.popularity,
            "rating": movie.vote_average,
            "genres": movie.genre_ids,
            "release_date": movie.release_date
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
  width: 100%;
  text-overflow: ellipsis;
  font-size: 3rem;
}
</style>
