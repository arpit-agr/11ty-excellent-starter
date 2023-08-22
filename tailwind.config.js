/* © Andy Bell - https://buildexcellentwebsit.es/ */

const plugin = require('tailwindcss/plugin');
const postcss = require('postcss');
const postcssJs = require('postcss-js');

const clampGenerator = require('./config/css-utils/clamp-generator.js');
const tokensToTailwind = require('./config/css-utils/tokens-to-tailwind.js');

// Raw design tokens
const colorTokens = require('./src/_data/designtokens/colors.json');
const fontFamilyTokens = require('./src/_data/designtokens/font-family.json');
const spacingTokens = require('./src/_data/designtokens/fluid-space.json');
const fontSizeTokens = require('./src/_data/designtokens/fluid-type.json');

const fontWeightTokens = require('./src/_data/designtokens/font-weight.json');
const leadingTokens = require('./src/_data/designtokens/leading.json');
const trackingTokens = require('./src/_data/designtokens/tracking.json');
const measureTokens = require('./src/_data/designtokens/measure.json');

// Process design tokens
const colors = tokensToTailwind(colorTokens.items);
const fontFamily = tokensToTailwind(fontFamilyTokens.items);
const fontSize = tokensToTailwind(clampGenerator(fontSizeTokens.items));
const spacing = tokensToTailwind(clampGenerator(spacingTokens.items));

const fontWeight = tokensToTailwind(fontWeightTokens.items);
const leading = tokensToTailwind(leadingTokens.items);
const tracking = tokensToTailwind(trackingTokens.items);
const measure = tokensToTailwind(measureTokens.items);

module.exports = {
  content: ['./src/**/*.{html,js,jsx,mdx,njk,twig,vue}'],
  presets: [],
  theme: {
    screens: {
      sm: '30em',
      md: '48em',
      lg: '64em',
      xl: '90em'
    },
    colors,
    spacing,
    fontSize,
    fontFamily,
    fontWeight,
    leading,
    tracking,
    measure,
    backgroundColor: ({theme}) => theme('colors'),
    textColor: ({theme}) => theme('colors'),
    margin: ({theme}) => ({
      auto: 'auto',
      ...theme('spacing')
    }),
    padding: ({theme}) => theme('spacing')
  },
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'empty',
    'read-only',
    'group-hover',
    'group-focus',
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled'
  ],

  // Disables Tailwind's reset etc
  corePlugins: {
    preflight: false
  },
  plugins: [
    // Generates custom property values from tailwind config
    plugin(function ({addComponents, config}) {
      let result = '';

      const currentConfig = config();

      const groups = [
        {key: 'colors', prefix: 'color'},
        {key: 'spacing', prefix: 'space'},
        {key: 'fontSize', prefix: 'step'},
        {key: 'fontFamily', prefix: 'font'},
        {key: 'fontWeight', prefix: 'weight'},
        {key: 'leading', prefix: 'leading'},
        {key: 'tracking', prefix: 'tracking'},
        {key: 'measure', prefix: 'measure'}
      ];

      groups.forEach(({key, prefix}) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach(key => {
          result += `--${prefix}-${key}: ${group[key]};`;
        });
      });

      addComponents({
        ':root': postcssJs.objectify(postcss.parse(result))
      });
    }),

    // Generates custom utility classes
    plugin(function ({addUtilities, config}) {
      const currentConfig = config();
      const customUtilities = [
        {key: 'spacing', prefix: 'flow-space', property: '--flow-space'},
        {key: 'colors', prefix: 'spot-color', property: '--spot-color'}
      ];

      customUtilities.forEach(({key, prefix, property}) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach(key => {
          addUtilities({
            [`.${prefix}-${key}`]: postcssJs.objectify(
              postcss.parse(`${property}: ${group[key]}`)
            )
          });
        });
      });
    })
  ]
};
