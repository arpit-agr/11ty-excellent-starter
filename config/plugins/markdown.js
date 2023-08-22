const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const {slugifyString} = require('../utils');

const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true // see https://github.com/markdown-it/markdown-it
})
  .disable('code')
  .use(markdownItAnchor, {
    slugify: slugifyString,
    tabIndex: false,
    level: [2, 3],
    permalink: markdownItAnchor.permalink.linkAfterHeader({
      style: 'visually-hidden',
      class: 'anchor-link',
      symbol: `<svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="0.75em" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="lucide lucide-hash" viewBox="0 0 24 24"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></svg>`,
      assistiveText: title => `Section titled “${title}”`,
      visuallyHiddenClass: 'visually-hidden',
      wrapper: ['<div class="heading-wrapper">', '</div>']
    })
  })
  .use(markdownItFootnote);

module.exports = markdownLib;
