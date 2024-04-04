# sine-die a semantic HTML theme for Hugo

## Dependencies

- [Hugo](https://gohugo.io)
- [Git](https://git-scm.com/)
- [asdf](https://asdf-vm.com/) (for [Node.js](https://nodejs.org))
- [Pagefind](https://pagefind.app/)

## Setup and run the example site

```shell
# Clone the sine-die repo
git clone https://github.com/sinetris/sine-die.git sine-die-example
cd sine-die-example
# install Node.js
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs latest
# change path to `exampleSite`
cd exampleSite
# generate the files under `public`
hugo
# add pagefind and generate the search index from the static files in `public`
npm_config_yes=true npx pagefind
# Run the site locally
hugo server --buildDrafts --tlsAuto --disableFastRender
```

## Add the sine-die theme to your Hugo site

```shell
# Install the sine-die theme
git submodule add https://github.com/luizdepra/hugo-coder.git themes/hugo-coder
# Edit `hugo.toml` and change the theme to `theme = 'sine-die'`
# Generate the static files
hugo
# Install and setup Pagefind
npm_config_yes=true npx pagefind --site "public" --output-subdir ../static/_pagefind
```

## Credits

- [Pagefind](https://pagefind.app/): highly configurable client-side search
  library that provides a UI component that supports searching, filtering, and
  metadata out of the box, a script to index pages generated with any static
  site generators, and use as low bandwidth as possible
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility): web accessibility reference in MDN Web Docs
- [Material Design](https://m3.material.io): In particular the
  [color system](https://m3.material.io/styles/color/the-color-system/key-colors-tones)
  is very similar to what I intended to use, and having almost everything ready
  was definitely a big help.
