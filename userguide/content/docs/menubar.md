---
title: Menubar
date: '2025-05-17T09:10:25Z'
description: Menubar usage example
weight: 80
tags:
  - Menu
  - Menubar
categories:
  - Documentation
---

## Add menu entries

You can define entries for the primary navigation menu in the front matter block.

You can add the following in the content file that you want to define as a menu
top entry:

```yaml
# Example to add an entry named `documentation`
menus:
  main:
    identifier: documentation
```

And the following in the content files that you want to define as a sub-menu entry:

```yaml
# Example to add `documentation` sub-menu entry
menus:
  main:
    parent: documentation
```

## Add menu entries for a section and all subpages

To define menu entries for an entire section, you can use [cascade][hugo-cascade].

For example, if you want to automatically add menu entries for all pages in the
`documentation` section, you can add the following in `documentation/_index.md`:

```yaml
# Example to add a menu entry named `documentation`
menus:
  main:
    identifier: documentation
# Example to add all the other pages as sub-menu entries for `documentation`
cascade:
  menus:
    main:
      parent: documentation
```

[hugo-cascade]: <https://gohugo.io/content-management/front-matter/#cascade-1> "Hugo Cascade"
