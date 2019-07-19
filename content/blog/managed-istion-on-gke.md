+++
title = "Managed istio on Google Kubernetes Engine (GKE)."
subtitle= "Testing the beta version."
date = "2019-07-16T10:50:46+02:00"
tags = ["kubernetes","istio","gke","google cloud","anthos","service mesh","pulumi"]
categories = ["kubernetes","istio","gke","anthos"]
banner = "img/posts/istio-gke.png"
author = "Juan Carlos Garcia Pelaez"
+++

Istio is becoming one of the standards in the service mesh scenario. Since it is being developed and push by some of the giants of the industry like [IBM, Google or RedHat] (https://www.zdnet.com/article/ibm-google-red-hat-push-istio-to-1-0-release/) and now version 1.0 is going to celebrate its [first anniversary] (https://istio.io/about/notes/1.0/).

All major cloud providers are including a service mesh in their managed services, AWS with it's [App Service Mesh] (https://aws.amazon.com/app-mesh/) or google cloud with [Istio on GKE] (https://cloud.google.com/istio/docs/istio-on-gke/overview).

The [Istio on GKE] (https://cloud.google.com/istio/docs/istio-on-gke/overview) is still on beta and it's last release is marked [1.1.7-gke.0] (https://cloud.google.com/istio/docs/istio-on-gke/release-notes). The name convention for the istio on gke is to follow the version of istio plus a gke sufix and version.

##  Installation

As it is a managed service the installation is pretty straightforward, in the "create GKE" menu of the console there is a new submenu for Anthos (The hybrid cloud solution of Google Cloud), and there we can enable Istio in our GKE cluster. There is only one action for activation of the mTLS, with the options of permissive or Strict, with Strict mTLS will be enforced by default.

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istion-on-gke/create-gke-cluster-console.png">
</center>

In order to facilitate the reinstallations and new environment creation, we have used for the demo the Infrastructure as Code software [Pulumi] (https://www.pulumi.com/docs/index.html), this tool uses the same approach for resource creation than terraform but with real code.

The GKE provider of Pulumi also allows the activation of Istio on GKE with the addonsConfig parameter:

```Typescript
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
<img class="special-img-class" width="100%" src="/img/posts/managed-istion-on-gke/gke-pulumi-up.png">
</center>

Once the cluster is up and running we can check that there is a namespace called "istio-system" which is the standard namespace for istio. In this namespace can found all the control plane components needed for istio such citadel, pilot, policy, etc.

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istion-on-gke/gke-istio-namespace.png">
</center>

The Istio on GKE managed service is particular in the sense as we are able to access to the containers and the namespace, other managed service such Cloud SQL or the GKE service, it is not possible to access to the servers, in this case as we get admin access we can delete everything on it... So the firsth this we did was to delete the deployments using ```kubectl delete deploy --all -n istio-system```. 

<center>
<img class="special-img-class" width="100%" src="/img/posts/managed-istion-on-gke/gke-delete-istio-deployments.png">
</center>









<!--
For kiali is needed prometheus to be added.

https://cloud.google.com/istio/docs/istio-on-gke/installing#adding_prometheus

Disabling istio in the console, makes the cluster unavaliable


### versions

https://storage.googleapis.com/gke-release/istio/release/1.0.3-gke.3/patches/install-prometheus.yaml

https://storage.googleapis.com/gke-release/istio/release/1.1.3-gke.0/patches/install-prometheus.yaml
1.1.7-gke.0

https://storage.googleapis.com/gke-release/istio/release/1.0.6-gke.3/patches/install-prometheus.yaml

## Conclusions

-->



## References

https://cloud.google.com/istio/docs/istio-on-gke/overview
https://www.kiali.io/documentation/getting-started/#_install_kiali_via_istio_or_maistra

## Medium

<!--
The article can also be viewed on [kubekub medium blog](https://medium.com/kubekub/kubernetes-certificates-f22649263023)
-->
## Thanks / Contributions

<!--
- You can contribute to the github repo: https://github.com/jgpelaez/docker-wso2-esb creating "pull requests"
-  If it seems useful code you can favourite it in:
  [GitHub] (https://github.com/jgpelaez/docker-wso2-esb/stargazers)
  -->
- Or visit me on my linkedin page: https://www.linkedin.com/in/juancarlosgpelaez/