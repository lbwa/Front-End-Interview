#!/bin/sh
git checkout master
git add .
git commit -m "$1"
git push -u origin master

echo '-- >> 分支 master 提交完成 << --'

gitbook build

# git checkout gh-pages
# cp -r _book/* .
# git add .
# git commit -m "$1"
# git push -u origin gh-pages
# git checkout master

# echo '-- >> 分支 gh-pages 部署完成 << --'

# ./deploy.sh 'info about commit'
# sh deploy.sh 'info about commit'

# 在 shell 中区分双引号和单引号
# 在 master 分支中无法通过 shell 复制 commit.sh 本身，提示权限不够，所以暂只有分开提交
