using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Data
{
    public static class DataSeeder
    {
        public static void SeedData(JobDbContext context)
        {
            // Check if the database already has data
            if (!context.Job.Any())
            {
                context.Job.AddRange(
                    new Job { companyName = "Infosys", position = "Junior Developer", status = "Interview", dateApplied = DateTime.Now },
                    new Job { companyName = "IBM", position = "Senior Developer", status = "Offer", dateApplied = DateTime.Now },
                    new Job { companyName = "Microsoft", position = "Graduate Developer", status = "Rejected", dateApplied = DateTime.Now }
                );

                context.SaveChanges();
            }
        }
    }
}
