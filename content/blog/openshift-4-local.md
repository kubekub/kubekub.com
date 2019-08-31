+++
title = "Run OpenShift 4.x locally"
subtitle= "New "
date = "2019-08-31T16:30:46+02:00"
tags = ["OpenShift","Kubernetes","Red Hat"]
categories = ["OpenShift","Kubernetes"]
author = "Juan Carlos Garcia Pelaez"
banner = "img/posts/openshift-4-local/Red-Hat-OpenShift.png"
+++

After some finding and waiting, we can have a way of locally test OpenShift 4 in our local machines. Thanks to an update to the post in the great article about the [differences between OpenShift and Kubernetes](https://cloudowski.com/articles/10-differences-between-openshift-and-kubernetes/) we discovered that there is a replacement for Minishift and the "oc cluster up" command, not working for OpenShift 4.
The only ways to test OpenShift 4 was with an installation in the cloud or the OpenShift online testing version (only free for a month).

The [crc project](https://code-ready.github.io/crc/) gives us a new tool for launching an OpenShift 4x cluster in your local machine. We have tested it on a Windows Machine. The first try was with VirtualBox, with no success, but it worked with hyper-v, the default virtual machine driver.

Once we have downloaded the crc executable file, we only need to execute the two commands:

```
crc setup
crc start
```

The command will require access to a download token, with a free RedHat developer subscription you can have it.

Once started, the cluster will be accessible on https://console-openshift-console.apps-crc.testing

In the clean installation we can observe a big number of projects created by default (46 projects).

<center>
<img class="special-img-class" width="100%" src="/img/posts/openshift-4-local/openshift-projects.png">
</center>

Not everything is running, for example the monitoring is not enabled by default, we have to start all deployments in the project "OpenShift monitoring" (img/posts/openshift-4-local/openshift-monitoring.png)

<center>
<img class="special-img-class" width="100%" src="/img/posts/openshift-4-local/openshift-monitoring.png">
</center>

<center>
<img class="special-img-class" width="100%" src="/img/posts/openshift-4-local/prometheus-alerts.png">
</center>


<center>
<img class="special-img-class" width="100%" src="/img/posts/openshift-4-local/openshift-alerts.png">
</center>
