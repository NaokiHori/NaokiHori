package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"os"
)

type Skill struct {
	Name  string
	Href  string
	Src   string
	Image string
}

type Skills struct {
	Languages []Skill
	Tools     []Skill
}

func getSkill(mypaths *MyPaths) Skills {
	bytes := load(fmt.Sprintf("%s/skill.json", *mypaths.ConfigDir))
	var skills Skills
	err := json.Unmarshal(bytes, &skills)
	check(err)
	var languages []Skill = skills.Languages
	var tools []Skill = skills.Tools
	result := Skills{
		Languages: []Skill{},
		Tools:     []Skill{},
	}
	for _, language := range languages {
		href := language.Href
		src := language.Image
		name := language.Name
		result.Languages = append(result.Languages, Skill{Href: href, Src: src, Name: name})
	}
	for _, tool := range tools {
		href := tool.Href
		src := tool.Image
		name := tool.Name
		result.Tools = append(result.Tools, Skill{Href: href, Src: src, Name: name})
	}
	return result
}

type Repository struct {
	Href string
	Src  string
}

type RepositoryType struct {
	Title string
	Items []Repository
}

func getRepositoryTypes(mypaths *MyPaths) []RepositoryType {
	bytes := load(fmt.Sprintf("%s/repositories.json", *mypaths.ConfigDir))
	type Tmp struct {
		Title string
		Items []string
	}
	var repositoryTypes []Tmp
	err := json.Unmarshal(bytes, &repositoryTypes)
	check(err)
	var result []RepositoryType
	for _, repositoryType := range repositoryTypes {
		var items_ []Repository
		title := repositoryType.Title
		items := repositoryType.Items
		for _, item := range items {
			href := fmt.Sprintf("https://github.com/NaokiHori/%s", item)
			src := fmt.Sprintf("https://github.com/NaokiHori/NaokiHori/blob/card/card/%s.svg", item)
			items_ = append(items_, Repository{Href: href, Src: src})
		}
		result = append(result, RepositoryType{Title: title, Items: items_})
	}
	return result
}

type Platform struct {
	Label string
	Href  string
}

func getPlatforms(mypaths *MyPaths) []Platform {
	var result []Platform
	result = append(result, Platform{
		Label: "GitLab (smaller projects)",
		Href:  "https://gitlab.com/NaokiHori",
	})
	result = append(result, Platform{
		Label: "YouTube (gallery)",
		Href:  "https://www.youtube.com/@NaokiHori",
	})
	result = append(result, Platform{
		Label: "Linkedin",
		Href:  "https://www.linkedin.com/in/naoki-hori-b559032a1/",
	})
	result = append(result, Platform{
		Label: "Qiita (articles in Japanese)",
		Href:  "https://qiita.com/NaokiHori",
	})
	return result
}

func load(filename string) []byte {
	f, err := os.Open(filename)
	defer f.Close()
	check(err)
	contents, err := ioutil.ReadAll(f)
	check(err)
	return contents
}

func dump(filename string, t *template.Template, data interface{}) {
	f, err := os.Create(filename)
	defer f.Close()
	check(err)
	err = t.Execute(f, data)
	check(err)
}

func Create(mypaths *MyPaths) {
	result := struct {
		Skill           Skills
		RepositoryTypes []RepositoryType
		Platforms       []Platform
	}{
		Skill:           getSkill(mypaths),
		RepositoryTypes: getRepositoryTypes(mypaths),
		Platforms:       getPlatforms(mypaths),
	}
	tpl := load(*mypaths.TemplateFile)
	t, err := template.New("readme").Parse(string(tpl))
	check(err)
	dump("README.md", t, result)
}
