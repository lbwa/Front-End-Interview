#!/bin/sh

# 确保脚本抛出遇到的错误
set -e

# 用于手动部署
yarn run build
cd docs/.vuepress/dist

# 必须创建一个 子 repo，确保只提交 dist 目录下的文件至 gh-pages 分支中
git init
git add -A
git commit -m "$1"

# 用于手动部署
# -f 即 --force 强制推送，即使有冲突
git push -f git@github.com:lbwa/front-end-interview.git master:gh-pages

# 用于 CI scirpt 部署
# 在 CI 后台的 enviroment variables 中设置 GITHUB_TOKEN 为 Personal access tokens
# Personal access tokens 在 账号 dev settings 中被创建

#git push -f https://${GITHUB_TOKEN}@github.com/lbwa/lbwa.github.io.git master:gh-pages

echo '-- >> 分支 master 部署完成 << --'

# 回到之前所在目录
cd -

# 在 shell 中区分双引号和单引号
