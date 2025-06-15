# Documentation

- [Development](#development)
  - [Setup and run the example site locally](#setup-and-run-the-example-site-locally)
- [Setup](#setup)
  - [Add the sine-die theme to your Hugo site](#add-the-sine-die-theme-to-your-hugo-site)
  - [Search functionality](#search-functionality)
    - [Installing and running Pagefind](#installing-and-running-pagefind)

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

### Add the sine-die theme to your Hugo site

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

[asdf]: <https://asdf-vm.com/> "asdf: The Multiple Runtime Version Manager"
[pagefind-config-sources]: <https://pagefind.app/docs/config-sources/> "Pagefind CLI configuration sources"
[pagefind-installation]: <https://pagefind.app/docs/installation/> "Pagefind installation"
[pagefind]: <https://pagefind.app/> "Pagefind"
[pyenv]: <https://github.com/pyenv/pyenv> "pyenv: Simple Python version management"
