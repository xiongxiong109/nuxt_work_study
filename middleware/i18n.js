// 国际化中间件
export default ({ app, params, store }) => {
	let { lang } = params;
	store.commit('changeLang', lang);
	app.i18n.locale = store.state.lang;
}