# Contains AI-generated edits for kubekub.com - 2025-12-22
.PHONY: help build-docs install-helm-docs
.DEFAULT_GOAL := help


build-docs: ## build-docs
	npm run build
	cp CNAME docs/CNAME
	touch docs/.nojekyll

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
