---
{{ $title := replace .File.ContentBaseName `-` ` ` | title }}
title: {{ $title }}
# linkTitle: {{ $title }} # Text used for the link (default to the title)
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

  # An abbreviation is a shortened form (acronym or initialism) of words or phrases
  # used to save space and make the text more concise.
  # The first abbreviation will be used for the text of 'related' terms.
  abbreviations: []

  # Related terms in this Glossary
  related: []
  #   # Use a string to search glossary terms by title
  #   - A title  # As defined in the term 'title'
  #   # Use a map to search glossary terms by title, optionally filter by 'context',
  #   - title: The term title  # As defined in the term 'title'
  #     context: The term context  # One of the 'contexts' associated with the term
  #     fragment: an-header-id  # An URI fragment (without the #) linking to an header ID in the term page
  #     linkTitle: Some text  # Text to show in the link (override 'linkAsAbbreviation')
  #     linkAsAbbreviation: true  # Show link as abbreviation, if available (default to true, unused if 'linkTitle' is present)
  #     errorLevel: error  # The error level for missing/duplicated terms and invalid page fragments (one of: ignore, warning, error; default to warning)
  # Links to external resources
  externalResources: []
  #   - title: A phoney term  # The text used for the link
  #     link: https://example.com/glossary/term  # Link to the external resource
  #     source: Example Website  # A name for the source (optional)
  #     sourceLink: https://example.com  # Link to the source (optional)
---
