<template>
  <v-container>
    <h1 class="display-1 mb-5">My List</h1>
    <v-row class="text-center">
      <v-col cols="md-6">
        <v-card class="pa-2" outlined tile>
          <v-card-title class="title font-weight-black">Watched</v-card-title>
          <v-card-text>
            <v-list class="text-left" subheader two-line flat width="100%">
              <v-list-item-group multiple>
                <v-list-item v-for="(movie, i) in watched" :key="i">
                  <!-- <v-list-item-action>
                    <v-checkbox color="primary"></v-checkbox>
                  </v-list-item-action> -->
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img :src="movie.poster"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">{{movie.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{movie.year}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="md-6">
        <v-card class="pa-2" outlined tile>
          <v-card-title class="title font-weight-black">To Watch</v-card-title>
          <v-card-text>
            <v-list class="text-left" subheader two-line flat width="100%">
              <v-list-item-group multiple>
                <v-list-item v-for="(movie, i) in toWatch" :key="i">
                  <!-- <v-list-item-action>
                    <v-checkbox color="primary"></v-checkbox>
                  </v-list-item-action> -->
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img :src="movie.poster" draggable="true"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">{{movie.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{movie.year}}</v-list-item-subtitle>
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
  import Vue from "vue";

  export default {
    name: 'MyList',

    data: () => ({
      settings: [],
      user: null,
      watched: [],
      toWatch: []
    }),
    methods: {
      getUser: function () {
        return this.$auth.user;
      },
    },
    created () {
      this.user = this.getUser();
      
      Vue.getUserData(this.user.email).then(res => {
        this.watched = res.watched;
        this.toWatch = res.to_watch;
      });
    },
  }
</script>
