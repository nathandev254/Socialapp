import sql from 'mssql';

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

export const createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, userId)
      .input("post_id", sql.Int, postId)
      .query(
        "INSERT INTO Comments (content, user_id, post_id) VALUES (@content, @userId, @postId)"
      );
      res.status(200).json({ message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("post_id", sql.Int, postId)
      .query("SELECT * FROM Comments WHERE post_id = @postId");

    const comments = result.recordset;
    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("comment_id", sql.Int, commentId)
      .query("DELETE FROM Comments WHERE comment_id = @commentId");
      res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("comment_id", sql.Int, commentId)
      .input("content", sql.VarChar, content)
      .query(
        "UPDATE Comments SET content = @content WHERE comment_id = @commentId"
      );
      res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



