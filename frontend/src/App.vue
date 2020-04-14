<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app color="primary" dark>
      <!-- Logo -->
      <v-toolbar-title color="white" class="text-white" :icon="true"><i class="mdi mdi-box-shadow"></i> Watcher</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <!-- Search Movies/TV Shows -->
      <v-text-field hide-details prepend-icon="mdi-movie-search-outline" single-line placeholder="Find Movies/TV Shows"></v-text-field>

      <v-spacer></v-spacer>

      <!-- Home, MyList, Login -->
      <v-btn text rounded :to="{ name:'Home' }" exact><i class="mdi mdi-home pr-1"></i>Home</v-btn>
      <v-btn text rounded :to="{ name: 'MyList' }" exact><i class="mdi mdi-format-list-checkbox pr-1"></i>My List</v-btn>
      <v-btn v-if="!$auth.isAuthenticated" text rounded @click="login()"><i class="mdi mdi-login-variant pr-1"></i>Login</v-btn>


      <div v-if="!$auth.loading">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="dropdown avatar-dropdown primary" v-on="on">
              <!-- Profile Picture -->
              <v-avatar color="grey darken-3" size="36px">
                <v-img class="elevation-6" :src="$auth.user.picture"></v-img>
              </v-avatar>
              <!-- User name -->
              <v-list-item-action width="100px">
                <v-list-item-title width="100px">{{ $auth.user.given_name }} <i class="mdi mdi-arrow-down-drop-circle-outline"></i></v-list-item-title>
              </v-list-item-action>
            </v-btn>
          </template>
          <v-list>
            <v-list-item class="avatar-dropdown-item font-weight-bold" @click="logout()">
              <v-list-item-title text rounded @click="logout()"><i class="mdi mdi-logout-variant pr-1"></i>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-overflow-btn class="my-2" :items="dropdown_font" label="Overflow Btn" target="#dropdown-example"></v-overflow-btn> -->
        <!-- <v-select v-if="$auth.isAuthenticated" items="items" label="label" segmented overflow editable target="#target">
          <option text rounded @click="logout()" exact>Logout</option>
        </v-select> -->
      </div>
    </v-app-bar>

    <v-content class="mt-12">
      <router-view/>
    </v-content>
    
    <!-- Footer -->
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <div v-if="!$auth.loading">
          <v-btn v-if="$auth.isAuthenticated" text rounded :to="{ name: 'MyList' }" exact color="white" class="my-2">Find Movies or TV Shows</v-btn>
          <v-btn v-if="$auth.isAuthenticated" text rounded @click="logout()" exact color="white" class="my-2">Logout</v-btn>
          <v-btn v-if="!$auth.isAuthenticated" text rounded @click="login()" exact color="white" class="my-2">Login</v-btn>
        </div>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Watcher</strong>
        </v-col>
      </v-row>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    user: {}
  }),
  mounted: () => {
    // console.log('>' + this.$auth);
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style scoped>
.avatar-dropdown {
  flex: none;
  height: 43px !important;
}

.avatar-dropdown-item:hover {
  background-color: #E5E8E8 !important;
}
</style>
