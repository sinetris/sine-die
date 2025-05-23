---
title: '{{ replace .File.ContentBaseName `-` ` ` | title }}'
date: '{{ time.Now.Format "2006-01-02" }}'
draft: true
description: |
  Short description for **{{ replace .File.ContentBaseName `-` ` ` | title }}**
params:
  context: default
  synonyms: []
  abbreviations: []
  related: []
  externalResources: []
  # - title: A Glossary Term
  #   link: https://example.com/glossary/term
---
