import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import mongoose from "mongoose";

export async function signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are reuired!!!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address!!!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!!!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!!!" });
  } catch (e) {
    console.log("Error in SignUp controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existingUserByEmail = await User.findOne({ email: email });
    if (!existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist!!!" });
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      existingUserByEmail.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password!!!" });
    }
    generateTokenAndSetCookie(existingUserByEmail._id, res);

    res.status(200).json({ success: true, message: "Login successful!!!" });
  } catch (e) {
    console.log("Error in Login controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-event");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!!!" });
  } catch (e) {
    console.log("Error in Logout controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function createEvent(req, res) {
  try {
    const { title, description, date, location, maxAttendees, imageUrl } =
      req.body;

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !maxAttendees ||
      !imageUrl
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    if (maxAttendees <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Max attendees must be greater than 0!",
        });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      imageUrl,
      owner: req.user._id,
    });

    await newEvent.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Event created successfully!",
        event: newEvent,
      });
  } catch (error) {
    console.log("Error in addEvent controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const { title, description, date, location, maxAttendees, imageUrl } =
      req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event ID!" });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found!" });
    }

    // Check if the user is authorized to update the event
    if (event.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to update this event!",
        });
    }

    // Update fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.maxAttendees = maxAttendees || event.maxAttendees;
    event.imageUrl = imageUrl || event.imageUrl;

    await event.save();

    res
      .status(200)
      .json({ success: true, message: "Event updated successfully!", event });
  } catch (error) {
    console.error("Error in updateEvent controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found!" });
    }

    if (event.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete this event!",
        });
    }

    await event.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteEvent controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function getUserEvents(req, res) {
  try {
    // console.log("User ID:", req.user._id);  // Log the user ID
    const events = await Event.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    //  console.log("Found events:", events);  // Log the found events
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this user" });
    }
    res.status(200).json(events);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching events", error: error.message });
  }
}
