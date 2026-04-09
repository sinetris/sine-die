---
title: 'Web Feeds'
date: '2026-01-14T08:16:25Z'
description: |
  Add RSS and Atom feeds setup in Hugo config for Sine Die theme
tags:
  - RSS
  - Atom
  - Configuration
categories:
  - Documentation
---

## Description

The Sine Die theme allows you to generate [RSS](https://www.rssboard.org/rss-specification)
and [Atom](https://www.ietf.org/rfc/rfc4287) web feeds for your Hugo website.

## Configuration

Some changes are needed to the [configuration](https://gohugo.io/configuration/introduction/)
of your Hugo website.

- Add `application/atom+xml` to [mediaTypes](https://gohugo.io/configuration/media-types/)
- Add `atom` to [outputFormats](https://gohugo.io/configuration/output-formats/)
  (also change `baseName` for `rss` for consistency)
- Add `atom` and `rss` to [outputs](https://gohugo.io/configuration/outputs/) for
  each [page kind](https://gohugo.io/quick-reference/glossary/#page-kind) on which
  you want to enable web feed generation

If you are using a [configuration directory](https://gohugo.io/configuration/introduction/#configuration-directory),
you can copy `mediaTypes.yaml`, `outputFormats.yaml`, and `outputs.yaml` from [userguide/config/_default](https://github.com/sinetris/sine-die/blob/main/userguide/config/_default).

Here are the changes to make to `hugo.yaml`:

```yaml
mediaTypes:
  application/atom+xml:
    suffixes:
      - xml

outputFormats:
  atom:
    baseName: index.atom
    mediaType: application/atom+xml
    noUgly: true
  rss:
    baseName: index.rss

outputs:
  # Enable web feeds on homepage
  home:
    - html
    - atom
    - rss
  # Individual pages do not have web feeds
  page:
    - html
  # Enable web feeds on sections
  section:
    - html
    - atom
    - rss
  # Enable web feeds on taxonomies (e.g., tags and categories)
  taxonomy:
    - html
    - atom
    - rss
  # Enable web feeds on taxonomy terms (e.g., each tag and category)
  term:
    - html
    - atom
    - rss
```
