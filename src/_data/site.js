module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Excellent Starter',
  siteDescription:
    'Eleventy starter based on the workflow suggested by buildexcellentwebsit.es.',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  author: '', // i.e. author's name. Must be set.
  authorEmail: '', // i.e. email of the author
  authorWebsite: '', // i.e. the personal site of the author
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg', // fallback/default meta image
    opengraph_default_alt:
      'Visible content: Eleventy starter based on workflow for Cube CSS, Every Layout, Design Tokens and Tailwind for uitility, based on the concepts explained in buildexcellentwebsit.es ', // alt text for default meta image
    twitterSite: '', // i.e. @site - twitter profile of the site
    twitterCreator: '', // i.e. @author -  twitter profile of the author
    mastodonProfile: '' // i.e. url to the author's mastodon instance/profile
  },
  blog: {
    // this is for the rss feed
    name: 'My great Web Development Blog',
    description:
      'Tell the word what you are writing about in your blog! It will show up on feed readers.'
  },
  address: {
    // edit all presets or leave empty. They are being used in the pages for privacy.md and imprint.md
    firm: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    mobileDisplay: '+34 1234567',
    mobileCall: ' +341234567',
    email: 'support@example.com',
    cif: ''
  }
};
