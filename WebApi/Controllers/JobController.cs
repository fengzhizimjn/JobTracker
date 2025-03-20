using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        [Route("GetJob")]
        public async Task<IEnumerable<Job>> GetJobs()
        {
            return await _jobService.GetJobs();
        }

        [HttpGet]
        [Route("GetJob/{id}")]
        public async Task<IActionResult> GetJob(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { Message = $"Invalid Job ID {id}." });
            }

            var job = await _jobService.GetJob(id);
            if (job == null)
            {
                return NotFound(new { Message = $"Job with ID {id} not found." });
            }

            return Ok(job);
        }

        [HttpPost]
        [Route("AddJob")]
        public async Task<IActionResult> AddJob([FromBody] Job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdJob = await _jobService.AddJob(job);
            return CreatedAtAction(nameof(GetJob), new { id = createdJob.id }, createdJob);
        }

        [HttpPatch]
        [Route("UpdateJob/{id}")]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] Job job)
        {
            if (id <= 0)
            {
                return BadRequest(new { Message = $"Invalid Job ID {id}." });
            }

            if (job == null)
            {
                return BadRequest(new { Message = "Request body cannot be null." });
            }

            var existingJob = await _jobService.GetJob(id);
            if (existingJob == null)
            {
                return NotFound(new { Message = $"Job with ID {id} not found." });
            }

            // Validate required fields selectively
            if (string.IsNullOrWhiteSpace(job.companyName) && string.IsNullOrWhiteSpace(job.position))
            {
                return BadRequest(new { Message = "At least one field must be updated." });
            }
            existingJob.companyName = job.companyName ?? existingJob.companyName;
            existingJob.position = job.position ?? existingJob.position;
            existingJob.status = job.status ?? existingJob.status;
            existingJob.dateApplied = job.dateApplied != default ? job.dateApplied : existingJob.dateApplied;

            await _jobService.UpdateJob(existingJob);
            return Ok(existingJob);
        }
    }
}
