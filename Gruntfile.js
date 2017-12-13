/*!
 * Grunt file
 */

module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-sketch' );
	grunt.loadNpmTasks( 'grunt-stylelint' );
	grunt.loadNpmTasks( 'grunt-svgmin' );

	grunt.initConfig( {
		// Lint – Styles
		stylelint: {
			src: [
				'css/*.dev.css',
				//'css/partials/**',
				'!node_modules/**'
			]
		},

		// Postprocessing Styles
		postcss: {
			options: {
				processors: [
					require( 'postcss-import' )( {
						from: "css/wlm-blog.dev.css"
					} ),
					// require( 'postcss-cssnext' )(),
					require( 'postcss-custom-properties' ),
					require( 'autoprefixer' )( {
						browsers: [
							"Android >= 2.3",
							"Chrome >= 10",
							"Edge >= 12",
							"Firefox >= 3.6",
							"IE >= 8",
							"IE_mob 11",
							"iOS >= 5.1",
							"Opera >= 12.5",
							"Safari >= 5.1"
						]
					} )
				]
			},
			dist: {
				files: {
					'css/wlm-blog.css': 'css/wlm-blog.dev.css'
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1
			},
			target: {
				files: {
				  'css/wlm-blog.min.css': 'css/wlm-blog.css'
				}
			}
		},
		
		// Image Optimization
		svgmin: {
			options: {
				plugins: [{
					removeXMLProcInst: false
				}, {
					removeViewBox: false
				}, {
					cleanupNumericValues: false
				}]
			},
			all: {
				files: [{
					expand: true,
					cwd: 'img',
					src: [ '**/*.svg' ],
					dest: 'img/',
					ext: '.svg'
				}]
			}
		},

		// Development
		watch: {
			files: [
				'**/*.css',
				'.{stylelintrc}'
			],
			tasks: 'default'
		}
	} );

	grunt.registerTask( 'lint', [ 'stylelint' ] );
	grunt.registerTask( 'imagery', [ 'sketch_export', 'svgmin' ] );
	grunt.registerTask( 'default', [ 'lint', 'postcss', 'cssmin' ] );
};
