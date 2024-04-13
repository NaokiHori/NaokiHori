package repository

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
	"update_assets/github"
	"update_assets/path"
	"update_assets/util"
)

func saveToJSON(mypaths *path.MyPaths, repo *string, info *Info) {
	// Construct JSON string manually
	var buffer string = ""
	buffer += "{\n"
	buffer += fmt.Sprintf("  \"name\": \"%s\",\n", info.name)
	buffer += fmt.Sprintf("  \"descr\": \"%s\",\n", info.descr)
	// list of topics
	buffer += fmt.Sprintf("  \"topics\": [\n")
	for i, topic := range info.topics {
		buffer += fmt.Sprintf("    \"%s\"", topic)
		if i != len(info.topics)-1 {
			buffer += fmt.Sprintf(",")
		}
		buffer += fmt.Sprintf("\n")
	}
	buffer += fmt.Sprintf("  ],\n")
	// list of languages
	buffer += fmt.Sprintf("  \"langs\": [\n")
	for i, lang := range info.langs {
		buffer += fmt.Sprintf("    {\n")
		buffer += fmt.Sprintf("      \"name\": \"%s\",\n", lang.Name)
		buffer += fmt.Sprintf("      \"size\": %d,\n", lang.Size)
		buffer += fmt.Sprintf("      \"color\": \"%s\"\n", lang.Color)
		buffer += fmt.Sprintf("    }")
		if i != len(info.langs)-1 {
			buffer += fmt.Sprintf(",")
		}
		buffer += fmt.Sprintf("\n")
	}
	buffer += fmt.Sprintf("  ],\n")
	buffer += fmt.Sprintf("  \"nStars\": %d,\n", info.nStars)
	buffer += fmt.Sprintf("  \"lastUpdate\": %d\n", info.lastUpdate.UnixMilli())
	buffer += "}"
	f, err := os.Create(fmt.Sprintf("%s/%s.json", *mypaths.OutDir, *repo))
	util.Check(err)
	_, err = f.WriteString(buffer)
	util.Check(err)
	f.Sync()
}

// obtain the names of languages in a value-descending order
func getAllLanguages(mypaths *path.MyPaths, url string) []util.LangInfo {
	bytes := github.Get(url)
	// name:value list
	var langs map[string]uint32
	err := json.Unmarshal(bytes, &langs)
	util.Check(err)
	// hash map is inherently unordered
	// pack all to ordered dict
	return util.CreateLangInfoList(mypaths, langs)
}

func getAndParse(mypaths *path.MyPaths, repo *string) *Info {
	// get everything except languages
	bytes := github.Get(fmt.Sprintf("https://api.github.com/repos/NaokiHori/%s", *repo))
	type Parser struct {
		Name       string   `json:"name"`
		Descr      string   `json:"description"`
		Topics     []string `json:"topics"`
		LangUrl    string   `json:"languages_url"`
		NStars     uint     `json:"stargazers_count"`
		LastUpdate string   `json:"pushed_at"`
	}
	var data Parser
	err := json.Unmarshal(bytes, &data)
	util.Check(err)
	// to obtain the all used languages, I need to request another url
	langs := getAllLanguages(mypaths, data.LangUrl)
	// to time.Time
	lastUpdate, err := time.Parse(time.RFC3339, data.LastUpdate)
	util.Check(err)
	// pack everything and return
	info := Info{
		name:       data.Name,
		descr:      data.Descr,
		topics:     data.Topics,
		langs:      langs,
		nStars:     data.NStars,
		lastUpdate: lastUpdate,
	}
	saveToJSON(mypaths, repo, &info)
	return &info
}
