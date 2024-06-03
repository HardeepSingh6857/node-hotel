const express = require("express");

const router = express.Router();

const Person = require("../models/Person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

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
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data
    const newPerson = new Person(data); // Create a new Person document using the Mongoose model
    const response = await newPerson.save(); // Save the new person to the database
    
    const payload = {
      id: response.id,
      username: response.username,
    }
    console.log("payload : ",JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("data saved");

    
    console.log("Token is : ", token);
    res.status(200).json({response: response, token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Get method to get person data
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
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
    console.log(personId);
    
    // Assuming you have a Person Model object
    const response = await Person.findByIdAndDelete(personId);
    console.log(response);

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Deleted Successfully");
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
