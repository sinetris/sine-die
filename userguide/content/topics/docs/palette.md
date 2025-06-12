---
title: Color Palette
date: '2023-07-16T08:07:24Z'
description: Example of generated color palette
weight: 10
layout: palette
params:
  body_classes:
    - full-space
    - theme-palette
tags:
  - Colors
  - Palette
  - CSS
categories:
  - Examples
  - Documentation
---

This theme uses [CSS cascading variables][mdn-css-variables].

The color palette uses a three-color combination and allow to set the primary
color hue angle and the left and right secondary colors hue angle (respectively
adding and subtractinf from the primary hue angle).

The hue angle is based on the [hsl][mdn-css-hsl] color space but the color
palette is generated using [oklch][mdn-css-oklch], this make it easier to select
a color hue from the HSL {{< glossary-term term="color-wheel" >}} while still taking
advantage of the benefits that OKLCH provides.

## Color Harmonies

It's possible to generate the color palette for a variety of
{{< glossary-term term="color-harmonies" >}} simply by modifying the variable
`--secondary-colors-amgle`.

The default palette uses the **triadic color scheme** (*secondary colors angle*
variable named `--secondary-colors-amgle` set to `120deg`).

It's possible to invert secondary left and secondary right by applying a simple formula.

Given the `--secondary-colors-amgle` angle `a`, we can use the formula
`a + 2 x (180deg - a)` to invert secondary left and secondary right.

For example, whith `--secondary-colors-amgle` set to `120deg`, to invert left and
right we would use `240deg`.

Example:

```css
:root {
  /* 120deg + 2 x (180deg - 120deg) = 240deg */
  --colors-secondary-hue-angle: 240deg;
}
```

### Analogous

Preferred values:

- between `15` and `50` degrees
- between `310` and `345` degrees (left and right inverted)

Best values:

- `30` degrees
- `330` degrees (left and right inverted)

Example:

```css
:root {
  --colors-secondary-hue-angle: 30deg;
}
```

### Triadic

Values:

- `120` degrees
- `240` degrees (left and right inverted)

Example:

```css
:root {
  --colors-secondary-hue-angle: 120deg;
}
```

### Split-Complementary

Preferred values:

- between `130` and `165` degrees
- between `195` and `230` degrees (left and right inverted)

Best values:

- `150` degrees
- `210` degrees (left and right inverted)

Example:

```css
:root {
  --colors-secondary-hue-angle: 160deg;
}
```

### Complementary

We can use `180` degrees to achieve a complementary color scheme: this way, the
left and right secondary colors will have the same angle, thus generating the
same color palette.

Example:

```css
:root {
  --colors-secondary-hue-angle: 180deg;
}
```

[mdn-css-oklch]: <https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch> "oklch()"
[mdn-css-hsl]: <https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl> "hsl()"
[mdn-css-variables]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables "CSS custom properties for cascading variables"
