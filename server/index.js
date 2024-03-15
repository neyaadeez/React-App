const express = require('express');
const db = require('./db');
const User = require('./models/user');
const router = express();

router.post('/users', async (req, res) =>{
    console.log(req.body);
    const {name, email, password} = req.body;

    try{
        const user = new User({name, email, password});
        await user.save();
        res.send(user);

    }catch(e){
        console.error(e);
    }
});

router.get('/users', async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        console.error(e);
    }
});

router.put('/users/:id', async (req, res)=>{
    const {id} = req.params;
    const {name, email, password} = req.body;

    try{
        const user = await User.findByIdAndUpdate(id, {name, email, password}, {new: true});
        res.send(user);
    }catch(e){
        console.error(e);
    }
});

router.delete('/user/:id', async (req, res)=>{
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        res.send(user);
    }catch(e){
        console.error(e);
    }
});





// const app = express();
// app.use(bodyParser.json());
// app.use('/', routes);

const PORT = 3001;
router.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});