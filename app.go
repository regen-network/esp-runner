package main

import (
	"context"
	"fmt"
	"google.golang.org/api/option"
)
import "cloud.google.com/go/storage"

type Sentinel2DataParams struct {
	UTMZone      int    `json:"utm_zone"`
	LatitudeBand string `json:"latitude_band"`
	GridSquare   string `json:"grid_square"`
	Year         int    `json:"year"`
	Month        int    `json:"month"`
	Day          int    `json:"day"`
	Sequence     int    `json:"sequence"`
}

type ResolverContext interface {
	context.Context
	GoogleCloudStorageClient() (*storage.Client, error)
}

type defaultResolverContext struct {
	context.Context
	//gcsClient storage.Client
}

func (ctx defaultResolverContext) GoogleCloudStorageClient() (*storage.Client, error) {
	return storage.NewClient(ctx, option.WithoutAuthentication())
}

type Dependency interface {
	Resolve(ctx ResolverContext, outDir string, onResolve func())
}

func (params Sentinel2DataParams) Resolve(ctx ResolverContext, outDir string, onResolve func()) {
	url := fmt.Sprintf("gs://gcp-public-data-sentinel-2/tiles/%d/%s/%s/", params.UTMZone, params.LatitudeBand, params.GridSquare)
	client, err := ctx.GoogleCloudStorageClient()
	if err != nil {
		panic(err)
	}
	bkt := client.Bucket(url)
	prefix := fmt.Sprintf("S2A_MSIL1C_%4d%2d%2d", params.Year, params.Month, params.Day)
	objs := bkt.Objects(ctx, &storage.Query{Prefix:prefix})
	//obj, err := objs.Next()
}

func readDependencySpec(str string) {

}

func main() {
	params := Sentinel2DataParams{
		UTMZone:33,
		LatitudeBand:"U",
		GridSquare:"UP",
		Year:2016,
		Month:6,
		Day:18,
		Sequence:0,
	}
	ctx := defaultResolverContext{

	}
	params.Resolve(ctx, "test", func() {

	})
}
