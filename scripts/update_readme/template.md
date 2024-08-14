<h1>
  <div align="center">
    <a href="https://naokihori.github.io/NaokiHori/">
      Welcome
    </a>
  </div>
</h1>

<div align="center">
  <a href="https://naokihori.github.io/NaokiHori/">
    <img
      src="https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/image/cover.png"
      alt="cover"
      width="95%"
    />
  </a>
</div>

<h2>
  <div align="left">
    Interest
  </div>
</h2>

<ul>
  <li>
    Numerical methods
  </li>
  <li>
    Software design
  </li>
</ul>

<h2>
  Skill
</h2>

<div align="center" style="display: flex; flex-wrap: wrap; flex-direction: row; justify-content: center, align-items: center" >
  <div style="flex: 0 0 auto; padding: 2px 2px">
    {{- range .Skills.Languages }}
    <a href="{{ .Href }}">
      <img src="{{ .Src }}" alt="{{ .Name }}" height="50"/>
    </a>
    {{- end }}
  </div>
</div>

<div align="center" style="display: flex; flex-wrap: wrap; flex-direction: row; justify-content: center, align-items: center" >
  <div style="flex: 0 0 auto; padding: 2px 2px">
    {{- range .Skills.Tools }}
    <a href="{{ .Href }}">
      <img src="{{ .Src }}" alt="{{ .Name }}" height="50"/>
    </a>
    {{- end }}
  </div>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/assets/language.svg" />
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

<h2>
  Platform
</h2>

<ul>
  {{ range .Platforms }}
  <li>
    <a href="{{ .Href }}" target="_blank">
      {{ .Label }}
    </a>
  </li>
  {{ end }}
</ul>
