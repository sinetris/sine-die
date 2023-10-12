#primary-navigation .brand::before {
  {{ with resources.Get "images/sine-die-logo.svg" | resources.Fingerprint "sha512" -}}
    -webkit-mask-image: url({{ .RelPermalink }});
    mask-image: url({{ .RelPermalink }});
  {{- end }}
}
