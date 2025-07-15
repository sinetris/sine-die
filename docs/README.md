# Documentation

- [Development](#development)
  - [Setup and run the example site locally](#setup-and-run-the-example-site-locally)
- [Setup](#setup)
  - [Add theme as a Hugo Module](#add-theme-as-a-hugo-module)
    - [Install module](#install-module)
    - [Update your config file](#update-your-config-file)
  - [Add theme as a Git submodule](#add-theme-as-a-git-submodule)
  - [Search functionality](#search-functionality)
    - [Installing and running Pagefind](#installing-and-running-pagefind)
  - [Favicons](#favicons)

## Development

### Setup and run the example site locally

Install required [prerequisites](../README.md#prerequisites).

Clone the [sine-die](https://github.com/sinetris/sine-die) repository and move
to the `userguide` directory.

```shell
git clone https://github.com/sinetris/sine-die.git sine-die
cd sine-die/userguide
```

Install and run `pagefind` to generate the search indexes from the static files
(see [Search functionality](#search-functionality)).

Run the site locally

```shell
hugo server \
  --buildDrafts \
  --tlsAuto \
  --disableFastRender
```

## Setup

You can add the sine-die theme to your Hugo site in few ways.

### Add theme as a Hugo Module

The recommended (and most versatile) way to add the a Hugo theme to your
website is to use [Hugo modules][hugo-modules].

To [use Hugo modules for a theme][hugo-modules-init] in a website, you
need to initialize the Hugo module system, import the theme, and update
the configuration.

#### Install module

Example for unix shell:

```sh
github_user=<your-github-user>
website_repo=<your-hugo-repo>
project_namespace=github.com/${github_user:?}/${website_repo:?}
hugo mod init "${project_namespace:?}"
hugo mod get github.com/sinetris/sine-die
```

#### Update your config file

Update theme and modules setting in your configuration file (e.g., `hugo.toml`).

```toml
# Add the theme using the full module path (identity)
theme = ["github.com/sinetris/sine-die"]
# Configure the modules
[module]
  proxy = "direct"
  # You can specify `replacements` to use local copies of modules (e.g., for local
  # module development).
  # Info on replacements: https://gohugo.io/configuration/module/#replacements
  # Uncomment the line below for local development.
  # replacements = 'github.com/sinetris/sine-die -> ../sine-die'
  [module.hugoVersion]
    extended = true
    min = "0.146.0"
  [[module.imports]]
    path = "github.com/sinetris/sine-die"
  # # You can add multiple modules
  # [[module.imports]]
  #   path = "github.com/gohugoio/hugo-mod-jslibs/instantpage"
```

### Add theme as a Git submodule

To add the sine-die theme to your Hugo site as a git submodule, move to your
website folder and run:

```shell
git submodule add https://github.com/sinetris/sine-die themes/sine-die
```

Edit `hugo.toml` and change (or add) the theme to `theme = ['sine-die']`.

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

You can install and run Pagefind using the Node.js or Python3 wrappers (more info
can be found in [Pagefind installation documentation][pagefind-installation]).

<details>
  <summary>
    Using <code>pyenv</code> for Python 3 or <code>asdf</code> for Node.js
  </summary>

  If you want to use **Python 3** and are using [pyenv][pyenv], you can install
  Python 3 version from [.python-version](userguide/.python-version) running:

  ```shell
  pyenv install
  ```

  If you want to use **Node.js** and are using [asdf][asdf], you can install
  the Node.js version from [.tool-versions](userguide/.tool-versions) running:

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

You can use [Pagefind CLI config sources][pagefind-config-sources] instead of passing
CLI flags. Check [userguide/pagefind.yaml](userguide/pagefind.yaml) for an example.

### Favicons

You need an SVG image to generate favicons for your website.

- Generate favicons from the SVG image
  - (e.g using [icongen]) Icons to generate: **favicon.ico**,
    **apple touch icon**, **Android app**, **OSX favicon.png**
- Copy the SVG image to `static/favicons/favicon.svg`
- Copy generated `favicon.ico` image to `static/favicon.ico`
- Copy other generated images to `static/favicons/`
- Set `enableFavicons` param to `true` in your Hugo website configuration
  (e.g. `hugo.toml`)

    ```toml
    [params]
      enableFavicons = true
    ```

[asdf]: <https://asdf-vm.com/> "asdf: The Multiple Runtime Version Manager"
[hugo-modules]: <https://gohugo.io/hugo-modules/> "Hugo modules"
[hugo-modules-init]: <https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme> "Use Hugo modules for a theme"
[icongen]: <https://github.com/cthedot/icongen> "icongen: Generate Web and App icons and PNG favicons"
[pagefind-config-sources]: <https://pagefind.app/docs/config-sources/> "Pagefind CLI configuration sources"
[pagefind-installation]: <https://pagefind.app/docs/installation/> "Pagefind installation"
[pagefind]: <https://pagefind.app/> "Pagefind"
[pyenv]: <https://github.com/pyenv/pyenv> "pyenv: Simple Python version management"
