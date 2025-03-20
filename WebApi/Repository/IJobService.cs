using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Repository
{
    public interface IJobService
    {
        public Task<IEnumerable<Job>> GetJobs();

        public Task<Job> GetJob(int id);

        public Task<Job> AddJob(Job job);

        public Task UpdateJob(Job job);
    }
}
