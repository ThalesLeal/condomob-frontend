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
                :items="documento"
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
import http from '@/services/http';

export default {
  name: 'DocumentoView',
  data: () => ({
    headers: [
      { text: 'ID_UNIDADE', value: 'ID_UNIDADE' },
      { text: 'VENCIMENTO', value: 'VENCIMENTO' },
      { text: 'TOKEN_CONTA', value: 'TOKEN_CONTA' },
      { text: 'NOSSO_NUMERO', value: 'NOSSO_NUMERO' },
      { text: 'ID_CONDOMINIO', value: 'ID_CONDOMINIO' },
      { text: 'TAXA_DE_JUROS', value: 'TAXA_DE_JUROS' },
      { text: 'TAXA_DE_MULTA', value: 'TAXA_DE_MULTA' },
      { text: 'TAXA_DE_DESCONTO', value: 'TAXA_DE_DESCONTO' },
      { text: 'CONTA_BANCARIA', value: 'CONTA_BANCARIA' },
      { text: 'TOKEN_FACILITADOR', value: 'TOKEN_FACILITADOR' },
      { text: 'DATA_DE_COMPETENCIA', value: 'DATA_DE_COMPETENCIA' },
      { text: 'COBRANCA_EXTRAORDINARIA', value: 'COBRANCA_EXTRAORDINARIA' },
      // Adicione mais headers conforme necessário
    ],
    documento: []
  }),
  created() {
    this.carregarDados(this.$route.params.id)
  },
  methods: {
    async carregarDados(documentoId) {
      try {
        console.log(`Carregando dados para o documento ID: ${documentoId}`)
        const response = await http.get('/documento/visualizar', {
          params: {
            id_arquivo: documentoId
          }
        })
        console.log('Dados carregados:', response.data)
        this.documento = Array.isArray(response.data) ? response.data : [response.data]
      } catch (error) {
        console.error('Erro ao carregar os dados do documento:', error)
        this.$toast.error('Erro ao carregar os dados do documento.')
      }
    },
    voltar() {
      this.$router.push('/documento/historico')
    }
  }
}
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
