<div align="center">
  <a href="https://naokihori.github.io/NaokiHori/">
    <img
      src="https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/cover.png"
      alt="cover"
      width="95%"
    />
  </a>
</div>

<h2>
  Skill
</h2>

<div align="center" style="display: flex; flex-wrap: wrap; flex-direction: row; justify-content: center, align-items: center" >
  <div style="flex: 0 0 auto; padding: 2px 2px">
    {{- range .Skills.Languages }}
    <a href="{{ .Href }}">
      <img src="{{ .Src }}" alt="{{ .Name }}" style="height: 50px"/>
    </a>
    {{- end }}
  </div>
</div>

<div align="center" style="display: flex; flex-wrap: wrap; flex-direction: row; justify-content: center, align-items: center" >
  <div style="flex: 0 0 auto; padding: 2px 2px">
    {{- range .Skills.Tools }}
    <a href="{{ .Href }}">
      <img src="{{ .Src }}" alt="{{ .Name }}" style="height: 50px"/>
    </a>
    {{- end }}
  </div>
</div>

<div align="center">
  <img src="https://naokihori.github.io/NaokiHori/stats/language.svg" />
</div>

<h2>
  Repositories
</h2>

{{- range .RepositoryTypes }}

<h3>
  {{ .Title }}
</h3>
{{- range .Items }}
<div align="center">
  <a href="{{ .Href }}" target="_blank">
    <img src="{{ .Src }}" />
  </a>
</div>
{{- end }}
{{- end }}
