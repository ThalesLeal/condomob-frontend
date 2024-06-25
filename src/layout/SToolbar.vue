<template>
  <v-toolbar
    flat
    style="overflow-x:auto; white-space: nowrap;"
  >
    <v-btn
      text
      to="/documento"
      target="_blank"
    >
      <v-icon class="material-icons-outlined mr-2">
        description
      </v-icon>
      Gerar Documentos
    </v-btn>
    <v-btn
      text
      to="/documento/historico"
      target="_blank"
    >
      <v-icon class="material-icons-outlined mr-2">
        description
      </v-icon>
      Historico de Documentos
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
    name: 'SToolbar'
}
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}
</style>