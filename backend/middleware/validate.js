const zod = require('zod')

const regbody = zod.object({
    username : zod.string().min(3),
    email : zod.string().email(),
    password : zod.string().min(4),
    bio : zod.string(),
})

const logbody = zod.object({
    email : zod.string().email(),
    password : zod.string().min(4)
})

const createTask = zod.object({
    title : zod.string(),
    description : zod.string().optional()
})

module.exports = {
    regbody,
    logbody,
    createTask
}