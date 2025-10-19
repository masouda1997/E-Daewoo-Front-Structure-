const commitRulesPlugin = {
	rules: {
		'header-match-pattern': ({ header }, _when, regex) => {
			const pattern = new RegExp(regex);
			const valid = pattern.test(header);
			return [valid];
		},
	},
};

export default {
	plugins: [commitRulesPlugin],
	rules: {
		'header-match-pattern': [
			2,
			'always',
			'^#\\d{1,10}\\s+(feat|fix|docs|refactor|ci|chore|style|test)(\\([a-zA-Z0-9_-]+\\))?:\\s.{1,200}$',
		],
	},
	// // Must start with # and a number, then space
	// 'header-match-pattern': [
	// 	2,
	// 	'always',
	// 	/^#\d{1,10}\s+(feat|fix|docs|refactor|ci|chore|style|test)(\([a-zA-Z0-9_-]+\))?:\s.{1,200}$/,
	// ],
};
