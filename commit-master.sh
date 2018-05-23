#!/bin/sh
git checkout master
git add .
git commit -m "$1"
git push -u origin master

echo '-- >> 分支 master 提交完成 << --'
