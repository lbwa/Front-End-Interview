#!/bin/sh
git add .
git commit -m "$1"
git push origin master

echo '-- >> 分支 master 提交完成 << --'
