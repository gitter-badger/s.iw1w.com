#!/bin/sh

cd semantic && ../node_modules/.bin/gulp && cd ../ & ./node_modules/.bin/gulp watch & ./node_modules/.bin/webpack --watch