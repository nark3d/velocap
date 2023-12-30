DOCKER_IMAGE_APP_NAME=velocap-app
DOCKER_IMAGE_API_NAME=velocap-api
DOCKER_IMAGE_MYSQL_NAME=mysql
DOCKER_TAG=latest
DOCKERFILE_APP_PATH=apps/velocap/dockerfile
DOCKERFILE_API_PATH=apps/api/dockerfile
MYSQL_DEPLOYMENT_PATH=velocap-mysql-deployment.yaml
NAMESPACE=default

dev-angular:
	nx serve velocap

dev-nest:
	nx serve api

dev:
	nx run-many --target=serve --projects=velocap,api --parallel -c development

build-app-docker:
	eval $$(minikube docker-env) && \
	docker build -t $(DOCKER_IMAGE_APP_NAME):$(DOCKER_TAG) -f $(DOCKERFILE_APP_PATH) .

build-api-docker:
	eval $$(minikube docker-env) && \
	docker build -t $(DOCKER_IMAGE_API_NAME):$(DOCKER_TAG) -f $(DOCKERFILE_API_PATH) .

apply-app-k8s:
	kubectl apply -f velocap-app-deployment.yaml -n $(NAMESPACE)

apply-api-k8s:
	kubectl apply -f velocap-api-deployment.yaml -n $(NAMESPACE)

deploy-mysql:
	kubectl apply -f $(MYSQL_DEPLOYMENT_PATH) -n $(NAMESPACE)

delete-app-k8s:
	kubectl delete -f velocap-app-deployment.yaml -n $(NAMESPACE)

delete-api-k8s:
	kubectl delete -f velocap-api-deployment.yaml -n $(NAMESPACE)

start-minikube:
	minikube start

stop-minikube:
	minikube stop

delete-minikube:
	minikube delete && \
	rm -rf ~/.minikube

access-app-service:
	minikube service $(DOCKER_IMAGE_APP_NAME)-service --namespace $(NAMESPACE)

access-api-service:
	minikube service $(DOCKER_IMAGE_API_NAME)-service --namespace $(NAMESPACE)

clean-app: delete-app-k8s
clean-api: delete-api-k8s
clean: clean-app clean-api stop-minikube

minikube: start-minikube build-api-docker build-app-docker deploy-mysql apply-api-k8s apply-app-k8s
minikube-redeploy: stop-minikube delete-minikube minikube

.PHONY: build-app-docker build-api-docker apply-app-k8s apply-api-k8s delete-app-k8s delete-api-k8s start-minikube stop-minikube access-app-service access-api-service deploy-app deploy-api deploy-all clean-app clean-api clean
