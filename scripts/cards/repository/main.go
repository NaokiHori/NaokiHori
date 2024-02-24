package repository

import (
	"create_cards/colortable"
	"create_cards/path"
	"create_cards/template"
	"create_cards/util"
	"fmt"
	"math"
)

const Large uint = 0
const Small uint = 1

type Info struct {
	name       string
	descr      string
	topics     []string
	langs      []string
	nStars     uint
	lastUpdate string
}

// left-edge margin
func getMargin(fontSizes *[2]util.Size) float64 {
	return 1.5 * fontSizes[Large].Width
}

// set position and text of the title section
func getTitle(fontSizes *[2]util.Size, domainSize *util.Size, info *Info) map[string]interface{} {
	// move downward a bit, above text
	domainSize.Height += 1.5 * fontSizes[Large].Height
	result := make(map[string]interface{})
	result["x"] = getMargin(fontSizes)
	result["y"] = domainSize.Height
	result["text"] = info.name
	// move downward a bit, below text
	domainSize.Height += 1.5 * fontSizes[Large].Height
	return result
}

func getDescrs(fontSizes *[2]util.Size, domainSize *util.Size, info *Info) []map[string]interface{} {
	width := domainSize.Width - 2.*getMargin(fontSizes)
	chars := info.descr
	var texts []string
	text := ""
	w := 0.
	for _, char := range chars {
		if width <= w {
			texts = append(texts, text)
			w = fontSizes[Small].Width
			text = string(char)
		} else {
			text += string(char)
			w += fontSizes[Small].Width
		}
	}
	texts = append(texts, text)
	var result []map[string]interface{}
	for _, text := range texts {
		r := make(map[string]interface{})
		r["x"] = getMargin(fontSizes)
		r["y"] = domainSize.Height
		r["text"] = text
		result = append(result, r)
		domainSize.Height += 1.5 * fontSizes[Large].Height
	}
	return result
}

func createBoxedItems(fontSizes *[2]util.Size, domainSize *util.Size, items *[]string) []map[string]map[string]interface{} {
	width := domainSize.Width - 2*getMargin(fontSizes)
	x0 := getMargin(fontSizes) + 0.5*fontSizes[Small].Width
	h_update := 2. * fontSizes[Small].Height
	x := x0
	y := domainSize.Height
	var result []map[string]map[string]interface{}
	for _, item := range *items {
		dx := float64(len(item)+2) * fontSizes[Small].Width
		if width < x+dx {
			x = x0
			y += h_update
			domainSize.Height += h_update
		}
		rect_height := 1.4 * fontSizes[Small].Height
		r := make(map[string]map[string]interface{})
		r["text"] = map[string]interface{}{
			"x":    x,
			"y":    y,
			"text": item,
		}
		r["rect"] = map[string]interface{}{
			"x":      x - 0.5*fontSizes[Small].Width,
			"y":      y - 0.5*rect_height,
			"width":  float64(len(item)+1) * fontSizes[Small].Width,
			"height": rect_height,
			"round":  4,
		}
		result = append(result, r)
		x += dx
	}
	domainSize.Height += h_update
	return result
}

func getTopics(fontSizes *[2]util.Size, domainSize *util.Size, info *Info) []map[string]map[string]interface{} {
	return createBoxedItems(fontSizes, domainSize, &info.topics)
}

func getLangs(mypaths *path.MyPaths, fontSizes *[2]util.Size, domainSize *util.Size, info *Info) []map[string]map[string]interface{} {
	langColorTable := colortable.Get(fmt.Sprintf("%s/colortable.json", *mypaths.ConfigDir))
	langs := createBoxedItems(fontSizes, domainSize, &info.langs)
	for _, lang := range langs {
		lang["rect"]["stroke"] = langColorTable[lang["text"]["text"].(string)]
	}
	return langs
}

func getStar(fontSizes *[2]util.Size, domainSize *util.Size, info *Info, x0 *float64) map[string]interface{} {
	const nVertices = 10
	ro := 0.5 * fontSizes[Small].Height
	ri := 0.5 * ro
	xmin := 1e100
	yave := 0.
	var xs []float64
	var ys []float64
	for cnt := 0; cnt < nVertices; cnt++ {
		t := 2.*math.Pi*float64(cnt)/float64(nVertices) - 0.5*math.Pi
		var r float64
		if 0 == cnt%2 {
			r = ro
		} else {
			r = ri
		}
		x := r * math.Cos(t)
		y := r * math.Sin(t)
		xs = append(xs, x)
		ys = append(ys, y)
		xmin = min(xmin, x)
		yave += y / nVertices
	}
	for cnt := 0; cnt < nVertices; cnt++ {
		xs[cnt] += *x0 - xmin
		ys[cnt] += domainSize.Height - yave
	}
	path := ""
	for cnt := 0; cnt < nVertices; cnt++ {
		var prefix string
		var suffix string
		if 0 == cnt {
			prefix = "M"
		} else {
			prefix = "L"
		}
		if nVertices-1 == cnt {
			suffix = "Z"
		} else {
			suffix = " "
		}
		path += prefix
		path += " "
		path += fmt.Sprintf("%.15f", xs[cnt])
		path += " "
		path += fmt.Sprintf("%.15f", ys[cnt])
		path += " "
		path += suffix
	}
	*x0 += 2.5 * ro
	star := map[string]interface{}{
		"mark": path,
		"text": map[string]interface{}{
			"x":    *x0,
			"y":    domainSize.Height,
			"text": info.nStars,
		},
	}
	*x0 += (float64(len(fmt.Sprintf("%d", info.nStars))) + 1.5) * fontSizes[Small].Width
	return star
}

