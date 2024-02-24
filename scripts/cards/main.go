package main

import (
	"create_cards/language"
	"create_cards/path"
	"create_cards/repository"
)

func main() {
	var mypaths *path.MyPaths = path.ParseArgs()
	repository.Create(mypaths)
	language.Create(mypaths)
}
