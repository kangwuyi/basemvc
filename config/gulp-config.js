/**
 * Gulp 路径相关配置文件
 * @clean ["js/**", "!js/", "!js/lib/**"]，排除 lib 文件/文件夹时，需要在前面添加排除上级目录
 */
module.exports = {
  'javascript': {
    'desktop': {
      'src': [
        'public/js/**/*.js',
        '!public/!lib/**/*.js'
      ],
      'dest': 'build/desktop/js',
      'concat': 'js/bundle.min.js'
    },
    'mobile': {
      'src': [
        'dev/mobile/js/**/*.js',
        '!dev/mobile/js/vendor/**'
      ],
      'dest': 'build/mobile/js'
    },
    'server': {
      'src': [
        'app/**/*.js',
        'bin/**/*.js',
        'cinfig/**/*.js',
        'gulp/**/*.js',
        '!gulp/bin/',
        '!gulp/bin/**',
        '!gulp/lib/',
        '!gulp/lib/**',
        'middleware/**/*.js',
        'test/**/*.js',
        '!test/gulp/bin/',
        '!test/gulp/bin/**',
        'utils/**/*.js',
        'gulpfile.js'
      ]
    }
  },
  'coffee': {
    'desktop': {
      'src': [
        'public/coffee/*.coffee'
      ],
      'dest': 'build/desktop/coffee',
      'concat': 'js/bundle.min.js'
    }
  },
  'ejs': {
    'desktop': {
      'src': [
        'app/views/*.ejs'
      ],
      'dest': 'dist/app/views'
    }
  },
  'sass': {
    'desktop': {
      'src': [
        'public/sass/*.scss'
      ],
      'dest': 'dist/desktop/css'
    }
  },
  'img': {
    'desktop': {}
  },
  'dependencies': {
    'imagemin': {
      'pnglevel': 2
    }
  },
  'clean': {
    'javascript': {
      'desktop': {
        'dest': [
          'dist/desktop/js/**',
          '!dist/desktop/js/',
          '!dist/desktop/js/lib/**'
        ]
      }
    },
    'css': {
      'desktop': {
        'dest': [
          'dist/desktop/css/**',
          '!dist/desktop/css/lib/**'
        ]
      }
    }
  }
};
