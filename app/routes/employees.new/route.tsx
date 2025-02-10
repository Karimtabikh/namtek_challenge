import {
  data,
  Form,
  redirect,
  useFetcher,
  type ActionFunction,
} from "react-router";
import { EmployeeForm } from "~/components/EmployeeForm";
import { getDB } from "~/db/getDB";

// REFERENCE : https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function calcAge(dateString: string) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = String(formData.get("email"));
  const phone = formData.get("phone");
  const date_of_birth = formData.get("date_of_birth")?.toString() || "";
  const job_title = formData.get("job_title");
  const department = formData.get("department");

  // REFERENCE : https://stackoverflow.com/questions/50817280/error-error-ts2365-operator-cannot-be-applied-to-types-string-and-numbe
  const salary = parseFloat(formData.get("salary")?.toString() || "0");

  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");
  const photo = formData.get("photo");

  const minimumWage = 5000;
  const age = calcAge(date_of_birth);
  const errors: {
    email?: string;
    age?: string;
    salary?: string;
  } = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (age < 18) {
    errors.age = "Age must be over 18";
  }
  if (salary < minimumWage) {
    errors.salary = `Salary must be above ${minimumWage}`;
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      status: 400,
    };
  }
  const db = await getDB();
  await db.run(
    "INSERT INTO employees (full_name, email, phone_number, date_of_birth, job_title, department, salary, start_date, end_date, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      full_name,
      email,
      phone,
      date_of_birth,
      job_title,
      department,
      salary,
      start_date,
      end_date,
      "",
    ]
  );

  return redirect("/employees");
};

export default function NewEmployeePage() {
  const fetcher = useFetcher();
  const errors = fetcher.data?.errors || {}; 

  return (
    <div>
      <h1>Create New Employee</h1>
      <EmployeeForm isEdit={false} errors={errors} />
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
