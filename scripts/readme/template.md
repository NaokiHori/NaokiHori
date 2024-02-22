<h1>
  <div align="center">
    Welcome
  </div>
</h1>

<div align="center">
  <img
  src="https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/image/cover.png"
  alt="cover"
  width="95%"
  />
</div>

<h2>
  <div align="left">
    Work
  </div>
</h2>

<ul>
  <li>
    Fluid mechanics (turbulent multiphase flows)
  </li>
  <li>
    High performance computing
  </li>
</ul>

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

<div align="center">
  <table>
    <thead>
      <tr>
        <th>Languages etc.</th>
        <th>Tools</th>
      </tr>
    </thead>
    <tbody>
      <td>
        {{- range .Skills.Languages }}
        <a href="{{ .Href }}">
          <img src="{{ .Src }}" alt="{{ .Name }}" height="50"/>
        </a>
        {{- end }}
      </td>
      <td>
        {{- range .Skills.Tools }}
        <a href="{{ .Href }}">
          <img src="{{ .Src }}" alt="{{ .Name }}" height="50"/>
        </a>
        {{- end }}
      </td>
    </tbody>
  </table>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/NaokiHori/NaokiHori/card/card/language.svg" />
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

<h2>
  Contact
</h2>

<div align="center">
  Bug reports, jobs, etc.: n (dot) hori [__at__] utwente (dot) nl
</div>
