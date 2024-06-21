import Vue from 'vue'
import VueRouter from 'vue-router'
import { isValidToken } from '@/services/auth.service'

Vue.use(VueRouter)

const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/SApp')

const routeOptions = [
  { path: 'permissao', name: 'permissao/PermissaoList', },
  // Exemplo de url protegida
  // { path: 'permissao/:id', name: 'permissao/PermissaoEdit', meta: { authorize: 'change_permissao' } },
  { path: 'permissao/:id', name: 'permissao/PermissaoEdit' },
  { path: 'permissao/historico/:id', name: 'historico/HistoricoDetail' },
  { path: 'veiculo/precadastro/', name: 'veiculo/VeiculoPrecadastroCreate' },
  { path: 'veiculo/precadastro/:id', name: 'veiculo/VeiculoPrecadastroEdit' },
  { path: 'veiculo/', name: 'veiculo/VeiculoCreate' },
  { path: 'veiculo/:id', name: 'veiculo/VeiculoEdit' },
  { path: 'pessoa/precadastro/', name: 'pessoa/PessoaPrecadastroCreate' },
  { path: 'pessoa/precadastro/:id', name: 'pessoa/PessoaPrecadastroEdit' },
  { path: 'pessoa/', name: 'pessoa/PessoaCreate' },
  { path: 'pessoa/:id', name: 'pessoa/PessoaEdit' },
  { path: 'taxa', name: 'taxa/TaxaList' },
  { path: 'taxa/cadastrar', name: 'taxa/TaxaCreate' },
  { path: 'taxa/:id', name: 'taxa/TaxaEdit' },
  { path: 'ponto', name: 'ponto/PontoList' },
  { path: 'ponto/cadastrar', name: 'ponto/PontoCreate' },
  { path: 'ponto/:id', name: 'ponto/PontoEdit' },
  { path: 'configuracao', name: 'configuracao/ConfiguracaoList' },
  { path: 'configuracao/:id', name: 'configuracao/ConfiguracaoEdit' },
  { path: 'documento', name: 'documento/DocumentoList' },
  { path: 'relatorio', name: 'relatorio/RelatorioList' },
  { path: 'boleto', name: 'boleto/BoletoCreate' },
  { path: 'vistoria', name: 'vistoria/VistoriaList', meta: { authorize: 'change_vistoria' } },
  { path: 'vistoria/:id', name: 'vistoria/VistoriaEdit', meta: { authorize: 'change_vistoria' } },
  { path: 'requerimento/cadastrar', name: 'requerimento/RequerimentoCreate' },
  { path: 'requerimento/:id', name: 'requerimento/RequerimentoEdit' },
  { path: 'item-vistoria', name: 'item-vistoria/ItemVistoriaList', meta: { authorize: 'change_vistoria' } },
  { path: 'item-vistoria/cadastrar', name: 'item-vistoria/ItemVistoriaCreate', meta: { authorize: 'change_vistoria' } },
  { path: 'item-vistoria/:id', name: 'item-vistoria/ItemVistoriaEdit', meta: { authorize: 'change_vistoria' } },
  { path: 'consulta-veiculo', name: 'consulta/ConsultaVeiculo'},
  { path: 'consulta-pessoa', name: 'consulta/ConsultaPessoa'},
  { path: 'consulta-boleto', name: 'consulta/ConsultaBoleto'},
  { path: 'vistoria-boleto', name: 'vistoria/VistoriaListBoleto'},
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import(/* webpackChunkName: "[request]" */ `@/views/${route.name}`)
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login')
    },
    {
      path: '/',
      component: Layout,
      children: routes
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('condomob@accessToken')
  const user = JSON.parse(localStorage.getItem('condomob@user'))
  const { authorize } = to.meta
  if (to.name !== 'Login' && !isValidToken(token)) { next({ name: 'Login' }) }
  else if (user && !user.is_superuser && authorize && !user.roles.includes(authorize)) {
    Vue.$toast.open({
      message: "Você não tem permissão para executar esta ação",
      type: "error",
    })
  }
  else next()
})

export default router