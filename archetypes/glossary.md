---
title: {{ replace .File.ContentBaseName `-` ` ` | title }}
date: '{{ time.Now.UTC.Format "2006-01-02T15:04:05Z" }}'
draft: true
description: |
  Short description for **{{ replace .File.ContentBaseName `-` ` ` | title }}**
params:
  # List of glossary contexts (aka: field of knowledge) valid for this term definition
  # Note: Use separate files for terms with different meanings in different contexts
  contexts:
    - This Website

  # A synonym is a word or phrase (in the same language) that has the same or nearly the same meaning in this context
  synonyms: []

  # An abbreviation is a shortened form (acronym or initialism) of words or phrases used to save space and make the text more concise.
  # The first abbreviation will be used for the text of related terms.
  abbreviations: []

  # Related terms in this Glossary
  related: []

  # Links to external resources
  externalResources: []
  #   - title: A phoney term  # The text used for the link
  #     source: Example Website  # A name for the source
  #     link: https://example.com/glossary/term  # Link to the external resource
---
