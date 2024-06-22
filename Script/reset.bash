#!/bin/bash

PROJECT_NAME="$1" 

docker compose --project-name $PROJECT_NAME down

docker compose --project-name $PROJECT_NAME down -v

docker compose --project-name $PROJECT_NAME rm -f

docker compose --project-name $PROJECT_NAME network prune -f
