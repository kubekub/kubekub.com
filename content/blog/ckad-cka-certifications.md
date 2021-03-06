+++
title = "Kubernetes certificates, my path to obtain CKA and CKAD."
subtitle= "My path to obtain CKA and CKAD."
date = "2019-06-29T11:50:46+02:00"
tags = ["kubernetes","ckad","cka","certification","docker","udemy","kubectl"]
categories = ["kubernetes","ckad","cka"]
banner = "img/icons/logo_cka_ckad-small.png"
author = "Juan Carlos Garcia Pelaez"
+++

<center>
<img class="special-img-class" width="35%" src="/img/posts/ckad-cka-certifications/ckad.png"><img class="special-img-class" width="37%" src="/img/posts/ckad-cka-certifications/cka.png">
</center>

In the last week I **passed both exams** of the CNCF for Kubernetes, first the **CKAD (Certified Kubernetes Application Developer)** and finally the **CKA (Certified Kubernetes Administrator)**.

I've been working with Kubernetes and OpenShift for the **last 4 years**, and I wanted to challenge my knowledge through the certifications.

### The CKAD exam

First I went for the CKAD, even I'm working in the last years very close to system administrators I still fill **closer to the Development**. 

The preparation for the CKAD in my case was to **practice the speed** with the **kubectl** command line. I normally use a more **modern tools** like helm, and I'm not really use to manually create pods and deployments. 

I also followed the **tips** from different blog posts like: 

- [The Ultimate Guide to Passing the CKA Exam](https://medium.com/@ContinoHQ/the-ultimate-guide-to-passing-the-cka-exam-1ee8c0fd44cd)

- [My Feedback about CKA and CKAD](https://medium.com/@ikaboubi/my-feedback-about-cka-and-ckad-e82a35585fe9)

- [How I passed the CKA (Certified Kubernetes Administrator) Exam](https://medium.com/@krystiannowaczyk/how-i-passed-the-cka-certified-kubernetes-administrator-exam-f94b11566528)


The CKAD exam gives you only **2 hours** for the completition, and it's very important to **be fast** on the replies.

To get used to the environment I found a [github cka practice repository](https://github.com/arush-sal/cka-practice-environment) with a similar environment that was really useful to get familiarized with the examslocal type of environment.

I could not have time to finish the exam, and finally I passed with a 74% (minimum is 66%).

### The CKA exam

Once I got confirmation from the CNFC of my CKAD was passed I started to prepare the CKA. There i was feeling less comfortable, as I'm used to administer Openshift distributions of Kubernetes and the last version I've worked is 3.11 (with kubernetes 1.11).

The CKA and CKAD exams are now based on **Kubernetes 1.14**, in the developer side doesn't change a lot from previous versions, but the administration part has changed a lot with a totally different installation of the components.

As I was not feeling confident I started to look for an online training and I found in Udemy the **course [Certified Kubernetes Administrator (CKA) with Practice Tests](https://www.udemy.com/certified-kubernetes-administrator-with-practice-tests) made by Mumshad Mannambeth**.

It's a really **complete** course with **videos** and **practical exercises**, some of them with good difficulty. Luckily, I could skip all parts about the use of Kubernetes and I focused on the administration lessons.

Once I got the course finisehd for the administration I registered for the exam (with a **big mistake** I wanted to do it at **12 in the afternoon** and checked it out at **12 am**, so I had to do during the night, finishing at 3 am).
Finally after my mistake I **could pass the CKA exam**. 

Having **three hours** let you **more time** for do a **review** of the questions, and I also was more trained with the CKAD exam and the udemy course.

I passed the CKA with a 80% (minimum is 74%).


## Some tips

* Use **aliases**

For avoid time consume first create an alias in the console for the kubectl

```bash
alias k=/usr/bin/kubectl
```

* Use **kubectl create** option

It is very useful to use the "create" option redirecting the output to a yaml file. 

```bash
kubectl create deployment my-dep --image=busybox --dry-run -o yaml > <exerciseNumber>.yaml
```

* Reuse contents
**Reuse the files** from previous exercises. For example if in exercise 3 uses a pod and in 7, you can do something like

```bash
cp 3-pod.yaml 7-pod.yaml
```
And edit the files. It is also a good way to go back to an exercise if cannot be completed at the first and we have some time for review.

* Get used to vi

The notepad provided in the exam is not very useful, it's better to use vi and directly write to files

* Store in the notepad your progress

Store in the notepad for all the exam questions **if are finished or not**, it will be easier to come back an do review. Is better to continue if you are blocked in one question, maybe later you can get the solution.

For example I did something like:

```
1 OK
2 TODO
3 TODO
4 OK
5 NOT SURE
6 OK
...
```


## References

https://medium.com/@ContinoHQ/the-ultimate-guide-to-passing-the-cka-exam-1ee8c0fd44cd

https://medium.com/@ikaboubi/my-feedback-about-cka-and-ckad-e82a35585fe9

https://medium.com/@krystiannowaczyk/how-i-passed-the-cka-certified-kubernetes-administrator-exam-f94b11566528

https://cka-exam.blog/

https://github.com/mmumshad/kubernetes-the-hard-way

https://www.udemy.com/certified-kubernetes-administrator-with-practice-tests

https://github.com/arush-sal/cka-practice-environment

## Medium

The article can also be viewed on [kubekub medium blog](https://medium.com/kubekub/kubernetes-certificates-f22649263023)
