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

func getSkills(mypaths *MyPaths) Skills {
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
		for _, item := range items[0:1] {
			href := fmt.Sprintf("https://github.com/NaokiHori/%s", item)
			src := fmt.Sprintf("https://naokihori.github.io/NaokiHori/stats/%s.svg", item)
			items_ = append(items_, Repository{Href: href, Src: src})
		}
		result = append(result, RepositoryType{Title: title, Items: items_})
	}
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
		Skills          Skills
		RepositoryTypes []RepositoryType
	}{
		Skills:          getSkills(mypaths),
		RepositoryTypes: getRepositoryTypes(mypaths),
	}
	tpl := load(*mypaths.TemplateFile)
	t, err := template.New("readme").Parse(string(tpl))
	check(err)
	dump(*mypaths.OutputFile, t, result)
}
