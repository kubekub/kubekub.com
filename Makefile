# Contains AI-generated edits for kubekub.com - 2026-01-04
.PHONY: help install build dev preview check fix clean docker-build docker-run
.DEFAULT_GOAL := help

## Development Commands

install: ## Install dependencies
	npm install

dev: ## Run development server
	npm run dev

run-docs: ## Alias for dev - run development server
	npm run dev

preview: ## Preview production build locally
	npm run preview

## Build Commands

build-docs: ## Build documentation and prepare for deployment
	npm run build
	cp CNAME docs/CNAME
	touch docs/.nojekyll

## Quality Checks

check: ## Run all checks (astro, eslint, prettier)
	npm run check

check-astro: ## Run Astro checks
	npm run check:astro

check-eslint: ## Run ESLint checks
	npm run check:eslint

check-prettier: ## Run Prettier checks
	npm run check:prettier

fix: ## Fix linting and formatting issues
	npm run fix

fix-eslint: ## Fix ESLint issues
	npm run fix:eslint

fix-prettier: ## Fix Prettier formatting
	npm run fix:prettier

## Docker Commands

docker-build: ## Build Docker image
	docker build -t kubekub-com:latest .

docker-run: ## Run Docker container
	docker-compose up

docker-stop: ## Stop Docker container
	docker-compose down

## Utility Commands

clean: ## Clean build artifacts and dependencies
	rm -rf node_modules dist .astro

clean-all: clean ## Clean everything including lock files
	rm -rf package-lock.json

reinstall: clean install ## Clean and reinstall dependencies

## Help

help: ## Show this help message
	@echo "Kubekub.com - Available Make Targets"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
