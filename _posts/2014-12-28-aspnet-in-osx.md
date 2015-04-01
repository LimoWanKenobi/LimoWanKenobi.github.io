---
layout: article
title: "ASP.Net in OSX"
modified: 2014-12-28 22:22:08 +0100
tags: [net, osx, aspnet, sublime]
image: 
  feature: HelloKestrel_1600x800.jpg
  teaser: HelloKestrel_400x250.jpg
  credit: 
  creditlink: 
comments: true
share: 
categories: blog, asp.net, osx
---

I am, above all, a C# and JavaScript developer so in my normal day work I have to type all day on a Windows machine, but at home I enjoy developing and tinkering in my Mac, so I am really excited about being able to develop ASP.Net vNext applications on OSX.

I read about the announcement of Microsoft releasing .Net Core and ASP.Net as open source projects but I hadn't have a chance to do anything after it because I was preparing for three weeks of holidays visiting family and friends in Mexico.

After two weeks of vacations, I found myself willing to open my laptop and do something useful with it, and then I saw the following tweet from Richard Dalton and I decided that I also wanted to try it.

<blockquote class="twitter-tweet" lang="es"><p>If you&#39;re thinking of tinkering with .Net on your Mac, this post by <a href="https://twitter.com/JeremyCMorgan">@JeremyCMorgan</a> worked for me.&#10;<a href="https://t.co/tgGy0rE0Hj">https://t.co/tgGy0rE0Hj</a></p>&mdash; Richard Dalton (@richardadalton) <a href="https://twitter.com/richardadalton/status/549378599791644673">diciembre 29, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Following the instructions linked in the tweet it was really easy to start a KVM server on my MacBook and run the sample applications.
I got into issues with the Kestrel process hanging and having to kill everything because I tried to stop it using Ctrl-C instead of just pressing Enter but everything else was nice and tidy.

Whenever I have more time I will try to do some small pet project to be ready for the release.