<template> 
  <v-app-bar
    color="blue-grey darken-4"
    app
    dark
    flat
  >
    <v-img
      src="@/assets/logo-condomob.png"
      max-width="280"
    />
    <v-spacer />
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          text
          large
          class="d-none d-sm-flex"
          v-bind="attrs"
          v-on="on"
        >
          <span>{{ user.name }}</span>
          <v-icon class="mr-0">
            arrow_drop_down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { clearToken } from '@/services/auth.service'
export default {
    name: 'SAppbar',
    methods: {
      logout(){
        clearToken()
        this.$router.push('/login')
      }
    }
}
</script>