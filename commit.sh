#!/bin/sh
git checkout master
git add .
git commit -m "$1"
git push -u origin master

echo '-- >> 分支 master 提交完成 << --'

# git checkout gh-pages
# cp -r _book/* .
# git add .
# git commit -m "$1"
# git push -u origin gh-pages
# git checkout master

gitbook build
git subtree push --prefix _book origin gh-pages
echo '-- >> 分支 gh-pages 部署完成 << --'

# 于 git bash 中输入 ./deploy.sh 'info about commit'
# 或者输入 sh deploy.sh 'info about commit'

# 在 shell 中区分双引号和单引号
# 在 master 分支中无法通过 shell 提交 gh-pages 分支修改，提示权限不够，所以暂只有分开提交
