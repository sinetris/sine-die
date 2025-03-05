.theme-dark button.theme-switcher {
  {{ with resources.Get "images/theme-dark.svg" | resources.Fingerprint "sha512" -}}
    -webkit-mask-image: url({{ .RelPermalink }});
    mask-image: url({{ .RelPermalink }});
  {{- end }}
}

.theme-light button.theme-switcher {
  {{ with resources.Get "images/theme-light.svg" | resources.Fingerprint "sha512" -}}
    -webkit-mask-image: url({{ .RelPermalink }});
    mask-image: url({{ .RelPermalink }});
  {{- end }}
}

.theme-default button.theme-switcher {
  {{ with resources.Get "images/theme-os-default.svg" | resources.Fingerprint "sha512" -}}
    -webkit-mask-image: url({{ .RelPermalink }});
    mask-image: url({{ .RelPermalink }});
  {{- end }}
}

#search button.pagefind-ui__search-clear::before {
  {{ with resources.Get "images/clear-icon.svg" | resources.Fingerprint "sha512" -}}
    -webkit-mask-image: url({{ .RelPermalink }});
    mask-image: url({{ .RelPermalink }});
  {{- end }}
}
