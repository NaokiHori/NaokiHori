package colortable

import (
	"create_cards/util"
	"encoding/json"
	"os"
)

// load language-color table from a given json file
func Get(path string) map[string]string {
	// load from file: series of bytes
	bytes, err := os.ReadFile(path)
	util.Check(err)
	// convert it to a hash table
	var table map[string]string
	err = json.Unmarshal(bytes, &table)
	util.Check(err)
	return table
}
