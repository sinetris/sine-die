---
title: Theme Colors (override)
date: "2023-07-20"
description: Example of colors in the theme
layout: colors
categories: ["Examples", "Documentation"]
tags: ["Colors", "Palette"]
menus:
  main:
    parent: docs
    weight: 25
params:
  body_classes: ["theme-colors", "theme-colors-override"]
---

## Description

In this example we override the **primary color hue** angle (using `180deg`) and
the **secondary colors angle** (using `200deg` to have a **split-complementary color
scheme** with left and right inverted).

```css
:root {
  --color-primary-hue: 180deg;
  --colors-secondary-hue-angle: 200deg;
}
```
