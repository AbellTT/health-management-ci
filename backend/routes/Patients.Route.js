const express = require("express");
const {
  addPatient,
  getAll: getAllPatients,
  findByEmail,
  findById: findPatientByStudentId,
} = require("../models/Patients.model");
const dbhelper = require("../configs/dbhelper");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.status(200).send(patients);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/search/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const patient = await findPatientByStudentId(studentId);
    if (patient) {
      res.status(200).send({ message: "Found", data: patient });
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Error searching student" });
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    await addPatient({
      studentid: (req.body.studentID || req.body.studentid || req.body.ID)?.trim().toUpperCase(),
      name: req.body.name,
      department: req.body.department,
      year: req.body.year,
      phonenum: req.body.phoneNum || req.body.phonenum,
      emergencycontact: req.body.emergencyContact || req.body.emergencycontact,
      email: req.body.email,
      password: req.body.password || "Student@123",
      age: req.body.age,
      gender: req.body.gender,
      bloodgroup: req.body.bloodGroup || req.body.bloodgroup || "O+",
      allergies: req.body.allergies || "None",
      dob: req.body.DOB || req.body.dob || new Date().toISOString().split("T")[0],
      address: req.body.address || "AASTU",
      docid: req.body.docid || req.body.docID || null,
    });
    return res.send({
      message: "Registered",
    });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { ID, password } = req.body;
  try {
    const patient = await findPatientByStudentId(ID);
    if (patient && password == patient.password) {
      const token = jwt.sign({ id: patient.studentid, role: "PATIENT", userType: "patient" }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.send({
        message: "Successful",
        user: { ...patient, userType: "patient" },
        token: token,
      });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.post("/check", async (req, res) => {
  try {
    const patient = await findByEmail(req.body.email);
    console.log(patient);
    if (patient) {
      return res.send({
        message: "Patient already exists",
      });
    } else {
      return res.send({
        message: "Patient does not exist",
      });
    }
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const password = req.body.password;
  try {
    await dbhelper.query("UPDATE patients SET password = $1 WHERE studentid = $2", [password, id]);
    const patient = await findPatientByStudentId(id);
    if (patient?.password === password) {
      return res.status(200).send({
        message: "password updated",
        user: { ...patient, userType: "patient" },
      });
    } else {
      return res.status(404).send({ message: `password not updated` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Serror" });
  }
});

module.exports = router;
