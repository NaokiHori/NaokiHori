package template

import (
	"html/template"
	"io/ioutil"
	"os"
	"update_assets/util"
)

func load(filename string) []byte {
	f, err := os.Open(filename)
	defer f.Close()
	util.Check(err)
	contents, err := ioutil.ReadAll(f)
	util.Check(err)
	return contents
}

func dump(filename string, t *template.Template, data interface{}) {
	f, err := os.Create(filename)
	defer f.Close()
	util.Check(err)
	err = t.Execute(f, data)
	util.Check(err)
}

func EmbedAndSave(input string, output string, data interface{}) {
	tpl := load(input)
	t, err := template.New("template").Parse(string(tpl))
	util.Check(err)
	dump(output, t, data)
}
