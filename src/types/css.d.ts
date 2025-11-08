// ✅ برای فایل‌های CSS ماژولی (Component.module.css)
declare module '*.module.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

// ✅ برای فایل‌های SCSS ماژولی (Component.module.scss)
declare module '*.module.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

// ✅ برای import‌های side-effect مثل globals.css یا reset.css
declare module '*.css';
declare module '*.scss';
