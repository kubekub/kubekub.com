---
publishDate: 2026-01-16T00:00:00Z
title: 'Securing Kagent with Zero Trust: OAuth2 + Keycloak + GitOps'
excerpt: How we automated zero-trust authentication for Kagent, a Kubernetes AI agent, using OAuth2 Proxy, Keycloak, and Crossplane - all GitOps managed.
image: https://images.unsplash.com/photo-1677442d019cecf8315c0e6e6eab4b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
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

[Kagent](https://github.com/kagent-dev/kagent) is a powerful Kubernetes AI agent - it understands natural language and can execute cluster operations. That power means it needs security.

We built a fully automated, zero-trust authentication system to protect kagent without VPNs, using OAuth2 Proxy, Keycloak, and Crossplane. **Everything is GitOps-managed** - no manual configuration.

## Why Kagent Needs Protection

Kagent is a Kubernetes AI agent. It's powerful - it understands natural language commands and can execute operations on your cluster. This power requires careful access control:

- **Sensitive operations**: Can create, update, delete resources
- **Information access**: Can read cluster state, logs, configurations
- **Audit requirements**: Need to track who did what and when
- **Zero trust**: No implicit access based on network location

Traditional VPNs don't solve this. They give blanket network access, not application-level authentication and authorization.

## The Solution: Automated Zero Trust

We built a Helm chart that deploys everything needed:
- **OAuth2 Proxy**: Authentication gateway
- **Keycloak**: Identity provider with role management
- **Crossplane**: Infrastructure-as-code for Keycloak configuration
- **Gateway API**: TLS termination and routing

All managed via GitOps. No manual admin console clicks.

## How It Works

User → TLS Gateway → OAuth2 Proxy → Keycloak Login → Role Check → Kagent

1. **User requests** `https://kagent.lab1.kubekub.com`
2. **Gateway API** terminates TLS and routes to OAuth2 Proxy
3. **OAuth2 Proxy** checks for valid session (if none, redirects to Keycloak)
4. **Keycloak** authenticates the user and issues an access token with roles
5. **OAuth2 Proxy** validates the token and checks for `kagent-user` role
6. **Access granted** - user can interact with kagent
7. **All access logged** in Keycloak for audit trails

## Crossplane: Keycloak as Code

Instead of clicking through Keycloak's admin console, we define everything in YAML:

**Realm (one kubectl apply):**
```yaml
apiVersion: realm.keycloak.m.crossplane.io/v1alpha1
kind: Realm
metadata:
  name: kagent
spec:
  forProvider:
    realm: kagent
    displayName: "Kagent Realm"
    enabled: true
  providerConfigRef:
    name: keycloak-provider-config
```

**OAuth2 Client (with auto-generated secret):**
```yaml
apiVersion: openidclient.keycloak.m.crossplane.io/v1alpha1
kind: Client
metadata:
  name: oauth2-proxy
spec:
  forProvider:
    realmIdRef:
      name: kagent
    clientId: oauth2-proxy
    accessType: CONFIDENTIAL
    validRedirectUris:
      - "https://kagent.lab1.kubekub.com/oauth2/callback"
  writeConnectionSecretToRef:
    name: oauth2-proxy-keycloak-secret
```

**Role:**
```yaml
apiVersion: role.keycloak.m.crossplane.io/v1alpha1
kind: Role
metadata:
  name: kagent-user
spec:
  forProvider:
    realmId: kagent
    name: kagent-user
```

The client secret is automatically written to a Kubernetes secret. OAuth2 Proxy consumes it. No manual credential management.

## OAuth2 Proxy Configuration

Simple and straightforward:

```yaml
oauth2-proxy:
  enabled: true
  extraArgs:
    provider: keycloak-oidc
    oidc-issuer-url: https://auth.lab1.kubekub.com/realms/kagent
    redirect-url: https://kagent.lab1.kubekub.com/oauth2/callback
    allowed-role: kagent-user  # Only this role gets access
    upstream: http://kagent-ui.kagent.svc.cluster.local:8080
```

The `allowed-role` parameter enforces RBAC - users without `kagent-user` role are denied access.

## TLS & Routing with Gateway API

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: kagent
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  gatewayClassName: istio
  listeners:
  - name: https
    port: 443
    protocol: HTTPS
    hostname: kagent.lab1.kubekub.com
    tls:
      mode: Terminate
      certificateRefs:
      - name: kagent-server-cert
```

Cert-manager automatically provisions Let's Encrypt certificates. HTTPRoute resources handle HTTP→HTTPS redirects and traffic routing.

## Deployment & User Management

Deploy with a single command:

```bash
helm install kagent-auth ./kagent-auth --namespace kagent --create-namespace
```

Or via ArgoCD for full GitOps:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: kagent-auth
spec:
  source:
    repoURL: https://github.com/kubekub/kubekub-ai-lab
    path: helm/cluster/tools/ai/kagent-auth
  destination:
    namespace: kagent
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

**Adding users to Kagent:**

Simply assign the `kagent-user` role to users in Keycloak. They immediately gain access. Or define users declaratively:

```yaml
apiVersion: user.keycloak.m.crossplane.io/v1alpha1
kind: User
metadata:
  name: alice
spec:
  forProvider:
    realmId: kagent
    username: alice@example.com
    enabled: true
---
apiVersion: user.keycloak.m.crossplane.io/v1alpha1
kind: UserRole
metadata:
  name: alice-kagent-user
spec:
  forProvider:
    realmId: kagent
    userId: alice
    roleName: kagent-user
```

## Key Benefits

**Security:**
- ✅ No VPN complexity - browser-based OAuth2/OIDC
- ✅ Fine-grained RBAC at the application level
- ✅ All access events logged in Keycloak
- ✅ TLS 1.3 everywhere

**Operations:**
- ✅ Everything in git - no admin console clicks
- ✅ Easy repeatable deployments
- ✅ Simple rollback (just revert git commits)
- ✅ Works across dev, staging, production

**User Experience:**
- ✅ No VPN client software needed
- ✅ SSO across all protected services
- ✅ Works on mobile and any device with a browser

## Prerequisites

- Kubernetes 1.24+
- Crossplane v1.0+
- Crossplane Keycloak Provider v2.12.1+
- External Secrets Operator
- Keycloak instance running
- Gateway API support (Istio, Envoy Gateway, etc.)
- Cert-manager for TLS

## What We've Learned

**Advantages:**
- Crossplane is powerful for managing external services declaratively
- External Secrets for password generation eliminates hardcoded secrets
- Gateway API is cleaner than traditional Ingress for TLS
- OAuth2 Proxy is rock-solid for OIDC flows

**Challenges:**
- Crossplane has a learning curve (worth it)
- Secret timing: sometimes OAuth2 Proxy starts before Keycloak secrets are created
- OIDC debugging requires understanding the full flow
- Keycloak's token mappers need careful configuration

## Securing Kagent: Why This Matters

Kagent is an AI agent that executes cluster operations. It's powerful and potentially dangerous without proper access control. 

With our solution:
- Only authenticated users with `kagent-user` role can access it
- All queries and operations are logged in Keycloak
- We can add roles for different permission levels as needed
- Users can access from anywhere - home, office, mobile - no VPN
- All configuration is version-controlled in git

## Conclusion

Zero trust isn't complicated. By combining OAuth2 Proxy, Keycloak, and Crossplane, we built a security model that is:

- **More secure** than VPNs (authentication + authorization)
- **Easier to use** (browser-based, no client software)
- **Fully automated** (Crossplane + GitOps)
- **Auditable** (Keycloak logs everything)
- **Repeatable** (Helm chart works everywhere)

The key: treat identity as your perimeter, not network location.

## Get Started

All code is in our [kubekub-ai-lab repository](https://github.com/kubekub/kubekub-ai-lab). The kagent-auth chart is in `helm/cluster/tools/ai/kagent-auth/`.

Steps:
1. Install Crossplane, Keycloak provider, External Secrets
2. Deploy or access a Keycloak instance
3. Configure Crossplane's Keycloak provider
4. `helm install kagent-auth ./kagent-auth`
5. Assign `kagent-user` role to your users
6. Access kagent securely!

Questions? Open an issue on GitHub or reach out at [kubekub.com](https://kubekub.com).

---

**Kubekub**: Building secure, scalable Kubernetes platforms with AI tools.
