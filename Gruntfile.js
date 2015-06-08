module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                options: {
                    mangle: false
                },
                files: {
                    'public/js/lib/resources.min.js': ['bower_components/jquery/dist/jquery.min.js', 'public/js/lib/underscore-min.js', 'public/js/lib/backbone-min.js'],
                    'public/js/app.js': ['public/js/Models/WallModel.js', 'public/js/Views/WallView.js', 'public/js/load.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['cssmin', 'uglify']);

};