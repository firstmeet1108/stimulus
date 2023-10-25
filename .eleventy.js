const { DateTime } = require('luxon')
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
require('dotenv').config()
const isDev = process.env.ELEVENTY_ENV === 'development'
// const navigationPlugin = require('@11ty/eleventy-navigation')
// const rssPlugin = require('@11ty/eleventy-plugin-rss')

module.exports = function (eleventyConfig) {
  // 设置baseURL 为了适配github page
  console.log(process.env.ELEVENTY_ENV)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: isDev ? '/' : '/stimulus/',
    // Comma separated list of output file extensions to apply
    // our transform to. Use `false` to opt-out of the transform.
    extensions: 'html',

    // Rename the filters
    filters: {
      base: 'htmlBaseUrl',
      html: 'transformWithHtmlBase',
      pathPrefix: 'addPathPrefixToUrl',
    },
  })
  eleventyConfig.addGlobalData('isDev', isDev)

  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1,
    )
  })

  // eleventyConfig.addCollection('tagList', (collection) => {
  //   const tagsObject = {}
  //   collection.getAll().forEach((item) => {
  //     if (!item.data.tags) return
  //     item.data.tags
  //       .filter((tag) => !['post', 'all'].includes(tag))
  //       .forEach((tag) => {
  //         if (typeof tagsObject[tag] === 'undefined') {
  //           tagsObject[tag] = 1
  //         } else {
  //           tagsObject[tag] += 1
  //         }
  //       })
  //   })

  //   const tagList = []
  //   Object.keys(tagsObject).forEach((tag) => {
  //     tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
  //   })
  //   return tagList.sort((a, b) => b.tagCount - a.tagCount)
  // })

  // Add a filter using the Config API
  eleventyConfig.addWatchTarget('./src/scss/')
  eleventyConfig.setBrowserSyncConfig({
    reloadDelay: 400,
  })

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toFormat('dd LLL yyyy')
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('getData', (oriData) => {
    let res = {}
    Object.keys(oriData)
      .filter((value) => {
        return value !== 'page' && value !== 'all'
      })
      .forEach((key) => {
        res[key] = oriData[key]
      })
    return res
  })

  return {
    dir: {
      input: 'src',
      output: 'dev',
    },
  }
}
