package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"sort"
)

func get_token() string {
	envVariable := "GITHUB_TOKEN"
	value, exists := os.LookupEnv(envVariable)
	if !exists {
		panic(fmt.Sprintf("Environment variable %s is not set\n", envVariable))
	}
	return value
}

func get_http_body(token string, url string) []byte {
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

func sort_dict(data *map[string]float64) *[]Lang {
	var langs []Lang
	for k, v := range *data {
		langs = append(langs, Lang{k, v})
	}
	sort.Slice(langs, func(i int, j int) bool {
		return langs[i].Value > langs[j].Value
	})
	return &langs
}

func FetchData() *[]Lang {
	var url string
	var body []byte
	var err error
	result := map[string]float64{}
	// github token
	token := get_token()
	// get all public repos
	url = "https://api.github.com/users/NaokiHori/repos"
	body = get_http_body(token, url)
	// decode body as a series of repos
	var repos []interface{}
	err = json.Unmarshal(body, &repos)
	check(err)
	for _, repo := range repos {
		// for each repo, access "languages_url" to list all used languages
		var data map[string]interface{} = repo.(map[string]interface{})
		url = data["languages_url"].(string)
		body = get_http_body(token, url)
		// cast
		var langs map[string]int
		err = json.Unmarshal(body, &langs)
		check(err)
		for key, value := range langs {
			if v, ok := result[key]; ok {
				result[key] = v + float64(value)
			} else {
				result[key] = float64(value)
			}
		}
	}
	return sort_dict(&result)
}
