package path

import (
	"flag"
)

type MyPaths struct {
	ConfigDir   *string
	OutDir      *string
	TemplateDir *string
}

func kernel(key string, descr string) *string {
	var defaultValue string = ""
	var result *string = flag.String(key, defaultValue, descr)
	return result
}

func ParseArgs() *MyPaths {
	var mypaths MyPaths
	mypaths.ConfigDir = kernel("config-dir", "Directory storing config files")
	mypaths.OutDir = kernel("out-dir", "Destination of the artifacts")
	mypaths.TemplateDir = kernel("template-dir", "Directory storing SVG Templates")
	flag.Parse()
	return &mypaths
}
