export default function (next, store) {
  if (!store.state.isAuthenticated) {
    next("/");
    store.commit("setIsLoginOpen", true);
  } else {
    next();
  }
}
