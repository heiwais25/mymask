#!/bin/bash

VERSION=$1
IMAGE_NAME=heiwais25/mymask:$VERSION
echo "Build mymask application version $VERSION"

rm -rf build
yarn build
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME
