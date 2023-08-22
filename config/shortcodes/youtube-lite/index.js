const liteYoutube = (id, label) => {
  return `
  <lite-youtube videoid="${id}" posterquality="maxresdefault">
    <a
      class="lite-youtube-fallback stack"
      href="https://www.youtube.com/watch?v=${id}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.125em"
        height="1.125em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-play"><polygon
        points="5 3 19 12 5 21 5 3"
      />
      </svg>  
      <span>Watch on YouTube: "${label}"</span>
    </a>
  </lite-youtube>
  `;
};
module.exports = liteYoutube;
