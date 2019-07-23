+++
title = "Istio on GKE, the managed service mesh on Google Cloud"
subtitle= "Review of the beta version."
date = "2019-07-22T10:50:46+02:00"
tags = ["kubernetes","istio","gke","google cloud","anthos","service mesh","Kiali","Prometheus","pulumi"]
categories = ["kubernetes","istio","gke","anthos"]
banner = "img/posts/istio-gke.png"
author = "Juan Carlos Garcia Pelaez"
+++

Istio is becoming one of the standards in the service mesh scenario. It is being developed and pushed by some of the giants of the industry like [IBM, Google or RedHat] (https://www.zdnet.com/article/ibm-google-red-hat-push-istio-to-1-0-release/) and now version 1.0 is going to celebrate its [first anniversary] (https://istio.io/about/notes/1.0/).

All major cloud providers are including a service mesh in their managed services, like AWS with it's [App Service Mesh] (https://aws.amazon.com/app-mesh/), [IBM with the managed Istio add-on] (https://cloud.ibm.com/docs/containers?topic=containers-istio) or Google Cloud with [Istio on GKE] (https://cloud.google.com/istio/docs/istio-on-gke/overview).

The [Istio on GKE] (https://cloud.google.com/istio/docs/istio-on-gke/overview) is still on beta and it's last release is marked [1.1.7-gke.0] (https://cloud.google.com/istio/docs/istio-on-gke/release-notes). The name convention for the istio on gke is to follow the version of istio plus a gke sufix and version.

## Installation

As it is a managed service the installation is pretty straightforward, in the "create GKE" menu of the console there is a new sub-menu for [Anthos] (https://cloud.google.com/anthos/docs/concepts/overview?hl=es-419) (The hybrid cloud solution of Google Cloud), and there we can enable Istio in our GKE cluster. There is only one possible action, the activation of the mTLS, with the options of permissive or Strict, with Strict mTLS will be enforced by default.
<br/><br/>
<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/create-gke-cluster-console.png">
</center>
<br/><br/>
In order to facilitate the re-installations and new environment creation, we have used for the demo the Infrastructure as Code software [Pulumi] (https://www.pulumi.com/docs/index.html), this tool uses the same approach for resource creation than Terraform but with real code.

The GKE provider of Pulumi also allows the activation of Istio on GKE with the addonsConfig parameter:

```Javascript
import * as gcp from "@pulumi/gcp";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { nodeCount, nodeMachineType, password, username, installManagedIstio } from "./config";

// Find the latest engine version.
const engineVersion = gcp.container.getEngineVersions().then(v => v.latestMasterVersion);

// Create the GKE cluster and export it.
var istioConfigDisabled = !installManagedIstio
export const addonsConfig = {
    istioConfig: {        
        disabled: istioConfigDisabled
    }, 
    networkPolicyConfig: {
        disabled: false        
    }
}

export const k8sCluster = new gcp.container.Cluster("gke-cluster", {
    initialNodeCount: nodeCount,
    nodeVersion: engineVersion,
    minMasterVersion: engineVersion,
    masterAuth: { username, password },
    addonsConfig: addonsConfig,
    nodeConfig: {
        machineType: nodeMachineType,
        oauthScopes: [
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring"
        ],
    },
});
```

Adding this addonsConfig code to the example provided by pulumi (https://github.com/pulumi/examples/tree/master/gcp-ts-gke) we can spin up and of rapidly GKE environments (only we need to wait for the creation of the cluster in GCP). Running the ```pulumi up``` instruction we can create a GKE with Istio on it.

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/gke-pulumi-up.png">
</center>
<br/><br/>
Once the cluster is up and running, we can check that there is a namespace called "istio-system" which is the standard namespace for istio. In this namespace can be found all the control plane components needed for istio such citadel, pilot, policy, etc.

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/gke-istio-namespace.png">
</center>
<br/><br/>
The Istio on GKE managed service is particular in the sense as we are able to access to the containers and the namespace, in other managed services, such Cloud SQL or the GKE service, it is not possible to access to the servers, in this case as we get admin access, we can delete everything on it... 
So the firsth this we did was to delete the deployments using ```kubectl delete deploy --all -n istio-system```. 

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/gke-delete-istio-deployments.png">
</center>

And all the deployment and pods get erased. The same for the namespace, with ```kubectl delete ns istio-system``` the namespace got deleted, and the istio disapeared from the cluster...

...but, in less than one minute the **istio-system was back** with all the deployments and configuration, that makes it a real managed service as it can **recover itself**.

## Pricing

The istio on GKE does not come directly with extra charge from Google Cloud, but the workloads are executed on your cluster, that means that will need compute and memory for it, and that will be the price of using the Istio on GKE, as more namespaces uses istio, more memory and cpu will need the istio control plane from the cluster. 

## Use of istio on GKE

Once installed Istio, the first test we always do is to try the Istio examples, in concrete the book info example. Downloading the [istio package from Github] (https://github.com/istio/istio/tree/release-1.2) and with the execution the playbooks for the installation.

```
kubectl label namespace default istio-injection=enabled
kubectl apply -f istio/samples/bookinfo/platform/kube/bookinfo.yaml
kubectl apply -f istio/samples/bookinfo/networking/bookinfo-gateway.yaml
```

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/bookinfo-in-gke.png">
</center>

All the bookinfo microservices where deployed, and every pod of the bookinfo had the envoy started as a sidecar container in every pod. After some checks and test, we can say that everything was running smoothly in the cluster for the Istio.

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/bookinfo-in-gke-homepage.png">
</center>


### Service mesh visualization: Kiali

Once we have Istio installed, we will need to be able to monitor and have a good UI for the service Mesh. It's a very complex system and we need to have a human readable data for it. There is where **Kiali** comes out, it is a tool for Service mesh observability and configuration and an OpenSource project.

It is not yet part of the Istio on GKE offering, that means we need to do a manual installation of it in the GKE. We followed the installation instruction in the [Kiali documentation website] (https://www.kiali.io/documentation/getting-started/#_advanced_install_operator_only).

```
bash <(curl -L https://git.io/getLatestKialiOperator)
```
The installer will prompt for installing Kiali without authentication or with, and the administrator user name and password. 
The installation without authentication can be used for example for **adding a proxy server** with an authentication such an oauth proxy.
This script creates a new namespace called "kiali-operator", and once the operator is installed it manages the installation and upgrades of Kiali. Kiali will be automatically installed in the "istio-system" namespace.  

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istio-on-gke/kiali-operator-installation.png">
</center>

Once Kiali is installed, the quickest way to access the console is to create a tunnel using the ```port-forward``` feature of kubectl.

```bash
kubectl port-forward kiali 2000 -n istio-system
```

<center>
<table><tr><td>
<img class="special-img-class" width="99%" src="/img/posts/managed-istio-on-gke/kiali-port-forward.png">
</td><td>
<img class="special-img-class" width="99%" src="/img/posts/managed-istio-on-gke/kiali-error-prometheus.png">
</td></tr></table>
</center>

The Kiali console shows an error for the **Prometheus** installation. In Istio on GKE is not installed by default. The Istio on GKE official documentation explains [how to add Prometheus to Istio] (https://cloud.google.com/istio/docs/istio-on-gke/installing#adding_prometheus) with the command ```curl https://storage.googleapis.com/gke-release/istio/release/istio-version/patches/install-prometheus.yaml
 | kubectl apply -n istio-system -f -````.

This is really a missing point in the Beta, as this installation is **not part of the managed service**, and if it fails we will not now it. We hope there will be an option to automatically install Prometheus as part of the managed service (as well Kiali).

Once it is installed we can enter the console and see the applications running on the cluster.


For testing the traffic on the application we run an script in our makefile with a couple of calls to the apis in an infinite loop:

```makefile
call-app: ## install-prometheus
	@echo  $(INGRESS_HOST)
	curl -s http://${GATEWAY_URL}/api/v1/products
	curl -s http://${GATEWAY_URL}/productpage | grep -o "<title>.*</title>" && $(MAKE) call-app 	
```

And we go to one of the most interesting parts of Kiali, were traffic can be seen on real time for every microservice, the graph menu:

<table><tr><td>
<img class="special-img-class" width="99%" src="/img/posts/managed-istio-on-gke/kiali-error-no-display-relations.png">
</td><td>
<img class="special-img-class" width="99%" src="/img/posts/managed-istio-on-gke/kiali-istio-version-error.png">
</td></tr></table>
</center>

The is no data between the relations (even waiting 5 minutes) and we can observe the error "Unknow istio implementation version". This error makes almost Kiali unusable, as the only feature that can be used is the edition of yaml files of Istio, as its editor works fine.

### Installing Istio with helm

Once tested the managed service of Istio with Kiali, we have tested the Istio Opensource version installation (not managed) on GKE to check if Kiali can work with the Opensource version. Following Istio installation instructions:

```bash
helm repo add istio.io https://storage.googleapis.com/istio-release/releases/1.2.2/charts/
kubectl apply -f install/kubernetes/helm/helm-service-account.yaml
helm init --service-account tiller
helm install install/kubernetes/helm/istio-init --name istio-init --namespace istio-system
helm install install/kubernetes/helm/istio --name istio --namespace istio-system --set kiali.enabled=true
```

We can have running Istio on GKE, without being a managed service, but with all components directly installed. This script install all Istio components with Prometheus and Kiali. We had to adjust the requested cpu from the Istio components written by default in the Helm chart, as the requeriments where quite high.

Doing the same operations as before, installing the bookinfo app, everything works smoothly, and we get in kiali all traffic and features working in GKE, but losing the managed service.

<iframe width="560" height="315" src="https://www.youtube.com/embed/UKrOYrjf3LA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Used versions

* Gke on istio with Prometheus tested with version [1.0.6-gke.3] (https://storage.googleapis.com/gke-release/istio/release/1.0.3-gke.3/patches/install-prometheus.yaml) and [1.1.3-gke.0] (https://storage.googleapis.com/gke-release/istio/release/1.0.6-gke.3/patches/install-prometheus.yaml
)
* Kubernetes 1.13.7-gke.8 and 1.12.8-gke.10
* [Istio opensource 1.2] (https://github.com/istio/istio/tree/release-1.2)

## Conclusions

It's really good that the big cloud providers are hardly working on **managed Service mesh** systems. The number of components of a service mesh and **complexity** is really high, and companies doesn't want to deal with this complexity and really focus on their bussiness and that microservices are just working well and to have the tools to manage this complexity.
The Istio on GKE is still on beta and still missing features like a managed Prometheus and Kiali, but it is a good start point to use Istio.

As we consider a totally necesary to have a visualization of the mesh, we would **not use yet the manaked Istio on production**, ando would use the OpenSource to get all the power of Kiali visualizations, and hoping it will come soon in the next releases.


## References

* https://cloud.google.com/istio/docs/istio-on-gke/overview
* https://www.kiali.io/documentation/getting-started/#_install_kiali_via_istio_or_maistra
* https://istio.io/docs/

## Thanks / Contributions

### Medium

The article can also be viewed on [kubekub medium blog](https://medium.com/@juancarlosgpelaez/istio-on-gke-the-managed-service-mesh-on-google-cloud-c069a5c11a11)

### Github

* The source code of the article is in github repo: git@github.com:kubekub/kubekub-gke-managed-istio.git
* The article is also in a github repo https://github.com/kubekub/kubekub.com
* You can contribute to the github repo: git@github.com:kubekub/kubekub-gke-managed-istio.git creating "pull requests".
* If it seems useful code you can favourite it in [GitHub] (git@github.com:kubekub/kubekub-gke-managed-istio.git)
* Or visit me on my linkedin page: https://www.linkedin.com/in/juancarlosgpelaez/
