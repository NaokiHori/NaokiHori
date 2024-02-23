package main

import (
	"encoding/json"
	"fmt"
)

const debug = false

type Info struct {
	name       string
	descr      string
	topics     []string
	langs      []string
	nStars     uint
	lastUpdate string
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getAllRepos(mypaths *MyPaths) []string {
	bytes := load(fmt.Sprintf("%s/repositories.json", *mypaths.ConfigDir))
	type Tmp struct {
		Title string
		Items []string
	}
	var repos []Tmp
	err := json.Unmarshal(bytes, &repos)
	check(err)
	var result []string
	for _, repo := range repos {
		items := repo.Items
		for _, item := range items {
			result = append(result, item)
		}
	}
	return result
}

func main() {
	var mypaths *MyPaths = ParseArgs()
	repos := getAllRepos(mypaths)
	for _, repo := range repos {
		Create(mypaths, &repo)
	}
}
