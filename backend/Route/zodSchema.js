const zod = require("zod");

const SignupSchema = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastname: zod.string(),
	password: zod.string()
})

const SigninSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
})

const updatebody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastname: zod.string().optional()
})


module.exports = {
    SignupSchema,
    SigninSchema,
    updatebody,
};