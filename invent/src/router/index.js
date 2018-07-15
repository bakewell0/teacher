import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import aftersalelist from '@/pages/aftersalelist'
import aftersaletype from '@/pages/aftersaletype'
import customerlist from '@/pages/customerlist'
import customertype from '@/pages/customertype'
import goodslist from '@/pages/goodslist'
import goodstype from '@/pages/goodstype'
import protype from '@/pages/protype'
import prolist from '@/pages/prolist'
import prodetail from '@/pages/prodetail'
import purchaselist from '@/pages/purchaselist'
import purchasetype from '@/pages/purchasetype'
import purchasedetail from '@/pages/purchasedetail'
import stafflist from '@/pages/stafflist'
import stafftype from '@/pages/stafftype'
import supplierlist from '@/pages/supplierlist'
import suppliertype from '@/pages/suppliertype'
import wharehouselist from '@/pages/wharehouselist'
import wharehousetype from '@/pages/wharehousetype'

Vue.use(Router);

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/aftersalelist',
      name: 'aftersalelist',
      component: aftersalelist
    },
     {
      path: '/aftersaletype',
      name: 'aftersaletype',
      component: aftersaletype
    },
     {
      path: '/customerlist',
      name: 'customerlist',
      component: customerlist
    },
     {
      path: '/customertype',
      name: 'customertype',
      component: customertype
    },
     {
      path: '/goodslist',
      name: 'goodslist',
      component: goodslist
    },
     {
      path: '/goodstype',
      name: 'goodstype',
      component: goodstype
    },
    {
      path: '/protype',
      name: 'protype',
      component: protype
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
      path: '/purchasetype',
      name: 'purchasetype',
      component: purchasetype
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
      path: '/stafftype',
      name: 'stafftype',
      component: stafftype
    },
    {
      path: '/supplierlist',
      name: 'supplierlist',
      component: supplierlist
    },
    {
      path: '/suppliertype',
      name: 'suppliertype',
      component: suppliertype
    },
    {
      path: '/wharehouselist',
      name: 'wharehouselist',
      component: wharehouselist
    },
    {
      path: '/wharehousetype',
      name: 'wharehousetype',
      component: wharehousetype
    }
  ]
})
