<template>
  <div>
    <!-- Botão de Histórico com Ícone de Histórico -->
    <v-btn
      color="secondary"
      class="mt-4"
      @click="getHistorico"
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
      <template #[`item.data_gerado`]="{ item }">
        {{ formatDate(item.data_gerado) }}
      </template>
      <template #[`item.descricao`]="{ item }">
        {{ item.descricao }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          color="primary"
          @click="baixarArquivo(item.id)"
        >
          <v-icon left>
            mdi-download
          </v-icon>
          Baixar
        </v-btn>
        <v-btn
          color="secondary"
          @click="visualizarArquivo(item.id)"
        >
          <v-icon left>
            mdi-eye
          </v-icon>
          Visualizar
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
  
  <script>
  import * as documentoService from '@/services/documento.service'

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
        { text: 'Ações', value: 'actions', sortable: false },
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
      async baixarArquivo(documentoId) {
        try {
          const response = await documentoService.carregarArquivo({
            resource: `${this.$endpoints.DOCUMENTO}/segunda_via/`,
            data: {
                id_arquivo: documentoId
            }
          });
          const downloadUrl = window.URL.createObjectURL(response.data)
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', `documento_${documentoId}.csv`); // ou outro nome do arquivo desejado
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          this.$toast.error('Erro ao baixar o arquivo.')
        }
      },
      visualizarArquivo(documentoId) {
      this.$router.push({ name: 'documento/DocumentoView', params: { id: documentoId } });
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
      formatDate(dateTime) {
        const date = new Date(dateTime)
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
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
  
  .mt-4 {
    margin-top: 16px; /* Ajuste conforme necessário */
  }
  </style>
  