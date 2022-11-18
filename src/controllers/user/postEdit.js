import User from "../../models/User";

export default async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, userName, location },
    file,
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      userName,
      location,
      ...(file && { avatarUrl: file.path }),
    },
    {
      new: true,
    }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};
