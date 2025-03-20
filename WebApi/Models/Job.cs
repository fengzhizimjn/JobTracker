using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Job
    {
        [Key]
        public int id { get; set; }

        [Required(ErrorMessage = "Company Name is required.")]
        [MaxLength(100, ErrorMessage = "Company Name cannot exceed 100 characters.")]
        public string companyName { get; set; }

        [Required(ErrorMessage = "Position is required.")]
        [MaxLength(50, ErrorMessage = "Position cannot exceed 50 characters.")]
        public string position { get; set; }

        [Required]
        [EnumDataType(typeof(JobStatus), ErrorMessage = "Status must be one of the following: Interview, Offer, Rejected.")]
        public string status { get; set; }

        [Required(ErrorMessage = "Date Applied is required.")]
        public DateTime dateApplied { get; set; }
    }

    public enum JobStatus
    {
        Interview,
        Offer,
        Rejected
    }
}
