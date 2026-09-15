SERVICE := app

help:
	@echo "help  : show this message"
	@echo "build : build HTML artifacts"
	@echo "lint  : run linter"
	@echo "fmt   : run formatter"
	@echo "tsc   : run type check"

build:
	docker compose exec $(SERVICE) npx vite build

lint:
	docker compose exec $(SERVICE) npx oxlint

fmt:
	docker compose exec $(SERVICE) npx oxfmt

tsc:
	docker compose exec $(SERVICE) npx tsc

