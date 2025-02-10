import { Form } from "react-router";
import { useState, useEffect } from "react";

type EmployeeFormProps = {
  data?: any;
  isEdit: boolean;
  errors: any;
};

export const EmployeeForm = ({ data, isEdit, errors }: EmployeeFormProps) => {
  const [fullName, setFullName] = useState(data?.full_name || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phone, setPhone] = useState(data?.phone_number || "");
  const [dateOfBirth, setDateOfBirth] = useState(data?.date_of_birth || "");
  const [jobTitle, setJobTitle] = useState(data?.job_title || "");
  const [department, setDepartment] = useState(data?.department || "");
  const [salary, setSalary] = useState(data?.salary || "");
  const [startDate, setStartDate] = useState(data?.start_date || "");
  const [endDate, setEndDate] = useState(data?.end_date || "");
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    setFullName(data?.full_name || "");
    setEmail(data?.email || "");
    setPhone(data?.phone_number || "");
    setDateOfBirth(data?.date_of_birth || "");
    setJobTitle(data?.job_title || "");
    setDepartment(data?.department || "");
    setSalary(data?.salary || "");
    setStartDate(data?.start_date || "");
    setEndDate(data?.end_date || "");
  }, [data]);

  return (
    <Form method="post">
      {isEdit && <input type="hidden" name="employee_id" value={data?.id} />}

      <div>
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors?.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="123-456-7890"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
      </div>

      <div>
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          id="date_of_birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        {errors?.age && <p>{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="job_title">Job Title</label>
        <input
          type="text"
          name="job_title"
          id="job_title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <input
          type="text"
          name="department"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          name="salary"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        {errors?.salary && <p>{errors.salary}</p>}
      </div>

      <div>
        <label htmlFor="start_date">Start Date</label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="end_date">End Date</label>
        <input
          type="date"
          name="end_date"
          id="end_date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="photo">Employee Photo</label>
        <input type="file" name="photo" id="photo" accept="image/*" />
      </div>

      <button type="submit">
        {isEdit ? "Update Employee" : "Create Employee"}
      </button>
    </Form>
  );
};
