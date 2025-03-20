import axios from "axios";
import { useEffect, useState } from "react";

function JobCrud() {

    const [id, setId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [jobs, setUsers] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3; // Number of jobs per page
 
    function resetForm() {
      setId("");
      setCompanyName("");
      setPosition("");
      setStatus("");
      setDateApplied("");
      setValidationErrors({});
    }

    useEffect(() => {
        (async () => await Load())();
    }, []);
 
    async function Load() {        
        const result = await axios.get("https://localhost:44327/api/Job/GetJob");
        setUsers(result.data);
        console.log(result.data);
    }

    const validateFields = () => {
      const errors = {};
      if (!companyName.trim()) errors.companyName = "Company Name is required.";
      if (!position.trim()) errors.position = "Position is required.";
      if (!status) errors.status = "Please select a status.";
      if (!dateApplied) errors.dateApplied = "Date Applied is required.";
      return errors;
    };
 
    async function save(event) {    
        event.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors); // Set errors
          return;
        }
        try {
          await axios.post("https://localhost:44327/api/Job/AddJob", {            
            companyName: companyName,
            position: position,
            status: status,
            dateApplied: dateApplied,
          });
          alert("Job Registation Successfully");
          resetForm();
          Load();
        } catch (err) {
          alert(err);
        }
    }

    async function editJob(jobs) {
      setCompanyName(jobs.companyName);
      setPosition(jobs.position);
      setStatus(jobs.status);
      setDateApplied(jobs.dateApplied);
      setId(jobs.id);
    }
 
    async function update(event) {
        event.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors); // Set errors
          return;
        }
        try {
            await axios.patch("https://localhost:44327/api/Job/UpdateJob/"+ jobs.find((u) => u.id === id).id || id,
            {
              id: id,
              companyName: companyName,
              position: position,
              status: status,
              dateApplied: dateApplied,
            }
          );
          alert("Registation Updated");
          resetForm();
          Load();
        } catch (err) {
          alert(err);
        }
    }

    // Pagination Logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <div>
        <h1>Job Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">           
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Company Name</label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              value={companyName}
              onChange={(event) => {
                setCompanyName(event.target.value);
              }}
              style={{
                borderColor: validationErrors.companyName ? "red" : undefined,
              }}
            />
            {validationErrors.companyName && (
              <small className="text-danger">{validationErrors.companyName}</small>
            )}
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={position}
              onChange={(event) => {
                setPosition(event.target.value);
              }}
              style={{
                borderColor: validationErrors.position ? "red" : undefined,
              }}
            />
            {validationErrors.position && (
              <small className="text-danger">{validationErrors.position}</small>
            )}
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              style={{
                borderColor: validationErrors.status ? "red" : undefined,
              }}
            >
              <option value="" disabled>Select Status</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {validationErrors.status && (
              <small className="text-danger">{validationErrors.status}</small>
            )}
          </div>
          <div className="form-group">
            <label>DateApplied</label>
            <input
              type="date"
              className="form-control"
              id="dateApplied"
              value={dateApplied}
              onChange={(event) => setDateApplied(event.target.value)}
              style={{
                borderColor: validationErrors.dateApplied ? "red" : undefined,
              }}
            />
            {validationErrors.dateApplied && (
              <small className="text-danger">{validationErrors.dateApplied}</small>
            )}
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
      {/* Table with Pagination */}
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Job Id</th>
            <th scope="col">Company Name</th>
            <th scope="col">Position</th>
            <th scope="col">Status</th>
            <th scope="col">Date Applied</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {/*
        {jobs.map(function fn(job) {
          return (
            <tbody key={job.id}>
              <tr>
                <th scope="row">{job.id} </th>
                <td>{job.companyName}</td>
                <td>{job.position}</td>
                <td>{job.status}</td>
                <td>{job.dateApplied}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editJob(job)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}*/}
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.id}>
              <th scope="row">{job.id}</th>
              <td>{job.companyName}</td>
              <td>{job.position}</td>
              <td>{job.status}</td>
              <td>{job.dateApplied}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => editJob(job)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>        
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-secondary mx-2" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="align-self-center">Page {currentPage} of {totalPages}</span>
        <button className="btn btn-secondary mx-2" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      </div>
    );
  }
  
  export default JobCrud;