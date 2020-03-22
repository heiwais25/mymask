#!/bin/bash

if [[ ! $1 =~ v[0-9]*\.[0-9]*\.[0-9]* ]];then
    echo "Version should be format of v0.0.0"
    exit
fi

export REACT_APP_PUBLISH_VERSION=$1
export REACT_APP_PUBLISH_DATE="$(date -u)"



IMAGE_NAME=heiwais25/mymask:$REACT_APP_PUBLISH_VERSION
echo "Build mymask application version $REACT_APP_PUBLISH_VERSION"

rm -rf build
yarn build
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME


