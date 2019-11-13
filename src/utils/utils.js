import {getRequest} from './api'

export const initMenu = (router, store)=> {
  if (store.state.menus.length > 0) {
    return;
  }
  getRequest("/system/config/menu").then(resp=> {
    if (resp) {
      let fmtRoutes = formatRoutes(resp);
      router.addRoutes(fmtRoutes);
      store.commit('initMenus', fmtRoutes);
    }
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      iconcls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        if (component.startsWith("Home")) {
          require(['../views/' + component + '.vue'], resolve)
        } else if (component.startsWith("Emp")) {
          require(['../views/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith("Per")) {
          require(['../views/personnel/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sal")) {
          require(['../views/salary/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sta")) {
          require(['../views/statistics/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sys")) {
          require(['../views/system/' + component + '.vue'], resolve)
        } else if (component.startsWith("Food")) {
          require(['../views/food/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconcls: iconcls,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
