<template>
  <div> 
    <!-- Botão de Histórico com Ícone de Histórico -->
    <v-btn
      color="secondary"
      class="mt-4"
    >
      <v-icon class="mr-2">
        mdi-history
      </v-icon>
      Histórico
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :items-per-page="10"
      :footer-props="{
        'items-per-page-options': [10, 20, 30]
      }"
    >
      <template #[`item.data`]="{ item }">
        {{ formatDateTime(item.data_gerado) }}
      </template>
    </v-data-table>
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
    max-width: 100%;
  }
  
  .upload-btn {
    width: 100%;
  }
  </style>
  