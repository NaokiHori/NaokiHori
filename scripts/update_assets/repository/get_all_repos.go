package repository

import (
	"encoding/json"
	"fmt"
	"os"
	"update_assets/path"
	"update_assets/util"
)

func getAllRepos(mypaths *path.MyPaths) []string {
	bytes, err := os.ReadFile(fmt.Sprintf("%s/repositories.json", *mypaths.ConfigDir))
	util.Check(err)
	type Tmp struct {
		Title string
		Items []string
	}
	var repos []Tmp
	err = json.Unmarshal(bytes, &repos)
	util.Check(err)
	var result []string
	for _, repo := range repos {
		items := repo.Items
		for _, item := range items {
			result = append(result, item)
		}
	}
	return result
}
