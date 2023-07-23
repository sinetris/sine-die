{{ with resources.Get "css/normalize.css" | resources.Minify | resources.Fingerprint "sha512" -}}
  @import "{{ .RelPermalink }}";
{{- end }}
{{ with resources.Get "css/base.css" | resources.Minify | resources.Fingerprint "sha512" -}}
  @import "{{ .RelPermalink }}";
{{- end }}
{{ with resources.Get "css/colors.css" | resources.Minify | resources.Fingerprint "sha512" -}}
  @import "{{ .RelPermalink }}";
{{- end }}
{{ with resources.Get "css/style.css" | resources.Minify | resources.Fingerprint "sha512" -}}
  @import "{{ .RelPermalink }}";
{{- end }}
{{ with resources.Get "css/pagefind-overrides.css" | resources.Minify | resources.Fingerprint "sha512" -}}
  @import "{{ .RelPermalink }}";
{{- end }}
{{ with resources.Get "css/overrides.css" | resources.Minify | resources.Fingerprint "sha512" -}}
  @import "{{ .RelPermalink }}";
{{- end }}
