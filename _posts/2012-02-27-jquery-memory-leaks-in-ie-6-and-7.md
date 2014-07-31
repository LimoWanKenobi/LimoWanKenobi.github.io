---
layout: post
title: "jQuery memory leaks in IE 6 and 7"
modified: 2012-02-27 13:49:33 +0100
tags: [jQuery, Debugging, Code]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: 
---

Some years ago, while I was working for Digipro, I was assigned to the development of a control used to display digitalized images using only HTML and javascript. The previous control was developed using ActiveX controls and was having serious difficulties with the increse of security of IE.

Digipro has an application that is used to digitalize images, store them in a database and then query and display them. This application is used by several institutions here in Mexico, most of them banks and finantial institutions.

I started using jQuery for this project, and everything went really smoth and I learnt a lot. But while doing some testing I saw that the memory footprint of IE was growing each time I loaded a new image (about 1 Mb per load). One client noticed it and reported it, but at that time IE 8 went out and they upgraded and everything went fine from there so I never really investigated this bug.

Last week the development manager from Digipro called me because, for some clients, the application became slow and even unresponsive after about and hour using it. It turned out that these clients are still using IE 6 and IE 7 in most of their computers. The manager asked me to debug this component and help them correct this behavior.

I started installing and creating two virtual machines with [XP Mode](http://blogs.msdn.com/b/ie/archive/2011/02/04/testing-multiple-versions-of-ie-on-one-pc.aspx), one with IE 6 and the other with IE 7 to be able to reproduce the bug; and then mounting all the services and application in my development computer.

While using the application I noticed that the developers at Digipro were busy getting a lot of stuff into the component I developed and it have a lot of new functionality. The next thing I noticed was that the memory footprint if IE 7 was growing about 20 Mb each time a new image was loaded and it never went down until I closed the browser. WTF! 20 Mb! When this bug was reported to me (3 years ago) the memory grew less than 1 Mb per image.

After reading a lot of Memory Leaks of javascript in IE  
(links:  
<a href="http://192.168.202.189/IDPortalV9/Wfrm_SB_IntegraMC.aspx?nProyId=3&amp;sUsrID=1139819&amp;sUsrAS=sea&amp;sPlazaID=999&amp;sSucursalID=999&amp;sPerfilID=1502&amp;sAgenciaID=" target="_blank">http://192.168.202.189/IDPortalV9/Wfrm_SB_IntegraMC.aspx?nProyId=3&amp;sUsrID=1139819&amp;sUsrAS=sea&amp;sPlazaID=999&amp;sSucursalID=999&amp;sPerfilID=1502&amp;sAgenciaID=</a>  
<a href="http://msdn.microsoft.com/en-us/library/ie/bb250448%28v=vs.85%29.aspx" target="_blank">http://msdn.microsoft.com/en-us/library/ie/bb250448(v=vs.85).aspx</a>  
<a href="http://stackoverflow.com/questions/1261244/how-to-use-ie7-javascript-memory-leak-detectors" target="_blank">http://stackoverflow.com/questions/1261244/how-to-use-ie7-javascript-memory-leak-detectors</a>  
<a href="http://home.wanadoo.nl/jsrosman/sievehelp.htm" target="_blank">http://home.wanadoo.nl/jsrosman/sievehelp.htm</a>  
<a href="http://blogs.msdn.com/b/ie/archive/2007/11/29/tools-for-detecting-memory-leaks.aspx" target="_blank">http://blogs.msdn.com/b/ie/archive/2007/11/29/tools-for-detecting-memory-<span class="il">leaks</span>.aspx</a>  
<a href="http://javascript.crockford.com/memory/leak.html" target="_blank">http://javascript.crockford.com/memory/leak.html</a>  
<a href="http://www.codeproject.com/Articles/12231/Memory-Leakage-in-Internet-Explorer-revisited" target="_blank">http://www.codeproject.com/Articles/12231/Memory-Leakage-in-Internet-Explorer-revisited</a>  
<a href="http://www.javascriptkit.com/javatutors/closuresleak/index.shtml" target="_blank">http://www.javascriptkit.com/javatutors/closuresleak/index.shtml</a>  
)

I realized that I needed a tool to help me find them. So I downloaded [Drip](http://outofhanwell.com/ieleak/index.php?title=Main_Page), [sIEve](http://home.wanadoo.nl/jsrosman/), and [IEJsLeaksDetector](http://blogs.msdn.com/b/gpde/archive/2009/08/03/javascript-memory-leak-detector-v2.aspx). All of them great applications.

The tools reported several leeks each time an image was unloaded and a new one was loaded. This step does a postback to the server and all controls of the page are re-created.

<a href="http://1.bp.blogspot.com/-RdeV6luAT3A/T0tOtnZPfuI/AAAAAAAAASE/7bfc8dSrqJ8/s1600/sIEve+Leaks.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-RdeV6luAT3A/T0tOtnZPfuI/AAAAAAAAASE/7bfc8dSrqJ8/s640/sIEve+Leaks.png" height="393" width="640" /></a>

<a href="http://1.bp.blogspot.com/-W72pQnLUS_Q/T0tOx_-_SZI/AAAAAAAAASM/oYeWGrcdUnI/s1600/sIEve+Leaks+Memory.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-W72pQnLUS_Q/T0tOx_-_SZI/AAAAAAAAASM/oYeWGrcdUnI/s640/sIEve+Leaks+Memory.png" height="498" width="640" /></a>

<a href="http://3.bp.blogspot.com/-mLYsi0yI_X8/T0tOzrevu2I/AAAAAAAAASU/n8NjtjIY7ew/s1600/IEJsLeeksDetector.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-mLYsi0yI_X8/T0tOzrevu2I/AAAAAAAAASU/n8NjtjIY7ew/s640/IEJsLeeksDetector.png" height="576" width="640" /></a>

I was shocked to see that most of the leeks where related to jQuery functions. I was expecting to find some really nasty and obvious bugs in the code of the component.

So I started to unbind every event of every object I found. And the memory footprint started going down until it reached about 5 Mb per image. At that point, the only leaks that sIEve was reporting where related to the [jQuery UI draggable plugin](http://jqueryui.com/demos/draggable/) and I was having a hard time trying to remove them. So in a moment of despair I tried to select all objects and unbind all events from them.

<a href="http://2.bp.blogspot.com/-jkRwelXeX0o/T0tPFwGGkyI/AAAAAAAAASc/KPZRjDZRuR8/s1600/unbindAll.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-jkRwelXeX0o/T0tPFwGGkyI/AAAAAAAAASc/KPZRjDZRuR8/s1600/unbindAll.png" /></a>

I was really shocked to find out that sIEve was still reporting the same leaks, and more over, IEJSLeaksDetector was showing that the window object hasn't been disposed. And the memory kept growing about 4 Mb after each image load.

<a href="http://2.bp.blogspot.com/-o-jun_3_uMA/T0tPJj91zMI/AAAAAAAAASk/2nFnkzvia9s/s1600/sIEve+Leaks+Memory+unbind+all.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-o-jun_3_uMA/T0tPJj91zMI/AAAAAAAAASk/2nFnkzvia9s/s640/sIEve+Leaks+Memory+unbind+all.png" height="392" width="640" /></a>

<a href="http://1.bp.blogspot.com/-fmdUDEMsaOg/T0tPMJRA6zI/AAAAAAAAASs/qHAHr32CGGQ/s1600/IEJsLeeksDetector+window.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-fmdUDEMsaOg/T0tPMJRA6zI/AAAAAAAAASs/qHAHr32CGGQ/s640/IEJsLeeksDetector+window.png" height="422" width="640" /></a>

So I started looking on the web for this strange behavior and found several reports of it. Two of them where bug reports in the jQuery Bug Tracker. Tickets [6421](http://bugs.jquery.com/ticket/6421) and [8863](http://bugs.jquery.com/ticket/8863). The first one of them had a proposed solution and after implementing it, the leaks were gone.

<a href="http://4.bp.blogspot.com/-VjWRtMfQB0E/T0tPQMCZDvI/AAAAAAAAAS0/H24frYO0qnY/s1600/solution.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-VjWRtMfQB0E/T0tPQMCZDvI/AAAAAAAAAS0/H24frYO0qnY/s1600/solution.png" /></a>

So, after this weekend that almost was a nightmare I have decided to bill a lot more each time an application have to support IE 6 or IE 7.