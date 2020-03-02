import bcrypt from "bcryptjs";

import Mongo from "server/index";
import Admin from "server/models/admin";

const responses = {
  BAD_EMAIL: "There is no account currently associated with this email.",
  BAD_PASSWORD: "The password you entered is incorrect. Please try again.",
  USER_EXISTS: "A user with these credentials already exists."
};

export async function login(email, password) {
  await Mongo();

  return Admin.findOne({ email: email }).then(admin => {
    if (admin) {
      return bcrypt.compare(password, admin.password).then(result => {
        return result
          ? Promise.resolve(admin)
          : Promise.reject(new Error(responses.BAD_PASSWORD));
      });
    } else {
      return Promise.reject(new Error(responses.BAD_EMAIL));
    }
  });
}

export async function signup(fname, lname, email, password, org) {
  await Mongo();

  return Admin.countDocuments({ email: email })
    .then(count => {
      return !count
        ? bcrypt.hashSync(password, 10)
        : Promise.reject(new Error(responses.USER_EXISTS));
    })
    .then(hashedPassword => {
      Admin.create({
        firstName: fname,
        lastName: lname,
        email: email,
        password: hashedPassword,
        org: org
      });
    });
}
