#!/bin/bash
git status
git add -A
git commit -m $1
git pull origin master
git push origin master