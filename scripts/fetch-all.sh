#!/usr/bin/env bash
set -euo pipefail

git clone git@github.com:gmorikawa/friendzone.git friendzone
git clone --branch develop git@github.com:gmorikawa/friendzone-core.git friendzone/api
git clone --branch develop git@github.com:gmorikawa/friendzone-web.git friendzone/app
