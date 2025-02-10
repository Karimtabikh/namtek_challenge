import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, "../database.yaml");
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, "utf8"));

const { sqlite_path: sqlitePath } = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    date_of_birth: "1980-01-01",
    job_title: "Software Developer",
    department: "IT",
    salary: 60000,
    start_date: "2015-03-01",
    end_date: null,
    photo_path: "photo.png",
  },
  {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone_number: "234-567-8901",
    date_of_birth: "1985-05-15",
    job_title: "Project Manager",
    department: "Management",
    salary: 65000,
    start_date: "2016-04-11",
    end_date: null,
    photo_path: "photo2.png",
  },
  {
    full_name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone_number: "345-678-9012",
    date_of_birth: "1990-07-30",
    job_title: "UI/UX Designer",
    department: "Design",
    salary: 57000,
    start_date: "2017-08-23",
    end_date: null,
    photo_path: "photo3.png",
  },
];

const timesheets = [
  {
    employee_id: 1,
    start_time: "2025-02-10 08:00:00",
    end_time: "2025-02-10 17:00:00",
    work_summary: "Work summary for employee 1",
  },
  {
    employee_id: 2,
    start_time: "2025-02-11 12:00:00",
    end_time: "2025-02-11 17:00:00",
    work_summary: "Work summary for employee 2",
  },
  {
    employee_id: 3,
    start_time: "2025-02-12 07:00:00",
    end_time: "2025-02-12 16:00:00",
    work_summary: "Work summary for employee 3",
  },
];

const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(", ");
  const placeholders = Object.keys(data[0])
    .map(() => "?")
    .join(", ");

  const insertStmt = db.prepare(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
  );

  data.forEach((row) => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData("employees", employees);
  insertData("timesheets", timesheets);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Database seeded successfully.");
  }
});
