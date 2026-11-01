package main

import (
	"flag"
)

type MyPaths struct {
	ConfigDir    *string
	TemplateFile *string
	OutputFile   *string
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
	mypaths.OutputFile = kernel("output-file", "Destination")
	flag.Parse()
	return &mypaths
}
