APPLICATION_NAME ?= client_ui
 
build:
	docker build --tag ${APPLICATION_NAME}:test .
run:
	docker run -d --rm --name ${APPLICATION_NAME} -p 4200:80 -p 4243:443 ${APPLICATION_NAME}:test
