// export default { extends: ['@commitlint/config-conventional'] };
const config = {
	rules: {
		'header-pattern': [2, 'always', /^.*#\d+.*$/],
		'header-pattern-message': [
			2,
			'always',
			'Commit must contain an issue number like #123 or #000349',
		],
		'header-max-length': [2, 'always', 200],
	},
};

module.exports = config;
