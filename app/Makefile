IMAGE := naokihori/naokihori-app:latest
CONTAINER := naokihori-app

help:
	@echo "help : show this message"

build-image:
	docker build -t $(IMAGE) .

update-assets:
	docker rm -f $(CONTAINER) 2>/dev/null || true
	docker run \
    --name $(CONTAINER) \
    -e GITHUB_TOKEN \
    -v "${PWD}/config":/app/config:ro \
    -v "${PWD}/update_assets":/app/src:ro \
    -w /app/src \
    $(IMAGE) \
    go run . --config-dir /app/config --template-dir /app/src/view --out-dir /app/assets
	docker cp $(CONTAINER):/app/assets ./assets
	docker rm -f $(CONTAINER)

update-readme:
	docker rm -f $(CONTAINER) 2>/dev/null || true
	docker run \
    --name $(CONTAINER) \
    -v "${PWD}/config":/app/config:ro \
    -v "${PWD}/update_readme":/app/src:ro \
    -w /app/src \
    $(IMAGE) \
    go run . --config-dir /app/config --template-file template.md --output-file /app/assets/README.md
	docker cp $(CONTAINER):/app/assets/README.md ./README.md
	docker rm -f $(CONTAINER)

fmt:
	docker run \
    --rm \
    --name $(CONTAINER) \
    -v "${PWD}/update_readme":/app \
    $(IMAGE) \
    go fmt .
	docker run \
    --rm \
    --name $(CONTAINER) \
    -v "${PWD}/update_assets":/app \
    $(IMAGE) \
    go fmt .
