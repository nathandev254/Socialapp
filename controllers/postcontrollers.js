import sql from "mssql";

const config = {
  user: "sa",
  password: "1234",
  server: "Nathan",
  database: "SOCIALAPP",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const createPost = async (req, res) => {
  try {
    const { title, content, id } = req.body;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, id)
      .query(
        "INSERT INTO Posts (title, content, user_id) VALUES (@title, @content, @user_id)"
      );
      res.status(200).json({ message: "Post created successfully" });
  }
   catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getPosts = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Posts");
    const posts = result.recordset;
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId, title, content } = req.body;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("post_id", sql.Int, postId)
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .query(
        "UPDATE Posts SET title = @title, content = @content WHERE post_id = @postId"
      );
      res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("post_id", sql.Int, postId)
      .query("DELETE FROM Posts WHERE post_id = @postId");

      res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



