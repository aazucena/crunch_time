module.exports = [
	// Add support for native node modules
	{
		// We're specifying native_modules in the test because the asset relocator loader generates a
		// "fake" .node file which is really a cjs file.
		test: /native_modules[/\\].+\.node$/,
		use: 'node-loader',
	},
	{
		test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
		type: 'asset/resource',
	},
	{
		test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: '@vercel/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules',
			},
		},
	},
	{
		test: /\.svg$/,
		use: [
			{ loader: 'svg-inline-loader' },
			{
				loader: 'svg-url-loader',
				options: {
					// make all svg images to work in IE
					iesafe: true,
				},
			},
		],
	},
	// Put your webpack loader rules in this array.  This is where you would put
	// your ts-loader configuration for instance:
	/**
	 * Typescript Example:
	 *
	 * {
	 *   test: /\.tsx?$/,
	 *   exclude: /(node_modules|.webpack)/,
	 *   loaders: [{
	 *     loader: 'ts-loader',
	 *     options: {
	 *       transpileOnly: true
	 *     }
	 *   }]
	 * }
	 */
];
