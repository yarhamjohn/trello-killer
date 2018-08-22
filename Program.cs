using System.Diagnostics;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace aspnetreact
{
    public class Program
    {
        public static void Main(string[] args)
        {
            StartMongoServer();
            BuildWebHost(args).Run();

        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        public static void StartMongoServer()
        {
            var start = new ProcessStartInfo
            {
                FileName = @"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe",
                WindowStyle = ProcessWindowStyle.Hidden,
                Arguments = @"--dbpath d:\mongodb\data"
            };

            Process.Start(start);
        }
    }
}
