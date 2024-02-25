package language

import (
	"create_cards/colortable"
	"create_cards/path"
	"create_cards/template"
	"create_cards/util"
	"fmt"
	"time"
)

// font sizes for larger (title) and smaller (others) texts
const LargeFont float64 = 24.
const SmallFont float64 = 16.

// left-edge margin
func getMargin() float64 {
	return 1.5 * util.GetFontWidth(LargeFont)
}

// convert raw bytes into one of the others
func formatBytes(bytes float64) string {
	unit := "B"
	thres := 1024.
	if bytes > thres {
		bytes /= thres
		unit = "kB"
	}
	if bytes > thres {
		bytes /= thres
		unit = "MB"
	}
	return fmt.Sprintf("%.1f%s", bytes, unit)
}

// set position and text of the title section
func getTitle(domainSize *util.Size, langs *[]util.OrderedDict[float64]) map[string]interface{} {
	// move downward a bit, above text
	domainSize.Height += 1.5 * util.GetFontHeight(LargeFont)
	// get total bytes
	getTotalBytes := func(langs *[]util.OrderedDict[float64]) float64 {
		totalBytes := 0.
		for _, lang := range *langs {
			totalBytes += float64(lang.Value)
		}
		return totalBytes
	}
	totalBytes := getTotalBytes(langs)
	result := make(map[string]interface{})
	result["x"] = getMargin()
	result["y"] = domainSize.Height
	result["text"] = fmt.Sprintf("Language Stats (%s)", formatBytes(totalBytes))
	// move downward a bit, below text
	domainSize.Height += 1.5 * util.GetFontHeight(LargeFont)
	return result
}

// create bar graph for each language
// it looks like
// +-----+
// |label| share ||||||bar||||||
// +-----+
// I need to prescribe margins between each element and at the edges
func getLangData(mypaths *path.MyPaths, domainSize *util.Size, langs *[]util.OrderedDict[float64]) []map[string]map[string]interface{} {
	// look-up json to obtain a color table
	langColorTable := colortable.Get(fmt.Sprintf("%s/colortable.json", *mypaths.ConfigDir))
	// reference width: width of the normal font
	w := util.GetFontWidth(SmallFont)
	// height for each language
	heightOfLine := 2. * util.GetFontHeight(SmallFont)
	// decide width of the first part by checking the length of the longest name
	// at the same time get the max and sum of the whole values
	labelWidth := 0.
	vMax := 0.
	vSum := 0.
	for _, lang := range *langs {
		l := float64(len(lang.Key)) * w
		if labelWidth < l {
			labelWidth = l
		}
		vMax = max(vMax, lang.Value)
		vSum += lang.Value
	}
	// start iterating for each language
	var result []map[string]map[string]interface{}
	for cntr, lang := range *langs {
		// origin
		x := getMargin()
		y := domainSize.Height + float64(cntr)*heightOfLine
		// height of rectangles, both label and graph
		rectHeight := 0.7 * heightOfLine
		// a label (language name) and a surrounding rectangle
		labelRect, labelText := func(x *float64) (map[string]interface{}, map[string]interface{}) {
			// rectangle around the label
			result0 := make(map[string]interface{})
			// top-left corner
			result0["x"] = *x
			result0["y"] = y - 0.5*rectHeight
			// size of the rect, give 0.5 text-width margins for each edge
			result0["width"] = labelWidth + w
			result0["height"] = rectHeight
			result0["round"] = 4
			result0["stroke"] = langColorTable[lang.Key]
			// label: language name
			result1 := make(map[string]interface{})
			// give 0.5 text-width margin
			result1["x"] = *x + 0.5*w
			result1["y"] = y
			result1["text"] = lang.Key
			// update x edge for the coming elements
			*x += labelWidth + w
			return result0, result1
		}(&x)
		share := func(x *float64) map[string]interface{} {
			// just a text
			shareText := fmt.Sprintf("%.2f%%", 100.*lang.Value/vSum)
			nSpaces := len("100.00%") - len(shareText)
			result := make(map[string]interface{})
			result["x"] = *x + 0.5*w + float64(nSpaces)*w
			result["y"] = y
			result["text"] = shareText
			*x += float64(len("100.00%")) * w
			return result
		}(&x)
		graph := func(x *float64) map[string]interface{} {
			result := make(map[string]interface{})
			// just a rectangle
			graphWidth := domainSize.Width - *x - 3.*w
			result["x"] = *x + 1.*w
			result["y"] = y - 0.5*rectHeight
			result["width"] = graphWidth * float64(lang.Value) / vMax
			result["height"] = rectHeight
			result["round"] = 4
			result["fill"] = langColorTable[lang.Key]
			result["stroke"] = langColorTable[lang.Key]
			return result
		}(&x)
		result = append(result, map[string]map[string]interface{}{"labelrect": labelRect, "labeltext": labelText, "share": share, "graph": graph})
	}
	domainSize.Height += heightOfLine * float64(len(*langs))
	return result
}

func getLastUpdate(domainSize *util.Size) map[string]interface{} {
	domainSize.Height += 0.5 * util.GetFontHeight(SmallFont)
	t := time.Now()
	result := make(map[string]interface{})
	result["x"] = getMargin()
	result["y"] = domainSize.Height
	result["text"] = fmt.Sprintf("%d %s %d", t.Day(), t.Month(), t.Year())
	domainSize.Height += util.GetFontHeight(LargeFont)
	return result
}

func getBorder(domainSize *util.Size) map[string]float64 {
	const strokeWidth = 2.
	result := make(map[string]float64)
	result["x"] = 0.5 * strokeWidth
	result["y"] = 0.5 * strokeWidth
	result["width"] = domainSize.Width - strokeWidth
	result["height"] = domainSize.Height - strokeWidth
	result["round"] = 10.
	result["stroke_width"] = strokeWidth
	return result
}

func Create(mypaths *path.MyPaths) {
	var langs []util.OrderedDict[float64] = fetch()
	// overall svg size
	// width is fixed, while height is subject to change
	domainSize := util.Size{Width: 500, Height: 0}
	// collect information to construct svg
	title := getTitle(&domainSize, &langs)
	langData := getLangData(mypaths, &domainSize, &langs)
	lastUpdate := getLastUpdate(&domainSize)
	border := getBorder(&domainSize)
	// embed it into the template
	result := struct {
		Domain     util.Size
		Title      map[string]interface{}
		Border     map[string]float64
		Langs      []map[string]map[string]interface{}
		LastUpdate map[string]interface{}
	}{
		Domain:     domainSize,
		Title:      title,
		Border:     border,
		Langs:      langData,
		LastUpdate: lastUpdate,
	}
	template.EmbedAndSave(fmt.Sprintf("%s/language.svg", *mypaths.TemplateDir), fmt.Sprintf("%s/language.svg", *mypaths.OutDir), result)
}
