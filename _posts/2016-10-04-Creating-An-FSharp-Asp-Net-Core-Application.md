---
layout: article
title: "Creating an F# ASP .Net Core application (Part 1)"
modified: 2016-10-04 10:08:33 +0200
tags: [fsharp, code, learning, netcore]
image:
  feature:
  teaser:
  credit:
  creditlink:
comments: true
share:
categories: blog
---

So, at the office we are having an onsite training provided by u2u this week. We are supposed to be learning Advance Web development
with ASP .Net. This means that I have been doing a lot of small applications in C# using .Net Core and wondering how hard could it be
to write the same example applications in F#.

It seems to be harder and uglier than I expected. I am not sure if anybody else is interested in building an F# ASP .Net Core
application but I have already started and lets better document my path.

Of course Visual Studio has some support for F# but, as the time of this writting, there is no template installed by default to
start a new F# project in .Net Core, so I decided to do everything using [VS Code](https://code.visualstudio.com),
[Ionide](http://ionide.io/) and the [dotnet-cli](https://github.com/dotnet/cli). God Bless me. 

You can start by executing `dotnet new -l fs`. Where the `-l` [option](https://github.com/dotnet/cli/tree/rel/1.0.0/src/dotnet/commands/dotnet-new#options)
allows you to select the language. For F# the valid options are `fs`, `f#` and `fsharp`.

This command will create two files that will allow us to build a Hello World console application and will give a fundation to create
the ASP .Net Core application.

* Program.fs

``` ocaml
open System

[<EntryPoint>]
let main argv = 
    printfn "Hello World!"
    0 // return an integer exit code
```

* project.json

``` json
{
  "version": "1.0.0-*",
  "buildOptions": {
    "debugType": "portable",
    "emitEntryPoint": true,
    "compilerName": "fsc",
    "compile": {
      "includeFiles": [
        "Program.fs"
      ]
    }
  },
  "tools": {
    "dotnet-compile-fsc":"1.0.0-preview2-*"
  },
  "frameworks": {
    "netcoreapp1.0": {
      "dependencies": {
        "Microsoft.NETCore.App": {
          "type": "platform",
          "version": "1.0.1"
        },
        "Microsoft.FSharp.Core.netcore": "1.0.0-alpha-160629"
      }
    }
  }
}
```

Executing `dotnet build` will restore the packages and build successfully.

And, finally, executing `dotnet run` will print to console

    Hello World
