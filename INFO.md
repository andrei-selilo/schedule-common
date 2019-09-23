# Setting up environment
- Create AWS environment via terraform
- Server and Client setup (.env, docker(and dockerfile requirements) )
- CircleCI environment variables (*_{STAGE})
- Telleroo account, webhooks
- Twillio account, webhooks, add permisions to send responces

# Commands
# Docker

## Environment
https://finnian.io/blog/rapid-development-with-node-js-and-docker/

## Push docker image to ECR

From: https://dzone.com/articles/deploying-docker-containers-to-aws-ecs

1. Connect your local Docker client with your Docker credentials in ECS:
"`aws ecr get-login --region eu-west-2 --no-include-email`"
2. Copy and paste the Docker login command from the previous step. (This will log you in for 24 hours)
    2.1 To log out "`docker logout`"
3. Tag your image locally ready to push to your ECS repository – use the repo URI from the first step:
  "`docker tag <image_id> <ecs-repo-uri>`"
  The example command in the docs looks like this:
  "`docker tag e9ae3c220b23 aws_account_id.dkr.ecr.region.amazonaws.com/repository-name`"
4. Push the image to your ECS repo with (where image-tag-name is the same as the tag name above):
  "`docker push <image-tag-name>`"

## Open container with bash
### Local
`docker exec -it <container_id> sh`

## Remove untaggeg images
`docker rmi $(docker images | grep "^<none>" | awk "{print $3}")`

## DB
### delete schema
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
