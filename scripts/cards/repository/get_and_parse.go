package repository

import (
	"create_cards/github"
	"create_cards/util"
	"encoding/json"
	"fmt"
	"time"
)

// obtain the names of languages in a value-descending order
func getAllLanguages(url string) []string {
	bytes := github.Get(url)
	// name:value list
	var langs map[string]uint
	err := json.Unmarshal(bytes, &langs)
	util.Check(err)
	// hash map is inherently unordered
	// pack all to ordered dict
	pairs := util.CreateOrderedDict(langs)
	// only keys are needed
	var result []string
	for _, pair := range pairs {
		result = append(result, pair.Key)
	}
	return result
}

func convertDate(date string) string {
	dateTime, err := time.Parse(time.RFC3339, date)
	util.Check(err)
	return fmt.Sprintf("%d %s %d", dateTime.Day(), dateTime.Month(), dateTime.Year())
}

func getAndParse(repo *string) *Info {
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
	langs := getAllLanguages(data.LangUrl)
	// pack everything and return
	info := Info{
		name:       data.Name,
		descr:      data.Descr,
		topics:     data.Topics,
		langs:      langs,
		nStars:     data.NStars,
		lastUpdate: convertDate(data.LastUpdate),
	}
	return &info
}
