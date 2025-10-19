// export default { extends: ['@commitlint/config-conventional'] };
const config = {
	rules: {
		'header-pattern': [
			2,
			'always',
			/^#\d+\s+(feat|fix|docs|refactor|ci|chore|style|test)(\([a-zA-Z0-9_-]+\))?:\s[a-zA-Z0-9].{0,178}$/,
		],
		'header-max-length': [2, 'always', 200],
	},
};

module.exports = config;
