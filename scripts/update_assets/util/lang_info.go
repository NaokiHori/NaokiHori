package util

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"update_assets/path"
)

type LangInfo struct {
	Name  string
	Size  uint32
	Color string
}

// load language-color table from a given json file
func get(path string) map[string]string {
	// load from file: series of bytes
	bytes, err := os.ReadFile(path)
	Check(err)
	// convert it to a hash table
	var table map[string]string
	err = json.Unmarshal(bytes, &table)
	Check(err)
	return table
}

func CreateLangInfoList(mypaths *path.MyPaths, elems map[string]uint32) []LangInfo {
	colorTable := get(fmt.Sprintf("%s/colortable.json", *mypaths.ConfigDir))
	var result []LangInfo
	for key, value := range elems {
		result = append(result, LangInfo{Name: key, Size: value, Color: colorTable[key]})
	}
	sort.Slice(result, func(i int, j int) bool {
		return result[j].Size < result[i].Size
	})
	return result
}
