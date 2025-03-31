import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

const helper = {
    createToken: (id) => {
        return jsonwebtoken.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
    },

    matchPassword: async (enteredPassword, hashedPassword) => {
        return await bcrypt.compare(enteredPassword, hashedPassword);
    },
};

export default helper;
