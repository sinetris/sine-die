---
title: Theme Colors (override)
date: '2023-07-20T08:07:24Z'
description: Example of colors in the theme
weight: 25
layout: colors
tags:
  - Colors
  - Palette
  - CSS
  - Override
categories:
  - Examples
  - Documentation
params:
  body_classes:
    - theme-colors
    - theme-colors-override
---

## Description

In this example we override the **primary color hue** angle to `200deg` and the
**secondary colors angle** to `330deg` to have a **Split-Complementary color
scheme** with left and right inverted.

```css
:root {
  --color-primary-hue: 200deg;
  --colors-secondary-hue-angle: 210deg;
}
```
