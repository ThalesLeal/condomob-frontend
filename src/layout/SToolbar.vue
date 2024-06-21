<template>
  <v-toolbar
    flat
    style="overflow-x:auto; white-space: nowrap;"
  >
    <v-btn
      text
      to="/permissao"
      target="_blank"
    >
      <v-icon class="material-icons-outlined mr-2">
        badge
      </v-icon>
      Permissões
    </v-btn>
    <v-btn
      text
      to="/documento"
      target="_blank"
    >
      <v-icon class="material-icons-outlined mr-2">
        description
      </v-icon>
      Documentos
    </v-btn>
    <v-btn
      text
      to="/boleto"
      target="_blank"
    >
      <v-icon class="material-icons-outlined mr-2">
        request_quote
      </v-icon>
      Boletos
    </v-btn>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          v-if="(user.roles && user.roles.includes('change_vistoria')) || user.is_superuser"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="material-icons-outlined mr-2">
            checklist
          </v-icon>
          Vistoria
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item to="/vistoria">
          <v-list-item-title>Vistorias</v-list-item-title>
        </v-list-item>
        <v-list-item to="/vistoria-boleto">
          <v-list-item-title>Boletos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="material-icons-outlined mr-2">
            folder
          </v-icon>
          Cadastros Secundários
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item to="/taxa">
          <v-list-item-title>Taxas</v-list-item-title>
        </v-list-item>
        <v-list-item to="/ponto">
          <v-list-item-title>Pontos</v-list-item-title>
        </v-list-item>
        <v-list-item to="/item-vistoria">
          <v-list-item-title>Itens da Vistoria</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      text
      to="/relatorio"
    >
      <v-icon class="material-icons-outlined mr-2">
        print
      </v-icon>
      Relatórios
    </v-btn>
    <v-btn
      text
      to="/configuracao"
    >
      <v-icon class="material-icons-outlined mr-2">
        tune
      </v-icon>
      Configurações
    </v-btn>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="material-icons-outlined mr-2">
            loupe
          </v-icon>
          Consultas
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item to="/consulta-veiculo">
          <v-list-item-title>Veiculo</v-list-item-title>
        </v-list-item>
        <v-list-item to="/consulta-pessoa">
          <v-list-item-title>Pessoa</v-list-item-title>
        </v-list-item>
        <v-list-item to="/consulta-boleto">
          <v-list-item-title>Boleto</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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