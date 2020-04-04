<template>
  <v-container>
    <h1 class="display-1 mb-5">My List</h1>
    <v-row class="text-center">
      <v-col cols="md-6">
        <v-card class="pa-2" outlined tile>
          <v-card-title class="title font-weight-black">Watched</v-card-title>
          <v-card-text>
            <v-list class="text-left" subheader two-line flat width="100%">
              <v-list-item-group v-model="settings" multiple>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="md-6">
        <v-card class="pa-2" outlined tile>
          <v-card-title>To Watch</v-card-title>
          <v-card-text>
            <v-list class="text-left" subheader two-line flat width="100%">
              <v-list-item-group v-model="settings" multiple>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  
                  <v-list-item-avatar class="mr-5" tile height="60">
                    <v-img src="https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"></v-img>
                  </v-list-item-avatar>
                  
                  <v-list-item-content>
                    <v-list-item-title class="title headline">Star Wars: The Rise of Skywalker</v-list-item-title>
                    <v-list-item-subtitle>2020</v-list-item-subtitle>
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
  export default {
    name: 'MyList',

    data: () => ({
      settings: []
    }),
  }
</script>
