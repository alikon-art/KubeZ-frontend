import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/listComponents',
      name: 'listComponents',
      component: () => import('../components/listComponents.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/auth/login.vue')
    },
    {
      path: '/podDetailsComponents',
      name: 'podDetailsComponents',
      component: () => import('../components/pod/podDetailsComponents.vue')
    },
    {
      path: '/deploymentDetailsComponents',
      name: 'deploymentDetailsComponents',
      component: () => import('../components/deployment/deploymentDetailsComponents.vue')
    },
    {
      path: '/deploymentCreateComponents',
      name: 'deploymentCreateComponents',
      component: () => import('../components/deployment/deploymentCreateComponents.vue')
    },
    {
      path: '/podCreateComponents',
      name: 'podCreateComponents',
      component: () => import('../components/pod/podCreatecomponents.vue')
    },
    {
      path: '/dashboard',
      name: 'home',
      component: () => import('../views/dashboard/dashboard.vue')
    },
    {
      path: '/testpage',
      name: 'testpage',
      component: () => import('../testPage.vue')
    },
    {
      path: '/cluster',
      name: 'cluster',
      component: () => import('../views/clusterResources/cluster.vue')
    },
    {
      path: '/clusterDetailsComponents',
      name: 'clusterDetailsComponents',
      component: () => import('../components/cluster/clusterDetailsComponents.vue')
    },
    {
      path: '/clusterCreateComponents',
      name: 'clusterCreateComponents',
      component: () => import('../components/cluster/clusterCreateComponents.vue')
    },
    {
      path: '/Node',
      name: 'node',
      component: () => import('../views/clusterResources/node.vue')
    },
    {
      path: '/nameSpace',
      name: 'nameSpace',
      component: () => import('../views/clusterResources/nameSpace.vue')
    },
    {
      path: '/Pod',
      name: 'pod',
      component: () => import('../views/workload/pod.vue')
    },
    {
      path: '/Deployment',
      name: 'deployment',
      component: () => import('../views/workload/deployment.vue')
    },
    {
      path: '/StatefulSet',
      name: 'statefulSet',
      component: () => import('../views/workload/statefulSet.vue')
    },
    {
      path: '/statefulsetCreateComponents',
      name: 'statefulsetCreateComponents',
      component: () => import('../components/statefulset/statefunsetCreateComponents.vue')
    },
    {
      path: '/statefulsetDetailsComponents',
      name: 'statefulsetDetailsComponents',
      component: () => import('../components/statefulset/statefulsetDetailsComponents.vue')
    },
    {
      path: '/DaemonSet',
      name: 'daemonSet',
      component: () => import('../views/workload/daemonSet.vue')
    },
    {
      path: '/daemonSetCreateComponents',
      name: 'daemonSetCreateComponents',
      component: () => import('../components/daemonSet/daemonSetCreateComponents.vue')
    },
    {
      path: '/daemonSetDetailsComponents',
      name: 'daemonSetDetailsComponents',
      component: () => import('../components/daemonSet/daemonSetDetailsComponents.vue')
    },
    {
      path: '/CronJob',
      name: 'cronJob',
      component: () => import('../views/workload/cronJob.vue')
    },
    {
      path: '/Service',
      name: 'service',
      component: () => import('../views/service/service.vue')
    },
    {
      path: '/serviceCreateComponents',
      name: 'serviceCreateComponents',
      component: () => import('../components/service/serviceCreateComponents.vue')
    },
    {
      path: '/serviceDetailsComponents',
      name: 'serviceDetailsComponents',
      component: () => import('../components/service/serviceDetailsComponents.vue')
    },
    {
      path: '/Ingress',
      name: 'ingress',
      component: () => import('../views/service/ingress.vue')
    },
    {
      path: '/Endpoints',
      name: 'endpoints',
      component: () => import('../views/service/endpoints.vue')
    },
    {
      path: '/ConfigMap',
      name: 'configMap',
      component: () => import('../views/configStorage/configMap.vue')
    },
    {
      path: '/configMapCreateComponents',
      name: 'configMapCreateComponents',
      component: () => import('../components/configmap/configmapCreateComponents.vue')
    },
    {
      path: '/configMapDetailsComponents',
      name: 'configMapDetailsComponents',
      component: () => import('../components/configmap/configmapDetailsComponents.vue')
    },
    {
      path: '/Secret',
      name: 'secret',
      component: () => import('../views/configStorage/secret.vue')
    },
    {
      path: '/secretCreateComponents',
      name: 'secretCreateComponents',
      component: () => import('../components/secret/secretCreateComponents.vue')

    },
    {
      path: '/secretDetailsComponents',
      name: 'secretDetailsComponents',
      component: () => import('../components/secret/secretDetailsComponents.vue')
    },
    {
      path: '/PV',
      name: 'pv',
      component: () => import('../views/configStorage/pv.vue')
    },
    {
      path: '/PVC',
      name: 'pvc',
      component: () => import('../views/configStorage/pvc.vue')
    }
  ]
})


export default router
