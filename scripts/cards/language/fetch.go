package language

import (
	"create_cards/github"
	"create_cards/util"
	"encoding/json"
)

// get all used languages and reurn in a descending order
func fetch() []util.OrderedDict[float64] {
	var err error
	result := map[string]float64{}
	// get all public repos
	bytes := github.Get("https://api.github.com/users/NaokiHori/repos")
	// decode body as a series of repos
	var repos []interface{}
	err = json.Unmarshal(bytes, &repos)
	util.Check(err)
	for _, repo := range repos {
		// for each repo, access "languages_url" to list all used languages
		var data map[string]interface{} = repo.(map[string]interface{})
		bytes := github.Get(data["languages_url"].(string))
		// cast to hash map
		var langs map[string]uint
		err = json.Unmarshal(bytes, &langs)
		util.Check(err)
		// sum all languages data sizes
		for key, value := range langs {
			if v, ok := result[key]; ok {
				result[key] = v + float64(value)
			} else {
				result[key] = float64(value)
			}
		}
	}
	// sort and return
	return util.CreateOrderedDict(result)
}
