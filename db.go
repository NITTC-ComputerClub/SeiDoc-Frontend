package main

import (
	"encoding/json"
	"fmt"
	"github.com/algolia/algoliasearch-client-go/algolia/opt"
	"github.com/algolia/algoliasearch-client-go/algolia/search"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func getAlgoliaClient(indexName string) *search.Index {
	client := search.NewClient(
		os.Getenv("AlgoliaApplicationID"),
		os.Getenv("AlgoliaAPIKey"),
	)
	var index *search.Index
	index = client.InitIndex(indexName)
	return index
}

func initialDatabase(c *gin.Context) {
	url := "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec"
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error at get request: %v", err)
	}
	defer resp.Body.Close()
	byteArray, _ := ioutil.ReadAll(resp.Body)
	jsonBytes := ([]byte)(byteArray)
	if err != nil {
		log.Printf("Error at openFile(): %v\n", err)
	}

	var initialData []Institution
	if err := json.Unmarshal(jsonBytes, &initialData); err != nil {
		fmt.Printf("JSON Unmarshal error: %v\n", err)
		c.String(http.StatusServiceUnavailable, "")
		return
	}

	index := getAlgoliaClient("dev_test")

	res, err := index.SaveObjects(initialData, opt.AutoGenerateObjectIDIfNotExist(true))
	if err != nil {
		fmt.Printf("SaveObject: %v\n", err)
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, res)

}