func getClock(fontSizes *[2]util.Size, domainSize *util.Size, info *Info, x0 *float64) map[string]interface{} {
	size := fontSizes[Small].Height
	centre := []float64{*x0 + 0.5*size, domainSize.Height}
	result := make(map[string]interface{})
	radians := func(degree float64) float64 {
		return math.Pi * degree / 180.
	}
	result["circle"] = func(size float64, centre []float64) map[string]string {
		stroke_width := 0.125 * size
		r := 0.4 * size
		a1 := 0.
		a2 := 315.
		x1 := centre[0] + r*math.Cos(radians(a1+0.00))
		y1 := centre[1] + r*math.Sin(radians(a1+0.00))
		x2 := centre[0] + r*math.Cos(radians(a2+0.01))
		y2 := centre[1] + r*math.Sin(radians(a2+0.01))
		return map[string]string{
			"path":         fmt.Sprintf("M%f %f A%f %f %f 1 1 %f %f", x1, y1, r, r, a1, x2, y2),
			"stroke_width": fmt.Sprintf("%f", stroke_width),
		}
	}(size, centre)
	result["triangle"] = func(size float64, centre []float64) string {
		r := 0.4 * size
		a2 := 315.
		r1 := r - 0.2*size
		r2 := r + 0.2*size
		x1 := centre[0] + r1*math.Cos(radians(a2))
		y1 := centre[1] + r1*math.Sin(radians(a2))
		x2 := centre[0] + r2*math.Cos(radians(a2))
		y2 := centre[1] + r2*math.Sin(radians(a2))
		return fmt.Sprintf("%f %f %f %f %f %f", x1, y1, x2, y1, x2, y2)
	}(size, centre)
	result["big"] = func(size float64, centre []float64) map[string]interface{} {
		stroke_width := 0.1 * size
		x1 := centre[0]
		y1 := centre[1] + 0.5*stroke_width
		x2 := centre[0]
		y2 := centre[1] - 0.3*size
		return map[string]interface{}{
			"stroke_width": stroke_width,
			"x1":           x1,
			"y1":           y1,
			"x2":           x2,
			"y2":           y2,
		}
	}(size, centre)
	result["small"] = func(size float64, centre []float64) map[string]interface{} {
		stroke_width := 0.1 * size
		x1 := centre[0] - 0.5*stroke_width
		y1 := centre[1]
		x2 := centre[0] + 0.2*size
		y2 := centre[1]
		return map[string]interface{}{
			"stroke_width": stroke_width,
			"x1":           x1,
			"y1":           y1,
			"x2":           x2,
			"y2":           y2,
		}
	}(size, centre)
	*x0 += 1.5 * size
	return result
}

func getLastUpdate(fontSizes *[2]util.Size, domainSize *util.Size, info *Info, x float64) map[string]interface{} {
	return map[string]interface{}{
		"x":    x,
		"y":    domainSize.Height,
		"text": info.lastUpdate,
	}
}

func getBorder(domainSize *util.Size) map[string]interface{} {
	const strokeWidth float64 = 2.
	result := make(map[string]interface{})
	result["x"] = 0.5 * strokeWidth
	result["y"] = 0.5 * strokeWidth
	result["width"] = domainSize.Width - strokeWidth
	result["height"] = domainSize.Height - strokeWidth
	result["round"] = 10.
	result["stroke_width"] = strokeWidth
	return result
}

func process(mypaths *path.MyPaths, repo *string) {
	// font sizes for larger (title) and smaller (others) texts
	fontSizes := [2]util.Size{
		util.DefineFont(20),
		util.DefineFont(16),
	}
	// access github to get information, which is parsed
	var info *Info = getAndParse(repo)
	// overall svg size
	// width is fixed, while height is subject to change
	domainSize := util.Size{Width: 500, Height: 0}
	// collect information to construct svg
	title := getTitle(&fontSizes, &domainSize, info)
	descrs := getDescrs(&fontSizes, &domainSize, info)
	topics := getTopics(&fontSizes, &domainSize, info)
	langs := getLangs(mypaths, &fontSizes, &domainSize, info)
	// star, clock, and last-update date are on the same row
	// the left-most positions are to be adjusted
	x := getMargin(&fontSizes)
	star := getStar(&fontSizes, &domainSize, info, &x)
	clock := getClock(&fontSizes, &domainSize, info, &x)
	lastUpdate := getLastUpdate(&fontSizes, &domainSize, info, x)
	// after adding the bottom margin, the whole size is finally settled
	//   and the border can be drawn
	domainSize.Height += 1.5 * fontSizes[Large].Height
	border := getBorder(&domainSize)
	// embed all elements into the template
	result := struct {
		Domain     util.Size
		Title      map[string]interface{}
		Descrs     []map[string]interface{}
		Topics     []map[string]map[string]interface{}
		Langs      []map[string]map[string]interface{}
		Star       map[string]interface{}
		Clock      map[string]interface{}
		LastUpdate map[string]interface{}
		Border     map[string]interface{}
	}{
		Domain:     domainSize,
		Title:      title,
		Descrs:     descrs,
		Topics:     topics,
		Langs:      langs,
		Star:       star,
		Clock:      clock,
		LastUpdate: lastUpdate,
		Border:     border,
	}
	template.EmbedAndSave(
		fmt.Sprintf("%s/repository.svg", *mypaths.TemplateDir),
		fmt.Sprintf("%s/%s.svg", *mypaths.OutDir, *repo),
		result,
	)
}

func Create(mypaths *path.MyPaths) {
	repos := getAllRepos(mypaths)
	for _, repo := range repos {
		process(mypaths, &repo)
	}
}
