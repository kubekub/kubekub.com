.PHONY: help
.DEFAULT_GOAL := help

export JEKYLL_VERSION=3.8
jekyll-build: ## installing required vagrant plugins
	docker run --rm \
	  --volume="${shell pwd}:/srv/jekyll" \
	  -it jekyll/jekyll:${JEKYLL_VERSION} \
	  jekyll build --incremental

jekyll-serve: ## installing required vagrant plugins
	docker run --rm \
	  -p 4000:4000 \
	  --name=kubekub.github.io \
	  --volume="${shell pwd}:/srv/jekyll" \
	  -it jekyll/jekyll:${JEKYLL_VERSION} \
	  jekyll serve --watch --drafts


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
