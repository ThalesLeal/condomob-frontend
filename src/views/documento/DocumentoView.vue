<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              <span class="headline">Visualizar Documento</span>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="dados"
                class="elevation-1"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="voltar"
              >
                Voltar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DocumentoView',
  props: ['id'],
  data: () => ({
    dados: [],
    headers: [], // Defina as colunas conforme necessário
  }),
  created() {
    this.carregarDados();
  },
  methods: {
    async carregarDados() {
      try {
        console.log(`Carregando dados para o documento ID: ${this.id}`);
        const response = await axios.get(`/api/documento/visualizar`, {
          params: {
            id_arquivo: this.id
          }
        });
        console.log('Dados carregados:', response.data);
        this.dados = response.data;
        if (response.data.length > 0) {
          this.headers = Object.keys(response.data[0]).map(key => ({ text: key, value: key }));
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do documento:', error);
        this.$toast.error('Erro ao carregar os dados do documento.');
      }
    },
    voltar() {
      this.$router.push('/documento/historico');
    }
  }
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
