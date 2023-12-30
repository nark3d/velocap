# Velocap

## Prerequisites

* Kubectl
* Minikube
* Docker


## Development

`make dev` - run the entire application locally

`make dev-nest` - run the API locally

`make dev-angular` - run the frontend locally

http://localhost:4200 - frontend

http://localhost:3000 - backend

## Running in MiniKube

### Build and deploy the application

```shell
make minikube
```

### Access the application

Frontend: `make access-app-service`

Backend: `make access-api-service`

### Redploy
```shell
make minikube-redeploy
```
