#!/bin/bash

npm install
npm run clean:dist
npm run build
npm run start:build

