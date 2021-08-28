const router = require('express').Router();
const {userRegister,userLogin,userAuth,serializerUser,checkRole,verifyUser
 } = require('../controllers/authcontroller')


//users registration route
router.post('/reg-user',async(req,res)=>{
    await userRegister(req.body,"user",res)
})

//users login route
router.post('/login-user',async(req,res)=>{
    await userLogin(req.body,"user",res)
})

//users protected route
router.get('/user-protected',userAuth,checkRole(['user']),async(req,res)=>{
    return res.json(await serializerUser(req.user))
})

//mail inside route
router.get('/users/:id',async (req,  res) => {
    await verifyUser(req,res)
  })



module.exports = router;