---
layout: article
title: "Deploying SSRS reports with FSharp"
modified: 2015-07-08 00:05:37 +0200
tags: [fsharp, code, learning, oss, ssrs]
image:
  feature: fred_1600x800.jpg
  teaser: fred_400x250.jpg
  credit:
  creditlink:
comments: true
share:
categories: blog
---

Working with SQL Server Reporting Services is, usually, a pain because of the
lack of tooling. The only tool I am aware of is Visual Studio and, although it is
a really good tool, it is not prepared for continuous deployment.
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
to help me doing all of this. It worked surprisingly well and now it is used as the official
tool for reports deployment in that team.

I believe I am not the only one suffering the SSRS pain and, to try to alleviate
the pain of others, I am releasing my small tool as an open source project.

I have already solved the biggest problem. I found a good a name for it. I called it
FReD (F# Reports Deployer). The project is hosted on [github](http://edhzsz.github.io/FReD/),
and now I just need to clean the code and start publishing it (which I will be doing slowly
during the next week).
