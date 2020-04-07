<template>
  <v-container>
    <h1 class="display-1 mb-5">My List</h1>
    <v-row class="text-center">
      <v-col cols="md-6">
        <v-card class="pa-2" outlined tile>
          <v-card-title class="title font-weight-black justify-space-between">Watched
            <v-btn v-show="!editWatched" icon color="success" @click="editWatched = !editWatched"><v-icon>mdi-pencil-plus-outline</v-icon></v-btn>
            <v-btn v-show="editWatched" icon color="warning" @click="editWatched = !editWatched"><v-icon>mdi-pencil-off-outline</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <div v-show="showWatchedError" class="deep-orange--text">
              <v-icon color="deep-orange">mdi-alert-circle-outline</v-icon> Already Exists
            </div>
            <!-- <v-alert :value="showWatchedError" text outlined color="deep-orange" icon="mdi-alert-circle-outline" transition="scale-transition">
              Already Exists
            </v-alert> -->
            <v-autocomplete v-show="editWatched"
              prepend-icon="mdi-movie-search-outline"
              :items="watchedResults"
              item-text="title"
              label="Search a Film/TV Series Title"
              :search-input.sync="watchedSearch"
              :loading="isWatchedLoading"
              :menu-props="{closeOnContentClick: true}">

              <template v-slot:item="{item}">
                <v-list-item @click="addToList('watched', item)">
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img :src="item.poster_path ? (TMDB_BASE_IMG_URL + item.poster_path) : require('@/assets/placeholder_poster.png')"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title || item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.release_date ? item.release_date.substring(0,4) : (item.first_air_date ? item.first_air_date.substring(0,4) : 'N.d')"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>

            <v-list class="text-left" subheader two-line flat width="100%">
              <v-list-item-group multiple>
                <v-list-item v-for="(movie, i) in sortedWatched" :key="i">
                  <v-list-item-action v-show="editWatched">
                    <v-btn icon color="error"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img :src="movie.poster_path"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">{{movie.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{formatDate(movie.release_date)}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="md-6">
        <v-card class="pa-2" outlined tile>
          <v-card-title class="title font-weight-black justify-space-between">To Watch
            <v-btn v-show="!editToWatch" icon color="success" @click="editToWatch = !editToWatch"><v-icon>mdi-pencil-plus-outline</v-icon></v-btn>
            <v-btn v-show="editToWatch" icon color="warning" @click="editToWatch = !editToWatch"><v-icon>mdi-pencil-off-outline</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <div v-show="showToWatchError" class="deep-orange--text">
              <v-icon color="deep-orange">mdi-alert-circle-outline</v-icon> Already Exists
            </div>

            <v-autocomplete v-show="editToWatch"
              clearable
              prepend-icon="mdi-movie-search-outline"
              :items="toWatchResults"
              item-text="title"
              label="Search a Film/TV Series Title"
              :search-input.sync="toWatchSearch"
              :loading="isToWatchLoading"
              :menu-props="{closeOnContentClick: true}">
              
              <template v-slot:item="{item}">
                <v-list-item @click="addToList('toWatch', item)">
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img :src="item.poster_path ? (TMDB_BASE_IMG_URL + item.poster_path) : require('@/assets/placeholder_poster.png')"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title || item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.release_date ? item.release_date.substring(0,4) : (item.first_air_date ? item.first_air_date.substring(0,4) : 'N.d')"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
            <v-list class="text-left" subheader two-line flat width="100%">
              <v-list-item-group multiple>
                <v-list-item v-for="(movie, i) in sortedToWatch" :key="i">
                  <v-list-item-action v-show="editToWatch">
                    <v-btn icon color="error"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img :src="movie.poster_path"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">{{movie.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{formatDate(movie.release_date)}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from "vue"

  export default {
    name: 'MyList',

    data: () => ({
      BACKEND_HOST: null,
      BACKEND_PORT: null,
      BACKEND_API: null,
      TMDB_BASE_IMG_URL: "https://image.tmdb.org/t/p/original",
      settings: [],
      user: null,
      editWatched: false,
      watched: [],
      showWatchedError: false,
      editToWatch: false,
      toWatch: [],
      showToWatchError: false,
      queryUrl: 'https://api.themoviedb.org/3/search/multi?language=en-US&page=1&include_adult=false',
      isWatchedLoading: false,
      watchedResults: [],
      watchedSearch: null,
      watchedTimer: null,
      isToWatchLoading: false,
      toWatchResults: [],
      toWatchSearch: null,
      toWatchTimer: null,
      selectedResult: null
      // search: null,
    }),

    methods: {
      getUser: function () {
        return this.$auth.user;
      },

      queryAPI: function (type, search) {
        // Lazily load input items
        let apiKey = process.env.VUE_APP_TMDB_API_KEY;
        let url = this.queryUrl + '&api_key=' + apiKey + '&query=' + search;

        fetch(url)
        .then(res => res.json())
        .then(res => {
          // Check to determine which array to add results to
          if (type === 'watched') {
            this.watchedResults = res.results.filter((item) => {
              return (item.media_type === 'movie' || item.media_type === 'tv') ;
            });
          } else {
            this.toWatchResults = res.results.filter((item) => {
              return (item.media_type === 'movie' || item.media_type === 'tv') ;
            });
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          // Turn off loading flag
          if (type === 'watched')
            this.isWatchedLoading = false;
          else
            this.isToWatchLoading = false;
        });
      },

      addToList: function (type, movie) {
        console.log(movie);
        let item = {
          id: movie.id,
          title: movie.title || movie.name,
          media_type: movie.media_type,
          poster_path: movie.poster_path ? (this.TMDB_BASE_IMG_URL + movie.poster_path) : require('@/assets/placeholder_poster.png'),
          release_date: movie.release_date || movie.first_air_date || 'N.d'
        };

        let headers = {
          headers: {
            api_key: this.BACKEND_API_KEY
          },
        }

        let post_data = {
          user: this.user.email,
          movie: item
        }
        
        if (type === 'watched') {
          Vue.http.post(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/watched`, post_data, headers).then(() => {
            this.watched.unshift(item);
          }).catch(error => {
            if (error.status === 409) {
              this.showWatchedError = true;
              setTimeout(() => {this.showWatchedError = false}, 2000);
            }
          });

        } else {
          Vue.http.post(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/towatch`, post_data, headers).then(() => {
            this.toWatch.unshift(item);
          }).catch(error => {
            if (error.status === 409) {
              this.showToWatchError = true;
              setTimeout(() => {this.showToWatchError = false}, 2000);
            }
          });
        }
      },

      formatDate: function (date) {
        const temp = new Date(date);
        return temp.getFullYear();
      }
    },

    created () {
      this.user = this.getUser();
      this.BACKEND_HOST = process.env.VUE_APP_BACKEND_HOST;
      this.BACKEND_PORT = process.env.VUE_APP_BACKEND_PORT;
      this.BACKEND_API_KEY = process.env.VUE_APP_WATCHER_BACKEND_API_KEY;

      let headers = {
        headers: {
          api_key: this.BACKEND_API_KEY
        },
        params: {
          user: this.user.email,
        }
      }
      
      // GET Watched List
      Vue.http.get(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/watched`, headers).then(response => {
        console.log(response);
        this.watched = response.body.watched;
      });

      // GET ToWatch List
      Vue.http.get(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/towatch`, headers).then(response => {
        console.log(response);
        this.toWatch = response.body.towatch;
      });
    },

    computed: {
      sortedWatched () {
        return this.watched.slice().sort(function (a, b) {
          return new Date(b.date_added) - new Date(a.date_added);
        });
      },

      sortedToWatch () {
        return this.toWatch.slice().sort(function (a, b) {
          return new Date(b.date_added) - new Date(a.date_added);
        });
      }
    },

    watch: {
      watchedSearch: function () {
        if (!this.watchedSearch) {
          return;
        }
        this.isWatchedLoading = true;

        // Set delay before performing API call
        if (this.watchedTimer !== null) {
          clearTimeout(this.watchedTimer);
        }
        this.watchedTimer = setTimeout(this.queryAPI('watched', this.watchedSearch), 500);
      },

      toWatchSearch: function () {
        if (!this.toWatchSearch) {
          return;
        }
        this.isToWatchLoading = true;

        // Set delay before performing API call
        if (this.toWatchTimer !== null) {
          clearTimeout(this.toWatchTimer);
        }
        this.toWatchTimer = setTimeout(this.queryAPI('toWatch', this.toWatchSearch), 500);
      }
    }
  }
</script>
