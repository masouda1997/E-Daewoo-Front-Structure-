export default {
	rules: {
		// Must start with # and a number, then space
		'header-match-pattern': [
			2,
			'always',
			/^#\d{1,15}\s+(feat|fix|docs|refactor|ci|chore|style|test)(\([a-zA-Z0-9_-]+\))?:\s.{1,200}$/,
		],
	},
	plugins: [
		{
			rules: {
				'header-match-pattern': ({ header }, when = 'always', regex) => {
					const pattern = new RegExp(regex);
					const valid = pattern.test(header);
					return [valid];
				},
			},
		},
	],
};
