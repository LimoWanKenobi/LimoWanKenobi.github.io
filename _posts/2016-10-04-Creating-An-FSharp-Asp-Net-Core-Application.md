---
layout: article
title: "Creating an F# ASP .Net Core application"
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

You can start by executing

    dotnet new -l fs

This will create two files:

* Program.fs

    open System

    [<EntryPoint>]
    let main argv = 
        printfn "Hello World!"
        0 // return an integer exit code


* project.json

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


Executing

    dotnet build

will restore the packages and build successfully. But it is not a ASP .Net core project.

Executing

    dotnet run

will print to console

    Hello World