export default (config) => {
	if (!config.devServer) {
		config.output.publicPath = '/aos-to-address/';
	}
};