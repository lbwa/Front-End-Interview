#!/bin/sh
git checkout gh-pages
cp -r _book/* .
git add .
git commit -m "$1"
git push -u origin gh-pages
git checkout master

echo '-- >> 分支 gh-pages 部署完成 << --'

# 于 git bash 中输入 ./deploy.sh 'info about commit'
# 或者输入 sh deploy.sh 'info about commit'

# 在 shell 中区分双引号和单引号
