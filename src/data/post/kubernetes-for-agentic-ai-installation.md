---
publishDate: 2026-02-02T00:00:00Z
title: 'Kubernetes for Agentic AI: When Opinionated Tools Hit Their Limits'
excerpt: Our journey from MicroK8s to Kubespray - why building agentic AI platforms requires full control over networking and CNI configuration.
tags:
  - kubernetes
  - ai
  - networking
  - kubespray
  - microk8s
  - calico
  - kagent
metadata:
  canonical: https://kubekub.com/kubernetes-for-agentic-ai-installation
---

Building a Kubernetes platform for agentic AI isn't just about running containers. It's about creating secure, isolated environments with fine-grained network controls. This is the story of how we learned that lesson the hard way.

## The MicroK8s Beginning

We started with [MicroK8s](https://microk8s.io/) for our [Kagent](https://github.com/kagent-dev/kagent) platform. The pitch was compelling:

- 3-node cluster running in minutes
- Single command installation
- Batteries-included approach
- Perfect for rapid prototyping

And it delivered. Within an afternoon, we had a fully functional Kubernetes cluster with Calico networking, DNS, and storage. For initial development, it was perfect.

## The NetworkPolicy Wall

Agentic AI systems need zero-trust security. Kagent executes operations on your cluster based on natural language requests - it needs tight access controls. Our security model:

1. Default deny-all NetworkPolicies on every namespace
2. Explicit allow rules for each required connection
3. Layered security with OAuth2, RBAC, and network isolation

The implementation was straightforward:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-default
  namespace: kagent
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

Then add specific allow rules:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-kagent-to-kserve
  namespace: kagent
spec:
  podSelector:
    matchLabels:
      app: kagent
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kserve
    ports:
    - protocol: TCP
      port: 8080
```

## The Debugging Nightmare

One connection kept failing. Kagent couldn't reach a specific service, but logs showed nothing useful:

```
connection timeout: context deadline exceeded
```

Was it the NetworkPolicy? DNS? Service mesh? Certificate issues? We needed visibility.

### Enter Calico's Debugging Tools

Modern Calico (v3.30+) includes two powerful debugging features:

- **[Goldmane](https://docs.tigera.io/calico/latest/operations/comms/policy-recommendations)**: Analyzes traffic flows and recommends NetworkPolicy changes
- **[Whisker](https://docs.tigera.io/calico/latest/operations/comms/policy-tester)**: Tests whether specific traffic would be allowed or denied

These tools would have solved our problem in minutes. But there was a catch.

## The Opinionated Trap

MicroK8s installs Calico via a static YAML manifest:

```bash
$ microk8s kubectl get daemonset -n kube-system calico-node
NAME          DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE
calico-node   3         3         3       3            3
```

The version? Calico v3.25 - too old for Goldmane and Whisker.

"Just upgrade it," we thought. But MicroK8s's opinionated approach meant:

- No Helm chart to upgrade
- No operator to manage versions
- Manual YAML replacement that could break the entire cluster
- Official response: "Not supported" ([GitHub Issue #3837](https://github.com/canonical/microk8s/issues/3837))

The tool that got us running quickly now blocked us from production-grade debugging.

## The Kubespray Solution

We needed full control. Enter [Kubespray](https://github.com/kubernetes-sigs/kubespray) - Kubernetes installation the "hard way," but with all the knobs exposed.

### What Kubespray Gives You

Kubespray gives you a production-grade Kubernetes cluster with full control over:

- **CNI choice and version** - We installed Calico v3.31 using the tigera-operator
- **Component versions** - Pick Kubernetes version, etcd, container runtime
- **Configuration flexibility** - Every setting is configurable
- **Upgrade paths** - Documented, tested procedures for updates

The key difference: instead of being locked into static YAML manifests, we use the **tigera-operator** to manage Calico. Upgrading to get Goldmane and Whisker? Just update the operator version. No manual YAML surgery required.

### The Setup

We deployed Kubespray on 3 physical machines and installed Calico using the tigera-operator instead of static manifests.

Result: Full Kubernetes cluster with Calico v3.31, including Goldmane and Whisker debugging tools, with a clean upgrade path for future versions.

## Debugging Network Policies (Finally)

With Calico v3.31, we could now use Goldmane and Whisker to debug properly.

Kagent was failing to connect, logs showed timeouts but no clear indication of what was blocked:

![Kagent logs showing connection failures](/src/assets/images/post/kubernetes-for-agentic-ai-installation/argocd-error.png)

**Whisker** became our network policy testing tool. We could simulate connections before deploying policies, seeing exactly what would be allowed or denied. When Kagent couldn't reach the Kubernetes API, Whisker showed us precisely which rule was blocking it and on which port.

![Whisker showing denied connection to Kubernetes API on port 8443](/src/assets/images/post/kubernetes-for-agentic-ai-installation/whisker-deny.png)

The visualization made it clear: our NetworkPolicy was missing the egress rule to reach the Kubernetes API on port 8443. Without Whisker, we would have been guessing in the dark, trying different ports and protocols.

**Goldmane** complemented this by analyzing actual traffic patterns and recommending NetworkPolicy rules based on observed behavior - eliminating the guesswork entirely.

Problem identified in 2 minutes instead of 2 hours.

## The Development Setup: Minikube

For single-machine development on macOS, we use Minikube with the **vfkit driver**. This gives us full control over networking configuration - no preset limitations like other drivers.

We install the same tigera-operator and Calico v3.31, matching our production setup. Same NetworkPolicies, same debugging tools, same behavior - just on a laptop instead of three physical machines.

## Lessons Learned

### 1. **Opinionated is Great... Until It's Not**

MicroK8s's opinionated approach:
- ✅ Gets you running in minutes
- ✅ Perfect for learning and simple workloads
- ❌ Blocks advanced features
- ❌ Makes upgrades risky or impossible
- ❌ No escape hatch for edge cases

### 2. **Production AI Needs Production Kubernetes**

Agentic AI platforms have unique requirements:
- Zero-trust networking (NetworkPolicies everywhere)
- Advanced debugging (Goldmane, Whisker, flow logs)
- Custom CNI configuration
- Ability to upgrade components independently

You can't get this with batteries-included distributions.

### 3. **The "Hard Way" Isn't That Hard**

Kubespray provides:
- Ansible automation (not manual kubectl apply)
- Tested upgrade paths
- Production-grade defaults
- Full configuration flexibility

Trade-off: 30 minutes of setup instead of 5. Worth it for production workloads.


## Conclusion

For agentic AI platforms on Kubernetes:

1. **Start simple** - MicroK8s is great for learning
2. **Plan for production** - You'll need NetworkPolicies, advanced debugging, and version control
3. **Choose flexibility** - Kubespray gives you the control you'll eventually need
4. **Match environments** - Dev and prod should use the same CNI version
5. **Automate everything** - GitOps makes complex configurations manageable

The "easy" path works until it doesn't. For production AI platforms, invest in flexibility from the start.

## Resources

- [Kubespray](https://github.com/kubernetes-sigs/kubespray) - Production-grade Kubernetes deployment
- [Calico Documentation](https://docs.tigera.io/calico/latest/) - CNI plugin documentation
- [Minikube](https://minikube.sigs.k8s.io/) - Local Kubernetes for development

---

Questions? Reach out: [Contact us](https://kubekub.com/contact)
