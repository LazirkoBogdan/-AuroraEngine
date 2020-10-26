#!/usr/bin/env sh

set -e

GAME_NAME=$1
API_NAME=$2

REPOSITORY_NAME="symphony-solutions-games"
REPOSITORY_URL="$AWS_ECR_HOST/$REPOSITORY_NAME"
IMAGE_TAG="$GAME_NAME-$CI_COMMIT_SHORT_SHA"

echo "Building image..."
docker build --build-arg game_name="$GAME_NAME" --build-arg api_name="$API_NAME" -t "$REPOSITORY_URL:$IMAGE_TAG" .

echo "Pushing image..."
docker push "$REPOSITORY_URL:$IMAGE_TAG"

curl -s -X POST https://keel.bwacloud.pw/v1/webhooks/native -H 'Content-Type: application/json' -H 'Host: keel.bwacloud.pw' -d "{ \"name\": \"$REPOSITORY_URL\", \"tag\": \"$IMAGE_TAG\" }" > /dev/null
