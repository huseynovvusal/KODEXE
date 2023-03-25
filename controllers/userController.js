import User from "../models/userModel.js";

class userConstoller {
  static async createUser(req, res) {
    try {
      const user = await User.create({ ...req.body });

      console.log(user);
    } catch (error) {
      if (error.code == 11000) {
        if ("username" in error.keyPattern)
          console.log(
            "Bu adda istifadəçi mövcudur. Başqa istifadəçi adı daxil edin"
          );
        if ("email" in error.keyPattern)
          console.log(
            "Bu email istifadə olunub. Başqa mövcud email daxil edin"
          );
      } else console.log(error);
    }
  }
}

export default userConstoller;
