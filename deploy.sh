#!/bin/sh

# 确保脚本抛出遇到的错误
set -e

# 用于手动部署
yarn run build
cd docs/.vuepress/dist

# 创建一个 子 repo，只提交 dist 目录下的文件至 gh-pages 分支中
git init
git add -A
git commit -m "$1"

# 二选一
# 用于 CI 部署
# git push origin master

# 用于手动部署
git push -f git@github.com:lbwa/front-end-interview.git master:gh-pages

echo '-- >> 分支 master 部署完成 << --'

# 回到之前所在目录
cd -

# 在 shell 中区分双引号和单引号
