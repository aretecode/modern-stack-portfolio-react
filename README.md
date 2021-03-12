# modern-stack-portfolio-react
[![Build Status](https://travis-ci.org/aretecode/modern-stack-portfolio-react.svg?branch=master)](https://travis-ci.org/aretecode/modern-stack-portfolio-react)
<!-- [![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/aretecode/modern-stack-portfolio-react) -->

See it live at [jameswiens.dev](https://jameswiens.dev)

![](https://user-images.githubusercontent.com/4022631/56465430-a3cd1b00-63b1-11e9-8f6f-1f7613a6552e.png)

This is the [react](https://reactjs.org) part of the [modern stack portfolio](https://github.com/aretecode/modern-stack-web-portfolio)
also see the [graphql part](https://github.com/aretecode/modern-stack-portfolio-graphql)


## Docker
1. `yarn build`
2. `docker build .`
3. `docker tag __TAG__ aretecode/modern-stack-portfolio-react:v__VERSION__`
4. `docker push aretecode/modern-stack-portfolio-react:v__VERSION__`
5. `docker run -d -p 3333:3000 __TAG__`

##### Related
- [Docker run](https://docs.docker.com/engine/reference/run/)
- [Medium - A better way to develop nodejs with docker](https://hackernoon.com/a-better-way-to-develop-node-js-with-docker-cd29d3a0093)

##### Kitematic
- [Install Kitematic](https://github.com/docker/kitematic/releases)

> use `command + r` to refresh

##### Minikube
- [Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
