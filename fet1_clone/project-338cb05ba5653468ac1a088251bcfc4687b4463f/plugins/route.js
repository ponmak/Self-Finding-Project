// export default ({ app }) => {
//     app.router.beforeEach((to, from, next) => {
//         var user = sessionStorage.getItem("user");
//         if (to.fullPath == "/login") {
//             next();
//         } else {
//             if (user == null) {
//                 next({
//                     path: '/login',
//                 })
//             } else {
//                 next();
//             }
//         }
//     })
// }