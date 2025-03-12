# sine-die

<img
  src="assets/images/sine-die-logo.svg"
  width="100"
  style="max-width: 80%"
  alt="sine-die"
/>

A simple and clean [Hugo][hugo] theme.

- Semantic HTML
- Responsive
- Light/Dark mode
- Minimal CSS
- Generated color palette

Table of Content

- [Dependencies](#dependencies)
- [Setup and run the example site locally](#setup-and-run-the-example-site-locally)
- [Add the sine-die theme to your Hugo site](#add-the-sine-die-theme-to-your-hugo-site)
  - [Search functionality](#search-functionality)
    - [Installing and running Pagefind](#installing-and-running-pagefind)
- [Credits](#credits)

## Dependencies

- [Hugo][hugo]
- [Git][git]
- (optional) [Node.js][node-js] or [Python 3][python]
  (used by Pagefind)
- (optional) [Pagefind][pagefind] (see [Search functionality](#search-functionality))

## Setup and run the example site locally

Install required [dependencies](#dependencies).

Clone the [sine-die](https://github.com/sinetris/sine-die) repository and move
to the project directory.

```shell
git clone https://github.com/sinetris/sine-die.git sine-die-example
cd sine-die-example
```

Change path to `exampleSite`.

```shell
cd exampleSite
```

Install and run `pagefind` to generate the search indexes from the static files
(see [Installing and running Pagefind](#installing-and-running-pagefind)).

Run the site locally

```shell
hugo server --buildDrafts --tlsAuto --disableFastRender --destination public
```

## Add the sine-die theme to your Hugo site

Add the sine-die theme to your Hugo site as a git submodule:

```shell
git submodule add https://github.com/sinetris/sine-die themes/sine-die
```

Edit `hugo.toml` and change the theme to `theme = 'sine-die'`.

### Search functionality

To enable the search functionality, edit `hugo.toml` and add `showSearchUI = true`
in `[params]`.

The search functionality uses [Pagefind][pagefind].

> **Note:** to allow Pagefind to run the indexing script, you must first build
> the static files for your website.

Build the static files for your website, for example running:

```shell
hugo
```

You can install and run Pagefind using Node.js or Python3 (more info can be
found in [Pagefind installation documentation][pagefind-installation]).

<details>
  <summary>
    Using <code>pyenv</code> for Python 3 or <code>asdf</code> for Node.js
  </summary>

  If you want to use **Python 3** and are using [pyenv][pyenv], you can install
  Python 3 running:

  ```shell
  pyenv install
  ```

  If you want to use **Node.js** and are using [asdf][asdf], you can install
  Node.js running:

  ```shell
  # Install Node.js plugin for asdf
  asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
  # Run 'asdf set nodejs latest' if you want to update Node.js to the latest version.
  # Install Node.js
  asdf install
  ```

</details>

#### Installing and running Pagefind

To install and run Pagefind with Node.js, run:

```shell
npx pagefind --site "public"
```

To install and run Pagefind with Python 3, run:

```shell
# Install pagefind
python3 -m pip install 'pagefind[extended]'
# Run pagefind
python3 -m pagefind --site "public"
```

## Credits

- [Pagefind][pagefind]: highly configurable client-side search
  library with a script to index pages generated with any static site generator
  using as low bandwidth as possible. It also provides a UI component that
  supports searching, filtering, and metadata out of the box.
- [MDN Accessibility][mdn-accessibility]:
  web accessibility reference in MDN Web Docs
- [Material Design][material-design]:
  - The color scheme for this theme is inspired to the [Material design color system][material-design-color-system].
    It's very similar to what I intended to use, and having a good reference
    was definitely a big help.
  - This theme also use [Material Symbols][material-symbols] for
    the icons.

[asdf]: <https://asdf-vm.com/> "asdf: The Multiple Runtime Version Manager"
[git]: <https://git-scm.com/> "Git: distributed version control system"
[hugo]: <https://gohugo.io> "Hugo: open-source static site generators"
[material-design-color-system]: <https://m3.material.io/styles/color/the-color-system/key-colors-tones> "Material design color system"
[material-design]: <https://m3.material.io> "Material Design"
[material-symbols]: <https://fonts.google.com/icons> "Material Symbols"
[mdn-accessibility]: <https://developer.mozilla.org/en-US/docs/Web/Accessibility> "mdn - Accessibility"
[node-js]: <https://nodejs.org> "Node.js"
[pagefind-installation]: <https://pagefind.app/docs/installation/> "Pagefind installation"
[pagefind]: <https://pagefind.app/> "Pagefind"
[pyenv]: <https://github.com/pyenv/pyenv> "pyenv: Simple Python version management"
[python]: <https://www.python.org/> "Python"
