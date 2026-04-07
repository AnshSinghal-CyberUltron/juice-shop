/*
 * Licensed (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop
 * maintainers.
 * SPDX-License-Identifier: MIT
 */

'use strict'

module.exports = function (grunt) {
  const os = grunt.option('os') || process.env.PCKG_OS_NAME || ''
  const platform = grunt.option('platform') || process.env.PCKG_CPU_ARCH || ''
  const node = grunt.option('node') || process.env.nodejs_version || process.env.PCKG_NODE_VERSION || ''

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    replace: {
      version: {
        src: ['./package.json'],
        overwrite: true,
        replacements: [{
          from: /("version": )"([0-9]+\.[0-9]+\.[0-9]+)"/,
          to: '$1"<%= pkg.version %>"'
        }]
      }
    }
  })

  grunt.registerTask('checkIfPackaged', function () {
    if (!os || !platform || !node) {
      grunt.log.warn('One or more of the mandatory options --os, --platform and --node are missing.')
      return false
    }
  })

  grunt.loadNpmTasks('grunt-text-replace')
  grunt.registerTask('default', ['checkIfPackaged'])
}