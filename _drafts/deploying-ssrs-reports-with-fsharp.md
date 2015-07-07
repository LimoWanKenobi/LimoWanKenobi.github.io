---
layout: article
title: "Deploying SSRS reports with FSharp"
modified: 2014-04-24 00:05:37 +0200
tags: [fsharp, code, learning, oss, ssrs]
image:
  feature:
  credit:
  creditlink:
comments:
share:
categories: blog
---

Working with SQL Server Reporting Services is, usually, a pain because of the
lack of tooling. The only tool I am aware of is Visual Studio and, although it is
a really good tool, it is not prepared for a continuous deployment process.
On all the teams I have worked with, the deployment of SSRS projects had been
always a manual process.

While I was a developer on the Meetings Management team of the United Nations,
one of the objectives of the team was to be able to easily, and in some cases automatically,
release a new version of our applications to all our different testing and production environments.
A drunken monkey (i.e. me) should be able to release a new version with a single click.

Our biggest problem was our set of SSRS projects. On each release somebody had to
open Visual Studio, get the latest version of each SSRS project from the correct branch,
change the configuration depending on the environment and server to be released,
and, finally, click on the deploy button.

I got tired of making mistakes all the time so I decided to develop a small tool
to help me doing all of this. It worked surprinsingly well and that is why, and I am
releasing it as an open source project.
