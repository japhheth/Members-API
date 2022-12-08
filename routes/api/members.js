const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//Get all members
router.get("/", (req, res) => {
  res.json(members);
});

//Get single member
router.get("/:id", (req, res) => {
  let member;
  const found = members.some(
    (member) => member.id === parseInt(req.params?.id)
  );

  if (found) {
    member = members.find((member) => member.id === parseInt(req.params?.id));
    res.json({
      data: member,
      success: true,
    });
  } else {
    res.status(400),
      res.json({
        data: [],
        error: `No member with id ${req.params?.id} was found`,
        success: false,
      });
  }
});

//Create a new member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ message: "Please fill in the name and email address" });
  }

  members.push(newMember);

  //   res.json({
  //     data: newMember,
  //     message: "New member added successfully",
  //     status: "success",
  //   });
  res.redirect("/");
});

// Update a member
router.put("/:id", (req, res) => {
  const updatedMember = req.body;
  const found = members.some(
    (member) => member.id === parseInt(req.params?.id)
  );

  if (found) {
    members.forEach((member) => {
      if (member.id === parseInt(req.params?.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({
          data: member,
          success: true,
          message: "Member updated successfully",
        });
      }
    });
  } else {
    res.status(400),
      res.json({
        data: [],
        error: `No member with id ${req.params?.id} was found`,
        success: false,
      });
  }
});

//Delete a member
router.delete("/:id", (req, res) => {
  let member;
  const found = members.some(
    (member) => member.id === parseInt(req.params?.id)
  );

  if (found) {
    res.json({
      data: members.filter((member) => member.id !== parseInt(req.params?.id)),
      success: true,
      message: `Member with id ${req.params?.id} was deleted successfully`,
    });
  } else {
    res.status(400),
      res.json({
        data: [],
        error: `No member with id ${req.params?.id} was found`,
        success: false,
      });
  }
});

module.exports = router;
