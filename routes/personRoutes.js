const express = require("express");

const router = express.Router();

const Person = require("../models/Person");

// ? Save the new person to the database with the outdated save method
/* router.post('/person',( req, res) => {
  const data = req.body // Assuming the request body contains the person data

  //Create a new Person document using the Mongoose model
  const newPerson = new Person (data);

  newPerson.save((error, savedPerson) => {
    if(error){
      console.log("Error saving person: ", error);
      res.status(500).json({error: 'Internal server error'});
    }else{
      console.log('data saved successfully');
      res.status(200).json(savedPerson);
    }
  });
});  */

// * Save the new person to the database with await and async
router.post("/", async (req, res) => {
  try {
    console.log(req);
    const data = req.body; // Assuming the request body contains the person data
    const newPerson = new Person(data); // Create a new Person document using the Mongoose model
    const response = await newPerson.save(); // Save the new person to the database
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get person data
router.get("/", async (req, res) => {
  try {
    console.log(req)
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Updated Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter

    // Assuming you have a Person Model object
    const response = await Person.findByIdAndRemove(personId);

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Deleted Successfully");
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
