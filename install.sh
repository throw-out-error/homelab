#!/bin/bash

curl -L https://get.docker.com | bash
curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

curl -L https://raw.githubusercontent.com/throw-out-error/homelab/master/setup.sh | bash