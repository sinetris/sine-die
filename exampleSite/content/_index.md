---
title: Homepage
date: '2025-03-10T08:07:15Z'
description: Documentation and usage examples for the sine-die theme
tags:
  - Hugo Theme
  - Semantic HTML
  - Responsive
  - Dark mode
  - Light mode
  - Minimal CSS
  - Generated color palette
params:
  body_classes:
    - full-space
    - homepage
---

{{< figure-wrapper
  class="logos"
  description="Created by [sinetris](https://sinetris.info)"
>}}
{{< img
  src="images/sine-die-logo-full.svg"
  alt="sine-die logo"
  class="sine-die"
>}}
{{< svg
  src="images/sinetris-logo.svg"
  alt="Sinetris logo"
  fragment="sinetris-logo"
  class="sinetris"
>}}
{{< /figure-wrapper >}}

## Description

A simple and clean [Hugo][hugo] theme.

- Semantic HTML
- Minimalist CSS framework
  - Lightweight
  - Responsive Web Design
  - Light/Dark Mode
  - Easily customizable color palette
  - Menubar
- Glossary templates
- Accessibility friendly
- Search functionality

{{< figure-wrapper
  class="logos"
  description="Previews of the theme's responsive web design"
  class="responsive-previews"
>}}
{{< img
  src="images/responsive-previews.png"
  alt="Responsive Design screenshots"
>}}
{{< /figure-wrapper >}}

## Use sine-die theme

1. Add the sine-die theme to your Hugo site as a git submodule:

    ```bash
    git submodule add https://github.com/sinetris/sine-die themes/sine-die
    ```

2. Edit `hugo.toml` and change the theme to `theme = 'sine-die'`.

[hugo]: <https://gohugo.io> "Hugo: open-source static site generators"
