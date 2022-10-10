import User from "../../models/User";

export default async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, userName, location },
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      userName,
      location,
    },
    {
      new: true,
    }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};
