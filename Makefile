kube.PHONY: help
.DEFAULT_GOAL := help

install-helm-unittest: ## install-helm-unittest
	helm plugin install https://github.com/helm-unittest/helm-unittest.git


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
