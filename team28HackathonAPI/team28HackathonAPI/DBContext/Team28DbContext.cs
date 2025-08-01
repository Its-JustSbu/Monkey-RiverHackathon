using Microsoft.EntityFrameworkCore;
using System;
using team28HackathonAPI.Models;

namespace team28HackathonAPI.DBContext
{
    public class Team28DbContext : DbContext
    {
        public Team28DbContext(DbContextOptions<Team28DbContext> options) : base(options) {}
        
        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<Alerts> Alerts { get; set; }
        public DbSet<DiagnosticTest> DiagnosticTest { get; set; }
        public DbSet<MonitoredDestination> MonitoredDestination { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
