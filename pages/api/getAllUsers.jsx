import connectDB from "../middleware/mongoose";
import User from '../../models/User';
import Post from '../../models/Post'; // Assuming Post model is imported correctly

const handler = async (req, res) => {
  try {
    // Aggregation to join User and Post collections and count posts per user
    const authors = await User.aggregate([
      {
        $lookup: {
          from: "posts", // Posts collection
          localField: "_id", // User _id
          foreignField: "author", // Author field in Post collection
          as: "posts" // Create an array of posts for each user
        }
      },
      {
        $project: {
          username: 1, // Include username or other fields from User model
          postsCount: { $size: "$posts" } // Count the number of posts for each user
        }
      },
      {
        $match: {
          postsCount: { $gt: 1 } // Filter authors with more than 1 post
        }
      }
    ]);

    res.status(200).json({ success: true, data: authors });
  } catch (error) {
    console.error('Error fetching authors with post count:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching authors' });
  }
};

export default connectDB(handler);
