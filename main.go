package main

import (
	"os"
	"regexp"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(CORS())

	router.GET("/institution", getInstitutions)
	router.GET("/init", initialDatabase)
	router.GET("/", greeting)
	router.Run(":" + os.Getenv("PORT"))
}

var reg = regexp.MustCompile("https?:\\/\\/(.+)\\.example\\.com:?.*")

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {

		if c.Request.Method == "OPTIONS" {
			origin := c.Request.Header.Get("Origin")

			r := reg.Copy()
			if r.MatchString(origin) {
				headers := c.Request.Header.Get("Access-Control-Request-Headers")

				c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
				c.Writer.Header().Set("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE")
				c.Writer.Header().Set("Access-Control-Allow-Headers", headers)

				c.Data(200, "text/plain", []byte{})
				c.Abort()
			} else {
				c.Data(403, "text/plain", []byte{})
				c.Abort()
			}
		} else {
			// for actual response
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			//c.Writer.Header().Set("Access-Control-Expose-Headers", "")
			c.Next()
		}

		return
	}
}
