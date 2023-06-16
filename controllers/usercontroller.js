import sql from "mssql";
import bcrypt from "bcrypt";

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

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (username,email,password) VALUES (@username,@email,@hashedpassword)"
      );
        console.log(result)
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to register the user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Users");
    const users = result.recordset;
    // console.log(users)
    res.status(200).json({ message: "Users fetched already", users: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("user_id", sql.Int, id)
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query(
        "UPDATE Users SET username = @username, email = @email WHERE user_id = @id"
      );

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("DELETE FROM Users WHERE user_id = @userId");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
