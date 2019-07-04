package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Institution struct {
	Name               string   `json:"name"`               //制度名
	DepartmentInCharge string   `json:"departmentInCharge"` //部署名
	Location           string   `json:"location"`
	Site               string   `json:"site"`         //URL
	Detail             string   `json:"detail"`       //詳細情報
	BigCategory        string   `json:"BigCategory" ` //カテゴリー
	SmallCategory      string   `json:"SmallCategory" `
	TargetAge          int      `json:"targetAge"`                                                        //ターゲット
	FamilyMakeup       []string `json:"FamilyMakeup" gorm:"not null;type:BigInt[];column:related_record"` //家族構成
	Other              []string `json:"Other" gorm:"type:varchar(64)[]"`                                  // その他
}

func getInstitutions(c *gin.Context) {
	index := getAlgoliaClient("dev_test")
	query := c.DefaultQuery("query", "")

	// categoryがあったらそれで検索
	category := c.DefaultQuery("BigCategory", "")
	if category != "" {
		res, err := index.SearchForFacetValues("BigCategory", category)
		if err != nil {
			fmt.Printf("err at search(): %v", err)
			return
		}
		fmt.Print(res.FacetHits)
		return
	}

	res, err := index.Search(query)
	if err != nil {
		fmt.Printf("err at search(): %v", err)
		return
	}

	var institutions []Institution
	err = res.UnmarshalHits(&institutions)
	if err != nil {
		fmt.Printf("err at unmarshalHits(): %v", err)
		return
	}
	c.JSON(http.StatusOK, institutions)
}

func greeting(c *gin.Context) {
	c.String(http.StatusOK, "Hello, user:)")
}
