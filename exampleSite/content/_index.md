---
title: 'Homepage'
date: "2025-03-10"
description: Documentation and usage examples for the sine-die theme
categories: ["Documentation"]
tags: ["Semantic HTML", "Responsive", "Dark mode", "Light mode", "Minimal CSS", "Generated color palette"]
---

## Description

A simple and clean [Hugo][hugo] theme.

- Semantic HTML
- Minimalist CSS framework
  - Lightweight
  - Responsive Web Design
  - Light or Dark Mode
  - Easily customizable color palette
  - Pure CSS (no transpiler required)
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
