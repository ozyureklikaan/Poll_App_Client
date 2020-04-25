const devEnv = require('./config/dev.env'),
    prodEnv = require('./config/prod.env')

module.exports = {
	chainWebpack: config => {
		config.module.rules.delete('eslint')
		lintOnSave: process.env.NODE_ENV !== 'production'
		
		config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.hotReload = false
                return options
			});
		
		if (process.env.APP_ENV === 'production') {
			config.plugin("define").tap(args => {
				const baseEnv = args[0]["process.env"]
				args[0]["process.env"] = { ...baseEnv, ...prodEnv }
				return args
			});

			config.devtools = false
			config.debug = false
		}
		else { // development
            config.devtools = true;
            config.plugin("define").tap(args => {
                const baseEnv = args[0]["process.env"]
                args[0]["process.env"] = { ...baseEnv, ...devEnv }
                return args
            });
        }
	},
	devServer: {
        https: true,
        disableHostCheck: true,
    },
    transpileDependencies: ['vuetify'],
    pluginOptions: {
        i18n: {
            locale: 'tr',
            fallbackLocale: 'tr',
            localeDir: 'locales',
            enableInSFC: false,
        },
    }
};