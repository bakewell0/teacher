import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import afterSalelist from '@/pages/afterSalelist'
import afterSaledetail from '@/pages/afterSaledetail'
import customerlist from '@/pages/customerlist'
import customerdetail from '@/pages/customerdetail'
import goodslist from '@/pages/goodslist'
import goodsdetail from '@/pages/goodsdetail'
import prolist from '@/pages/prolist'
import prodetail from '@/pages/prodetail'
import purchaselist from '@/pages/purchaselist'
import purchasedetail from '@/pages/purchasedetail'
import stafflist from '@/pages/stafflist'
import staffdetail from '@/pages/staffdetail'
import supplierlist from '@/pages/supplierlist'
import supplierdetail from '@/pages/supplierdetail'
import wharehouselist from '@/pages/wharehouselist'
import wharehousedetail from '@/pages/wharehousedetail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/afterSalelist',
      name: 'afterSalelist',
      component: afterSalelist
    },
     {
      path: '/afterSaledetail',
      name: 'afterSaledetail',
      component: afterSaledetail
    },
     {
      path: '/customerlist',
      name: 'customerlist',
      component: customerlist
    },
     {
      path: '/customerdetail',
      name: 'customerdetail',
      component: customerdetail
    },
     {
      path: '/goodslist',
      name: 'goodslist',
      component: goodslist
    },
     {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: goodsdetail
    },
     {
      path: '/prolist',
      name: 'prolist',
      component: prolist
    },
     {
      path: '/prodetail',
      name: 'prodetail',
      component: prodetail
    },
    {
      path: '/purchaselist',
      name: 'purchaselist',
      component: purchaselist
    },
     {
      path: '/purchasedetail',
      name: 'purchasedetail',
      component: purchasedetail
    },
    {
      path: '/stafflist',
      name: 'stafflist',
      component: stafflist
    },
    {
      path: '/staffdetail',
      name: 'staffdetail',
      component: staffdetail
    },
    {
      path: '/supplierlist',
      name: 'supplierlist',
      component: supplierlist
    },
    {
      path: '/supplierdetail',
      name: 'supplierdetail',
      component: supplierdetail
    },
    {
      path: '/wharehouselist',
      name: 'wharehouselist',
      component: wharehouselist
    },
    {
      path: '/wharehousedetail',
      name: 'wharehousedetail',
      component: wharehousedetail
    }
  ]
})
