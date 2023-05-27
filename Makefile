SHELL=bash

.PHONY: init-app
init-app:
ifeq ($(c),)
	$(error Argumen c kosong, contoh: c=nama-aplikasi.)
endif
	$(eval appBuildInfoFile = ./apps/$(c)/package.json)
ifeq ($(shell if [ -f ./apps/$(c)/package.json ]; then echo "ok"; fi),)
	$(error "app > $(appBuildInfoFile) tidak ada.!")
endif
	$(eval appName := $(shell node -e 'console.log(require("$(appBuildInfoFile)").name) ?? "$(appId)"'))
	$(eval appId := $(shell node -e 'console.log(require("$(appBuildInfoFile)").appId ?? "$(subst /,-,$(c))")'))
	$(eval appVersion := $(shell node -e 'console.log(require("$(appBuildInfoFile)").version ?? "1.0.0")'))
	$(eval appDockerImage := $(shell node -e 'console.log(require("$(appBuildInfoFile)").dockerImage ?? "$(appId)")'))

build-app: init-app
	yarn install
	yarn nx run $(appId):build

start-app: init-app
	yarn nx run $(appId):serve

build-image: build-app
	cp -r ./docker/build-image/. ./dist/apps/$(c)
	DOCKER_BUILDKIT=1 docker build \
		--cache-from $(appDockerImage):latest \
		-t $(appDockerImage):$(appVersion) \
		./dist/apps/$(c)
	docker tag $(appDockerImage):$(appVersion) $(appDockerImage):latest

push-image: build-image
	docker push $(appDockerImage) --all-tags

enter-image: build-image
	docker run \
		--rm \
		-it \
		$(appDockerImage) \
		/bin/sh
