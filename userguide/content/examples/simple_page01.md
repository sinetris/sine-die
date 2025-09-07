---
title: Simple page 01
date: '2025-04-01T17:28:15Z'
description: Example 1 of a simple page
tags: []
categories:
  - Examples
menus:
  main:
    parent: examples
---

You can use [mermaid](https://mermaid.js.org/) in your Markdown content.

For example:

````md
## Mermaid

A mermaid diagram example.

```mermaid
  sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
      John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
````

Will be rendered as:

## Mermaid

A mermaid diagram example.

```mermaid
  sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
      John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
