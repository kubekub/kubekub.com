---
publishDate: 2026-01-16T00:00:00Z
title: 'Securing Kagent with Zero Trust: OAuth2 + Keycloak + GitOps'
excerpt: How we automated zero-trust authentication for Kagent, a Kubernetes AI agent, using OAuth2 Proxy, Keycloak, and Crossplane - all GitOps managed.
tags:
  - kagent
  - ai
  - kubernetes
  - security
  - keycloak
  - oauth2
metadata:
  canonical: https://kubekub.com/protect-kagent-with-oauth2-proxy
---

[Kagent](https://github.com/kagent-dev/kagent) is a Kubernetes AI agent Platform that executes natural language requests on your cluster. This power requires careful access control and security.

We built a fully automated, zero-trust authentication system using OAuth2 Proxy, Keycloak, and Crossplane. Everything is GitOps-managed - no manual admin console configuration.

We have a [complete working example](https://github.com/kubekub/kagent-oauth2-proxy-example) ready to deploy.

## Why Protection Matters

Kagent can execute operations on your cluster. It can create, modify, and delete resources. It can read logs and configurations. Without proper access control, anyone could use it to compromise your infrastructure.

Traditional VPNs don't solve this - they just grant blanket network access to everyone. You need authentication and authorization at the application level.

## The Solution

A Helm chart that deploys:
- **OAuth2 Proxy**: Authentication gateway
- **Keycloak**: Identity provider and role management
- **Crossplane**: Infrastructure-as-code for Keycloak configuration
- **Gateway API**: TLS termination and routing

All managed via GitOps. Push to git, infrastructure updates automatically.

## How It Works

1. User accesses `https://kagent.lab1.kubekub.com`
2. Gateway API terminates TLS and routes to OAuth2 Proxy
3. OAuth2 Proxy checks for valid session, redirects to Keycloak if needed
4. Keycloak authenticates the user and issues an access token with roles
5. OAuth2 Proxy validates the token and checks for required role
6. If authorized, user can access kagent
7. All access is logged in Keycloak

## Infrastructure as Code

Keycloak resources are defined as Kubernetes resources - realms, clients, roles, and protocol mappers all in YAML. Crossplane manages them the same way as any other Kubernetes object.

Client secrets are automatically written to Kubernetes secrets. No manual credential management.

## Deployment

One Helm install command deploys everything: Crossplane resources, OAuth2 Proxy configuration, secrets management, and Gateway API setup.

Users get access by assigning them the `kagent-user` role in Keycloak, or by defining them as Kubernetes resources.

## Benefits

- ✅ Authentication via OIDC in the browser
- ✅ Role-based access control at the application level
- ✅ All access logged in Keycloak
- ✅ Configuration versioned in git, no manual admin console work
- ✅ Same deployment across dev, staging, and production
- ✅ Easy rollback - just revert a git commit
- ✅ Users access from anywhere - no VPN required

## Actually Getting Started

We didn't just talk about it - there's a **working example** you can actually use: [kubekub/kagent-oauth2-proxy-example](https://github.com/kubekub/kagent-oauth2-proxy-example).

It's got:
- A Helm chart that's ready to go
- All the Crossplane stuff for Keycloak
- Gateway API wired up
- OAuth2 Proxy configured
- Docs and troubleshooting

**The quick version:**

```bash
# Clone it
git clone https://github.com/kubekub/kagent-oauth2-proxy-example
cd kagent-oauth2-proxy-example

# Deploy it
helm install kagent-auth . --namespace kagent --create-namespace

# Add some users and you're done
```

Head to the [README](https://github.com/kubekub/kagent-oauth2-proxy-example#readme) for all the details - setup, config, adding users, fixing stuff if it breaks, all of it.

---

**Kubekub** - we build Kubernetes platforms that actually work, with a focus on AI tools and making ops simpler.
