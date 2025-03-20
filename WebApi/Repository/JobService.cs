using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Repository
{
    public class JobService : IJobService
    {
        private readonly JobDbContext _jobDbContext;

        public JobService(JobDbContext jobDbContext)
        {
            _jobDbContext = jobDbContext;
        }

        public async Task<IEnumerable<Job>> GetJobs()
        {
            return await _jobDbContext.Job.ToListAsync();
        }

        public async Task<Job> GetJob(int id)
        {
            return await _jobDbContext.Job.FindAsync(id);
        }

        public async Task<Job> AddJob(Job job)
        {
            await _jobDbContext.Job.AddAsync(job);
            await _jobDbContext.SaveChangesAsync();
            return job;
        }

        public async Task UpdateJob(Job job)
        { 
            _jobDbContext.Job.Update(job);
            await _jobDbContext.SaveChangesAsync();
        }
    }
}
