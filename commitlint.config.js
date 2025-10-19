// /** @type {import('@commitlint/types').UserConfig} */
module.exports = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			// 👇 Parse "#1234 fix(ui): message" into parts: task, type, scope, subject
			headerPattern:
				/^#(?<task>\d{1,11})\s+(?<type>feat|fix|docs|refactor|ci|chore|style|test)(?:\((?<scope>[a-zA-Z0-9_-]+)\))?:\s(?<subject>.+)$/,
			headerCorrespondence: ['task', 'type', 'scope', 'subject'],
		},
	},
	rules: {
		// ✅ Allowed commit types
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'docs', 'refactor', 'ci', 'chore', 'style', 'test'],
		],

		// ✅ Must include a subject
		'subject-empty': [2, 'never'],

		// ✅ Subject must be < 200 chars
		'subject-max-length': [2, 'always', 200],

		// ✅ You can’t have commits without the leading #
		'header-starts-with': [2, 'always', '#'],

		// ✅ Ensure the whole header isn’t absurdly long
		'header-max-length': [2, 'always', 200],
	},
};

// export default {
// 	rules: {
// 		// Must start with # and a number, then space
// 		'header-match-pattern': [
// 			2,
// 			'always',
// 			/^#\d{1,10}\s+(feat|fix|docs|refactor|ci|chore|style|test)(\([a-zA-Z0-9_-]+\))?:\s.{1,200}$/,
// 		],
// 	},
// 	plugins: [
// 		{
// 			rules: {
// 				'header-match-pattern': ({ header }, when = 'always', regex) => {
// 					const pattern = new RegExp(regex);
// 					const valid = pattern.test(header);
// 					return [valid];
// 				},
// 			},
// 		},
// 	],
// };

// commitlint.config.js

// module.exports = {
// 	extends: ['@commitlint/config-conventional'],
// 	rules: {
// 		// 0. 'commit-number' every commit should have a commit code like #12345..
// 		// ✅ Require a task number pattern (# followed by digits) anywhere in the header
// 		'header-match-pattern': [
// 			2,
// 			'always',
// 			/^#\d{1,10}\s+(feat|fix|docs|refactor|ci|chore|style|test)(\([a-zA-Z0-9_-]+\))?:\s.{1,200}$/,
// 		],
// 		// 1. Types allowed in your project
// 		'type-enum': [
// 			2,
// 			'always',
// 			[
// 				'feat', // new feature
// 				'fix', // bug fix
// 				'docs', // documentation only changes
// 				'style', // formatting, missing semi-colons, etc
// 				'refactor', // code change that neither fixes a bug nor adds a feature
// 				'perf', // a code change that improves performance
// 				'test', // adding missing tests or correcting existing tests
// 				'chore', // changes to the build process or auxiliary tools
// 				'ci', // CI related
// 			],
// 		],
// 		// 2. (Optional) You can enforce scopes if you like:
// 		// 'scope-enum': [2, 'always', ['api', 'ui', 'build', 'deps']],
// 		// 3. Subject must be lowercase, no trailing period
// 		'subject-case': [2, 'never', ['start-case', 'pascal-case']],
// 		'subject-full-stop': [2, 'never', '.'],
// 		// 4. Header (type + scope + subject) max length
// 		'header-max-length': [2, 'always', 200],
// 	},
// };
