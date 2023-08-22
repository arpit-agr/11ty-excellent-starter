// CSS and JavaScript as first-class citizens in Eleventy: https://pepelsbey.dev/articles/eleventy-css-js/

const esbuild = require('esbuild');

module.exports = eleventyConfig => {
  eleventyConfig.addTemplateFormats('js');

  // Define an array of JavaScript file paths to process
  const jsFilesToProcess = [
    {
      input: './src/assets/scripts/app.js'
    },
    {
      input: './src/assets/scripts/lite-youtube.js'
    }
  ];

  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (content, path) => {
      const fileToProcess = jsFilesToProcess.find(file => file.input === path);

      if (!fileToProcess) {
        return;
      }

      return async () => {
        let output = await esbuild.build({
          target: 'es2020',
          entryPoints: [fileToProcess.input],
          minify: true,
          bundle: true,
          write: false
        });

        return output.outputFiles[0].text; // Return the compiled JavaScript code as a string
      };
    }
  });
};
