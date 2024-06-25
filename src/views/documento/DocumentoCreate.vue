<template>
  <div>
    <v-form ref="form">
      <v-row align="center">
        <v-col
          cols="6"
          class="d-flex"
        >
          <v-file-input
            v-model="file"
            label="Anexar Arquivo"
            prepend-icon="mdi-file-document-outline"
            accept=".pdf,.doc,.docx,.jpg,.png,.csv"
            class="file-input"
            hide-details
            dense
          />
        </v-col>
        <v-col
          cols="3"
          class="d-flex justify-end"
        >
          <v-btn
            color="primary"
            class="upload-btn"
            small
            @click="uploadFile"
          >
            <v-icon class="mr-2">
              description
            </v-icon>
            Enviar Arquivo
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'DocumentoList',
  props: {
    permissao: Object
  },
  data: () => ({
    headers: [
      { text: 'Data', value: 'data_gerado' },
      { text: 'Descrição', value: 'descricao' },
      { text: 'Usuário', value: 'usuario' },
    ],
    items: [],
    totalItems: 0,
    options: {},
    file: null,  // Campo para o arquivo
  }),
  watch: {
    options: {
      handler: 'getHistorico',
      deep: true,
    },
  },
  created() {
    this.getHistorico()
  },
  methods: {
    async getHistorico() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      const query = {
        page: page,
        page_size: itemsPerPage,
        ordering: `${sortDesc && sortDesc[0] ? "-" : ""}${sortBy}`
      }
      try {
        const response = await this.$api.list({
          resource: this.$endpoints.DOCUMENTO,
          query: query
        })
        this.items = response.data.results
        this.totalItems = response.data.count
      } catch (error) {
        this.$toast.error('Erro ao buscar histórico.')
      }
    },
    async uploadFile() {
      if (!this.file) {
        this.$toast.error('Por favor, selecione um arquivo para enviar.')
        return
      }
      const formData = new FormData()
      formData.append('documento', this.file)  // Nome do campo alterado para 'documento'
      try {
        await this.$api.create({
          resource: this.$endpoints.DOCUMENTO,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$toast.success('Arquivo enviado com sucesso!')
        this.file = null
        this.$refs.form.reset()
        this.getHistorico()  // Atualiza a lista de documentos após o upload
      } catch (error) {
        this.$toast.error('Erro ao enviar o arquivo.')
      }
    },
    formatDateTime(dateTime) {
      // Função para formatar a data e hora, se necessário
      return new Date(dateTime).toLocaleString()
    }
  }
}
</script>

<style>
.file-input {
  width: 100%; /* Ajusta a largura do campo de arquivo */
}

.upload-btn {
  width: 100%; /* Ajusta a largura do botão */
}
</style>
