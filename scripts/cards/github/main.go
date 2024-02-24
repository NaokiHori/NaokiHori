package github

import (
	"create_cards/util"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

// load github token from the environment variable
func getToken() string {
	envVariable := "GITHUB_TOKEN"
	value, exists := os.LookupEnv(envVariable)
	if !exists {
		panic(fmt.Sprintf("Environment variable %s is not set\n", envVariable))
	}
	return value
}

func Get(url string) []byte {
	var token string = getToken()
	req, err := http.NewRequest("GET", url, nil)
	util.Check(err)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")
	client := &http.Client{}
	resp, err := client.Do(req)
	defer resp.Body.Close()
	util.Check(err)
	body, err := ioutil.ReadAll(resp.Body)
	util.Check(err)
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Request failed with status:", resp.Status)
		fmt.Println("Response body:", string(body))
		panic(err)
	}
	return body
}
