---
layout: article
title: "Creating an F# ASP .Net Core application (Part 2)"
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

I am little masochist and I am trying to build an ASP .Net Core application in F#. This should be possible as
F# is a .Net language and it is "supported" in .Net Core but, as there are no much real support in Visual Studio and
not much information on the Web, it is proving to be harder and uglier than I original expected.
The first part of this series is [here](/blog/2016/10/04/Creating-An-FSharp-Asp-Net-Core-Application/).

After having the project created with `dotnet new -l fs`, the first thing I did was to update in the projet.json file
the version of the `Microsoft.FSharp.Core.netcore` from `1.0.0-alpha-160629` to `1.0.0-alpha-160831` which is
the latest version of this package. I hope that at some point I will be able to update to a release version.

Then, lets change the main function from the simple hello world to an application that creates and runs a webhost.

``` ocaml
open Microsoft.AspNetCore.Hosting

[<EntryPoint>]
let main argv =
    let host = WebHostBuilder()
                .Build()

    do host.Run()
    0 // return an integer exit code
```

Notice that the class `WebHostBuilder` belongs to the namespace `Microsoft.AspNetCore.Hosting` and this namespace is
included in the assembly package `Microsoft.AspNetCore.Server.Kestrel`. So we need to include this package as a dependency
in the project.json file.

``` json
{
  [...]
  "dependencies": {
    "Microsoft.AspNetCore.Server.Kestrel": "1.0.1"
  }
}
```

And, although the project does not show any errors when executing `dotnet build`, it fails when executing `dotnet run` with
the following exception (which basically says that we haven't provided a startup class):

``` csharp
Unhandled Exception: System.InvalidOperationException: No service for type 'Microsoft.AspNetCore.Hosting.IStartup' has been registered.
   at Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService(IServiceProvider provider, Type serviceType)
   at Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService[T](IServiceProvider provider)
   at Microsoft.AspNetCore.Hosting.Internal.WebHost.EnsureStartup()
   at Microsoft.AspNetCore.Hosting.Internal.WebHost.EnsureApplicationServices()
   at Microsoft.AspNetCore.Hosting.Internal.WebHost.BuildApplication()
   at Microsoft.AspNetCore.Hosting.WebHostBuilder.Build()
   at Program.main(String[] argv)
```

To fix this error we will need to provide a [`Startup`](https://docs.asp.net/en/latest/fundamentals/startup.html#the-startup-class)
class with an empty [`Configure`](https://docs.asp.net/en/latest/fundamentals/startup.html#the-configure-method) method.

The `Configure` method needs to accept an `IApplicationBuilder` parameter, and this interface lives on the `Microsoft.AspNetCore.Hosting`
namespace. Also, the Startup class has to be registered on the WebhostBuilder.

``` ocaml
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting

type Startup(env: IHostingEnvironment) =
    member x.Configure(app: IApplicationBuilder) =
        ()

[<EntryPoint>]
let main argv =
    let host = WebHostBuilder()
                .UseStartup<Startup>()
                .Build()

    do host.Run()
    0 // return an integer exit code
```

And if you execute `dotnet run` again, now the exception changed to (server is not registered):

``` csharp
Unhandled Exception: System.InvalidOperationException: No service for type 'Microsoft.AspNetCore.Hosting.Server.IServer' has been registered.
   at Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService(IServiceProvider provider, Type serviceType)
   at Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService[T](IServiceProvider provider)
   at Microsoft.AspNetCore.Hosting.Internal.WebHost.EnsureServer()
   at Microsoft.AspNetCore.Hosting.Internal.WebHost.BuildApplication()
   at Microsoft.AspNetCore.Hosting.WebHostBuilder.Build()
   at Program.main(String[] argv)
```

Adding a call to the `UseKestrel` extension method does the job

``` ocaml
    let host = WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .Build()
```

and executing `dotnet run` creates and executes a new kestrel web server that does nothing.

Lets make it do something before finish this blog post. The simplest thing a server can do is write a hardcoded response to
every request. We can do that on the `Configure` method of the `Startup` class.

``` ocaml
type Startup(env: IHostingEnvironment ) =
    member x.Configure(app: IApplicationBuilder) =
        do app.Run(fun context ->
            async {
                do! context.Response.WriteAsync("Hi!") |> Async.AwaitIAsyncResult |> Async.Ignore
            } |> Async.StartAsTask :> Task
        )
```


A dependency to `Microsoft.AspNetCore.Http` has to be included because the `WriteAsync` extension method is defined in
this package so lets include it.

``` json
  "dependencies": {
    "Microsoft.AspNetCore.Server.Kestrel": "1.0.1",
    "Microsoft.AspNetCore.Http": "1.0.0"
  }
```

The uggliness of this method comes from the call to `WriteAsync`. We need to await the result but the result will be void
(because `WriteAsync` returns a `Task`) so we just ignore it.

There are some ways to make this look nicer like this [awaitTask function](http://stackoverflow.com/a/8022955/149885)

``` ocaml
open Microsoft.AspNetCore.Http
open System.Threading.Tasks

let awaitTask = Async.AwaitIAsyncResult >> Async.Ignore

type Startup(env: IHostingEnvironment ) =
    member x.Configure(app: IApplicationBuilder) =
        do app.Run(fun context ->
            async {
                do! awaitTask (context.Response.WriteAsync("Hi!"))
            } |> Async.StartAsTask :> Task
        )
```

It still looks ugly but just a little better. 