package language

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
	"update_assets/github"
	"update_assets/path"
	"update_assets/util"
)

func saveToJSON(mypaths *path.MyPaths, langInfoList []util.LangInfo) {
	// Construct JSON string manually
	var buffer string = ""
	buffer += "{\n"
	buffer += "  \"languages\": [\n"
	for i, item := range langInfoList {
		buffer += "  {\n"
		buffer += fmt.Sprintf("      \"name\": \"%s\",\n", item.Name)
		buffer += fmt.Sprintf("      \"size\": %d,\n", item.Size)
		buffer += fmt.Sprintf("      \"color\": \"%s\"\n", item.Color)
		// Add comma except for the last item
		if i == len(langInfoList)-1 {
			buffer += "    }\n"
		} else {
			buffer += "    },\n"
		}
	}
	buffer += "  ],\n"
	buffer += fmt.Sprintf("  \"date\": %d\n", time.Now().UnixMilli())
	buffer += "}"
	f, err := os.Create(fmt.Sprintf("%s/language.json", *mypaths.OutDir))
	util.Check(err)
	_, err = f.WriteString(buffer)
	util.Check(err)
	f.Sync()
}

// get all used languages and reurn in a descending order
func fetch(mypaths *path.MyPaths) []util.LangInfo {
	var err error
	result := map[string]uint32{}
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
				result[key] = v + uint32(value)
			} else {
				result[key] = uint32(value)
			}
		}
	}
	// sort and return
	langInfoList := util.CreateLangInfoList(mypaths, result)
	// save to json
	saveToJSON(mypaths, langInfoList)
	return langInfoList
}
