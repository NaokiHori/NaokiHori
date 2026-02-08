SERVICE := app

help:
	@echo "help    : show this message"
	@echo "build   : build HTML artifacts"
	@echo "eslint  : run linter"
	@echo "prettier: prettify files"
	@echo "tsc     : run type check"

build:
	docker compose exec $(SERVICE) npx vite build

eslint:
	docker compose exec $(SERVICE) npx eslint .

prettier:
	docker compose exec $(SERVICE) npx prettier . --write

tsc:
	docker compose exec $(SERVICE) npx tsc
