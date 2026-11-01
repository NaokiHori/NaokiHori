IMAGE := naokihori/naokihori-web:latest
CONTAINER := naokihori-web
ARTIFACT_DESTINATION ?= dist
ARTIFACT_BASE ?= ./

help:
	@echo "build  : build artifacts"
	@echo "dev    : launch development server"
	@echo "polish : run type check, formatter, and linter"

build:
	docker rm -f $(CONTAINER) 2>/dev/null || true
	docker run \
    --name $(CONTAINER) \
    -v "${PWD}/index.html":/app/index.html:ro \
    -v "${PWD}/src":/app/src:ro \
    $(IMAGE) \
    npx vite build --outDir=/app/dist --base=$(ARTIFACT_BASE)
	docker cp $(CONTAINER):/app/dist $(ARTIFACT_DESTINATION)
	docker rm $(CONTAINER)

build-image:
	docker build --progress=plain -t $(IMAGE) .

dev:
	docker run \
    --rm \
    -p 5173:5173 \
    --name $(CONTAINER) \
    -v "${PWD}/index.html":/app/index.html:ro \
    -v "${PWD}/src":/app/src:ro \
    $(IMAGE) \
    npx vite dev --host

polish:
	docker run \
    --rm \
    --name $(CONTAINER) \
    -v "${PWD}/src":/app/src:ro \
    $(IMAGE) \
    npx tsc
	docker run \
    --rm \
    --name $(CONTAINER) \
    -v "${PWD}/index.html":/app/index.html \
    -v "${PWD}/src":/app/src \
    $(IMAGE) \
    npx oxfmt
	docker run \
    --rm \
    --name $(CONTAINER) \
    -v "${PWD}/src":/app/src:ro \
    $(IMAGE) \
    npx oxlint --type-aware -D correctness src/

