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
            <div v-show="showWatchedExistsError" class="deep-orange--text">
              <v-icon color="deep-orange">mdi-alert-circle-outline</v-icon> Already exists
            </div>
            <div v-show="showWatchedNotFoundError" class="deep-orange--text">
              <v-icon color="deep-orange">mdi-alert-circle-outline</v-icon> Not found, please refresh page
            </div>
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
                <draggable tag="ul" ghost-class="moving-card" group="all-items" :list="watched" :animation="200" v-on:change="listChange('watched', $event)">
                  <v-list-item v-for="(movie, i) in getWatchedList" :key="i">
                    <v-list-item-action v-show="editWatched">
                      <v-btn icon color="error" @click="removeFromList('watched', movie.id)"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
                    </v-list-item-action>
                    
                    <v-list-item-avatar class="mr-5" tile height="60">
                      <v-img :src="movie.poster_path"></v-img>
                    </v-list-item-avatar>
                    
                    <v-list-item-content>
                      <v-list-item-title class="title headline">{{movie.title}}</v-list-item-title>
                      <v-list-item-subtitle>{{formatDate(movie.release_date)}} - {{movie.id}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </draggable>
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
            <div v-show="showToWatchExistsError" class="deep-orange--text">
              <v-icon color="deep-orange">mdi-alert-circle-outline</v-icon> Already Exists
            </div>
            <div v-show="showToWatchNotFoundError" class="deep-orange--text">
              <v-icon color="deep-orange">mdi-alert-circle-outline</v-icon> Not found, please refresh page
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
                <v-list-item @click="addToList('towatch', item)">
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
                <draggable tag="ul" ghost-class="moving-card" group="all-items" :list="toWatch" :animation="200" v-on:change="listChange('towatch', $event)">
                  <v-list-item v-for="(movie, i) in getToWatchList" :key="i">
                    <v-list-item-action v-show="editToWatch">
                      <v-btn icon color="error" @click="removeFromList('towatch', movie.id)"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
                    </v-list-item-action>
                    
                    <v-list-item-avatar class="mr-5" tile height="60">
                      <v-img :src="movie.poster_path"></v-img>
                    </v-list-item-avatar>
                    
                    <v-list-item-content>
                      <v-list-item-title class="title headline">{{movie.title}}</v-list-item-title>
                      <v-list-item-subtitle>{{formatDate(movie.release_date)}} - {{movie.id}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </draggable>
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
  import Draggable from "vuedraggable";

  export default {
    name: 'MyList',
    components: {
      Draggable
    },
    data: () => ({
      BACKEND_HOST: null,
      BACKEND_PORT: null,
      BACKEND_API: null,
      TMDB_BASE_IMG_URL: "https://image.tmdb.org/t/p/original",
      settings: [],
      user: null,
      editWatched: false,
      watched: [],
      showWatchedExistsError: false,
      showWatchedNotFoundError: false,
      editToWatch: false,
      toWatch: [],
      showToWatchExistsError: false,
      showToWatchNotFoundError: false,
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

      addToList: function (type, movie, listChange=false) {
        // Check if already exists in watched or towatch lists
        if ((this.watched.some(e => e.id === movie.id) === true) || (this.toWatch.some(e => e.id === movie.id) === true)) {
          if (type === 'watched')
            this.watchedExists();
          else if (type === 'towatch')
            this.toWatchExists();
          return;
        }
        
        // console.log(movie);
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
            // Don't add if the item was moved from towatch to watched
            if (this.watched.some(e => e.id === item.id) === false) {
              this.watched.unshift(item);
            }
          }).catch(error => {
            if (error.status === 409) {
              this.watchedExists();
              // Remove if already exists and new one added
              if (listChange) {
                let index = this.watched.findIndex(e => e.id === item.id);
                console.log(index);
                this.watched.splice(index, 1);
              }
            }
          });

        } else if (type === 'towatch') {
          Vue.http.post(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/towatch`, post_data, headers).then(() => {
            // Don't add if the item was moved from toWatch to watched
            if (this.toWatch.some(e => e.id === item.id) === false) {
              this.toWatch.unshift(item);
            }
          }).catch(error => {
            if (error.status === 409) {
              this.toWatchExists();
             // Remove if already exists and new one added
              if (listChange) {
                let index = this.toWatch.findIndex(e => e.id === item.id);
                console.log(index);
                this.toWatch.splice(index, 1);
              }
            }
          });
        }
      },

      removeFromList: function (type, movie_id) {
        let headers = {
          headers: {
            api_key: this.BACKEND_API_KEY
          },
        }

        let remove_data = {
          user: this.user.email,
          movie_id: movie_id
        }
        
        if (type === 'watched') {
          Vue.http.delete(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/watched`, {body: remove_data, headers: headers.headers}).then(() => {
            this.watched = this.watched.filter((movie) => {
              return movie.id !== movie_id;
            });
          }).catch(error => {
            if (error.status === 404) {
              this.watchedNotFound();
            }
          });

        } else if (type === 'towatch') {
          Vue.http.delete(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/towatch`, {body: remove_data, headers: headers.headers}).then(() => {
            this.toWatch = this.toWatch.filter((movie) => {
              return movie.id !== movie_id;
            });
          }).catch(error => {
            if (error.status === 404) {
              this.toWatchNotFound();
            }
          });
        }
      },

      listChange: function (type, event) {
        console.log(event);
        if (event.removed) {
          this.removeFromList(type, event.removed.element.id);
        } else if (event.added) {
          if (type === 'watched' || type === 'towatch') {
            this.addToList(type, event.added.element, true);
          }
        }
      },

      watchedExists: function () {
        this.showWatchedExistsError = true;
        setTimeout(() => {this.showWatchedExistsError = false}, 2000);
      },

      toWatchExists: function () {
        this.showToWatchExistsError = true;
        setTimeout(() => {this.showToWatchExistsError = false}, 2000);
      },

      watchedNotFound: function () {
        this.showWatchedNotFoundError = true;
        setTimeout(() => {this.showWatchedNotFoundError = false}, 2000);
      },

      toWatchNotFound: function () {
        this.showToWatchNotFoundError = true;
        setTimeout(() => {this.showToWatchNotFoundError = false}, 2000);
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
        // console.log(response);
        this.watched = response.body.watched;
        this.watched.sort(function (a, b) {
          return new Date(b.date_added) - new Date(a.date_added);
        });
      });

      // GET ToWatch List
      Vue.http.get(`http://${this.BACKEND_HOST}:${this.BACKEND_PORT}/api/towatch`, headers).then(response => {
        // console.log(response);
        this.toWatch = response.body.towatch;
        this.toWatch.sort(function (a, b) {
          return new Date(b.date_added) - new Date(a.date_added);
        });
      });
    },

    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "dragGroup",
          disabled: false,
          ghostClass: "ghost"
        };
      },
      getWatchedList: function () {
        return this.watched;
      },
      getToWatchList: function () {
        return this.toWatch;
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
        this.toWatchTimer = setTimeout(this.queryAPI('towatch', this.toWatchSearch), 500);
      }
    }
  }
</script>

<style scoped>
.moving-card {
  opacity: 0.5;
  background-color: rgba(128, 128, 128, 0.1);
  border: solid 1px;
  border: rgba(0, 0, 255, 0.5); 
}
</style>
