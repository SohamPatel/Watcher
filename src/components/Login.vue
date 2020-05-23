<template>
  <v-container>
    <v-row class="text-center">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Username" prepend-icon="mdi-account-circle" />
            <v-text-field :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
          </v-form>
        </v-card-text>
        <v-spacer></v-spacer>
        <div class="text-left blue--text pl-2">
          <router-link class="blue--text" to="/register">Register</router-link>
        </div>
        <v-card-actions class="fill-width justify-space-between">
          <v-btn block color="success">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Login',

    data: () => ({
      showPassword: false,
    }),
  }
</script>
