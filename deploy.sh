#!/bin/sh

# 确保脚本抛出遇到的错误
set -e

yarn run build
cd docs/.vuepress/dist

git add -A
git commit -m "$1"
git push -f git@github.com:lbwa/lbwa.github.io.git master

echo '-- >> 分支 master 部署完成 << --'

# 在 shell 中区分双引号和单引号
