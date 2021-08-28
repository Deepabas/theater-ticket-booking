const users = require('../models/rolemodel')
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const {SECRET} = require('../models/app')
const passport = require("passport")
const nodemailer = require("nodemailer")


const userRegister = async (userDet,role,res)=>{
    //validate the username
    try {
        console.log(userDet)
        let usernameNotTaken = await validateUsername(userDet.username);
        if(!usernameNotTaken){
            return res.status(400).json({
                message:`Username is already taken`,
                success:false
            })
        }
        //validate the email
        let emailNotRegistered = await validateEmail(userDet.email);
        if(!emailNotRegistered){
            return res.status(400).json({
                message:`Email is already registered`,
                success:false
            })
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
              auth: {
                user:  process.env.SMTP_USERNAME,
                pass:  process.env.SMTP_PASSWORD
    }
            });
    
        //get the  hashed password
        const hashPassword = await bcrypt.hash(userDet.password, 12)
        console.log(hashPassword)
        //create new  user
        const newUser = new users({
            ...userDet,
            password:hashPassword,
            role
        })
    
        await newUser.save();
        var id=newUser._id
        var mailOptions = {
            from:'deepabaskaran.b@gmail.com',
            to:userDet.email,
            subject:'Sending Email using Node.js',
        html:  `<p>Click<a href="http://localhost:3000/users/${id}">here</a>welcome to my website</p>`
    
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log('Email sent:' + info.response)
        }
        res.send('register and mail sending successfully')
    })
        return res.status(201).json({
            message:"Hurry! now you are successfully registered.please now login",
            success:true
        });

    }
    catch(err){
        console.log(err)
    //implement logger function
    return res.status(500).json({
        message:"Unable to create your account",
        // err:err,
        success:false
        });
    }
    }
    //valid login
    const userLogin = async(userCred,role,res) =>{
    let {username,password} = userCred;
    //first check if the username is in the  database
    const user = await users.findOne({username})
    if(!user){
        return res.status(404).json({
            message:"username  is not found. Invalid  login credentials",
            success:false
        })
    }
    //we will check the role
    if(user.role !==  role){
        return res.status(403).json({
            message:"please make sure you are logging in from the right portal",
            success:false
        })
    }
    //we will check the verified true or false
    if(user.verified !==  true){
        return res.status(403).json({
            message:"first check your mail verification  link",
            success:false
        })
    }

    //that means user is  existing and trying to signin for th  right portal
    //now check for the password
    let isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
        //sign in the token and issue it to the user
    let token = jwt.sign( {
        user_id:user._id,
        role:user.role,
        username:user.username
    },
    SECRET,{expiresIn:"7 days"})
    let result ={
        username:user.username,
        role:user.role,
        token:`Bearer ${token}`,
        expiresIn:168
    }
    return res.status(200).json({
        ...result,
        message:"Hurray! you are now logged in",
        success:true
    })
    }
    else{
        return res.status(403).json({
            message:"Incorrect password ",
            success:false
        })
    }
    }
    
    //check role middleware
    const checkRole = roles =>(req,res,next)=>
    !roles.includes(req.user.role) ? res.status(401).json("unauthorized"):next();
    
    const validateUsername = async username => {
        let user = await users.findOne({ username });
        return user? false:true;
    }
    
    //passport jwt  middleware
    const userAuth = passport.authenticate("jwt",{session:false});
    
    const validateEmail = async email => {
        let user = await users.findOne({ email });
        return user? false:true;
    }
    
    const serializerUser = user =>{
        return{
            username:user.username,
            email:user.email,
            role:user.role,
            name:user.name,
            password:user.password
        }
    }

    //mail  inside url verified
    const verifyUser = async(req,res) =>{
        const id = req.params.id;
        await users.findOneAndUpdate({ _id: id },
             {verified: true});
    res.send("successfully register your account")
    }

    module.exports={
        serializerUser,userLogin,userRegister,userAuth,checkRole,verifyUser}