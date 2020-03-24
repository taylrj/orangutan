ROOT_DIR ?= $(abspath ../../..)
include $(ROOT_DIR)/dev/base.makefile

build: clean build-dist
	@echo "$(P) Build public/ files"
	$(ROOT_BIN_DIR)/webpack

clean:
	@echo "$(P) Clean public/"
	$(ROOT_BIN_DIR)/rimraf public/

build-dist:
	@echo "$(P) Build scrollable image dist/ files"
	cd ../ && $(MAKE) build

dev: build-dist
	@echo "$(P) Running dev server on port 8080"
	NODE_ENV=development $(ROOT_BIN_DIR)/webpack-dev-server

.PHONY: dev build clean build-dist
