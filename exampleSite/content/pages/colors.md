---
title: Theme Colors
date: "2023-07-20"
description: Example of colors in the theme
layout: colors
categories: ["Examples", "Documentation"]
tags: ["Colors", "Palette"]
menus:
  main:
    parent: docs
    weight: 20
params:
  body_classes: ["theme-colors"]
---

## Description

By default the theme uses the **triadic color scheme** (*secondary colors angle*
set to `120deg`) with the *primary color hue* angle set to `240deg`.

```css
:root {
  /* Using default values */
  --color-primary-hue: 240deg;
  --colors-secondary-hue-angle: 120deg;
}
```
