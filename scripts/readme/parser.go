package main

import (
	"flag"
)

type MyPaths struct {
	ConfigDir    *string
	TemplateFile *string
}

func kernel(key string, descr string) *string {
	var defaultValue string = ""
	var result *string = flag.String(key, defaultValue, descr)
	return result
}

func ParseArgs() *MyPaths {
	var mypaths MyPaths = MyPaths{}
	mypaths.ConfigDir = kernel("config-dir", "Directory storing config files")
	mypaths.TemplateFile = kernel("template-file", "SVG Template")
	flag.Parse()
	return &mypaths
}
