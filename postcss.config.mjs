import tailwindcss from '@tailwindcss/postcss';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: tailwindcss(),
  },
};

export default config;
