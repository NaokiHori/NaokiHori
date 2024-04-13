package main

import (
	"update_assets/language"
	"update_assets/path"
	"update_assets/repository"
)

func main() {
	var mypaths *path.MyPaths = path.ParseArgs()
	repository.Create(mypaths)
	language.Create(mypaths)
}
