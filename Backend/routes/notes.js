const express = require("express");
const router  = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require("express-validator");


// Route 1: Get All the notes using : GET "/api/auth/fetchallnotes" - Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch(err){
        console.error(err.message);
        res.status(500).send("Some Error Occured!!!");
    }
    
})

// Route 2: Add a note using : POST "/api/auth/addnote" - Login required
router.post('/addnote', fetchuser,  [ 
    body("title", "Enter a valid Title").isLength({min: 3}),
    body("description", "Description must be atleast 5 chaarcters !").isLength({min: 5}),
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        // If there are errors return bad request and errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = note.save();
        res.send(note);
    } catch(err){
        console.error(err.message);
        res.status(500).send("Some Error Occured!!!");
    }
    
});

// Route - 3: Update note of existing user using: PUT "/api/notes/updatenote" Login required. 
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        // Create new Note object
        const newNote = {};
        if(title){newNote.title = title;}
        if(description){newNote.description = description;}
        if(tag){newNote.tag = tag;}

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!!!")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.send(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Error Occured!!!");
    }
    
})

// Route - 4: Delete note of existing user using: DELETE "/api/notes/deletenote" Login required. 
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!!!")}

        //Allow deletion oly if user ownes it 
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Error Occured!!!");
    }
    
})

module.exports = router;