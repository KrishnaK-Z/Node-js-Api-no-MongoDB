const express = require('express');
const Mongo = require('../../../models/Mongo');
const router = express.Router();

// To get all the posts
router.get('/', async (request,response)=>{
    try{
        const mongo = await Mongo.find();
        response.json(mongo);
    }catch(error){
        response.json({error});
    }
});

// To submit a post
router.post('/', async (request,response)=>{
    const mongo = new Mongo({
        name: request.body.name,
        category: request.body.category,
        start: request.body.start,
        end: request.body.end
    });
    
    try{
        const savedMongo = await mongo.save();
        response.json(savedMongo);
    }catch(error){
        response.json({error});
    }   
});

// To get a specific postId
router.get('/:id', async (request, response)=>{
    try{
        const post = await Mongo.findById(request.params.id);
        response.json(post);
    }catch(error){
        response.json({error});
    }
});

// To delete a specific postId
router.delete('/:id', async (request, response)=>{
    try{
        const post = await Mongo.remove({ _id: request.params.id });
        response.json(post);
    }catch(error){
        response.json({error});
    }
});

// To update a specific postId
router.delete('/:id', async (request, response)=>{
    try{
        const post = await Mongo.updateOne(
            { _id: request.params.id },
            { $set: { name: request.body.name } });
        response.json(post);
    }catch(error){
        response.json({error});
    }
});

module.exports = router;