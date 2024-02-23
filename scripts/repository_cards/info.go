package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"sort"
	"time"
)

func getHttpBody(url string) []byte {
	token := func() string {
		envVariable := "GITHUB_TOKEN"
		value, exists := os.LookupEnv(envVariable)
		if !exists {
			panic(fmt.Sprintf("Environment variable %s is not set\n", envVariable))
		}
		return value
	}()
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		panic(err)
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		panic(err)
	}
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Request failed with status:", resp.Status)
		fmt.Println("Response body:", string(body))
		panic(err)
	}
	return body
}

func convertDate(date string) string {
	dateTime, err := time.Parse(time.RFC3339, date)
	check(err)
	return fmt.Sprintf("%d %s %d", dateTime.Day(), dateTime.Month(), dateTime.Year())
}

func GetInfo(repo *string) *Info {
	var info Info
	if debug {
		info = Info{
			name:  "MyDebugRepository",
			descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			topics: []string{
				"Lorem",
				"ipsum",
				"dolor",
				"sit",
				"amet",
				"unbelievably-long-ever-lasting-topic-element",
				"consectetur",
				"adipiscing",
				"elit",
				"sed",
				"do",
				"eiusmod",
				"tempor",
				"incididunt",
				"ut",
				"labore",
				"et",
				"unbelievably-long-ever-lasting-topic-element",
				"dolore",
				"magna",
				"unbelievably-long-ever-lasting-topic-element",
				"aliqua",
			},
			langs: []string{
				"C",
				"Python",
				"Rust",
				"Makefile",
				"Shell",
				"HTML",
				"CSS",
				"WebAssembly",
			},
			nStars:     10,
			lastUpdate: "Jan 01 1970",
		}
	} else {
		var err error
		url := fmt.Sprintf("https://api.github.com/repos/NaokiHori/%s", *repo)
		body := getHttpBody(url)
		type Parser struct {
			Name       string   `json:"name"`
			Descr      string   `json:"description"`
			Topics     []string `json:"topics"`
			LangUrl    string   `json:"languages_url"`
			NStars     uint     `json:"stargazers_count"`
			LastUpdate string   `json:"pushed_at"`
		}
		var data Parser
		err = json.Unmarshal(body, &data)
		check(err)
		langs := func() []string {
			body := getHttpBody(data.LangUrl)
			var langs map[string]uint
			err = json.Unmarshal(body, &langs)
			check(err)
			result := func() []string {
				type Dict struct {
					Key   string
					Value uint
				}
				var elems []Dict
				for key, value := range langs {
					elems = append(elems, Dict{Key: key, Value: value})
				}
				sort.Slice(elems, func(i int, j int) bool {
					return elems[j].Value < elems[i].Value
				})
				var result []string
				for _, elem := range elems {
					result = append(result, elem.Key)
				}
				return result
			}()
			return result
		}()
		info = Info{
			name:       data.Name,
			descr:      data.Descr,
			topics:     data.Topics,
			langs:      langs,
			nStars:     data.NStars,
			lastUpdate: convertDate(data.LastUpdate),
		}
	}
	return &info
}
