const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const joi = require('joi');

const companies = require('../../Companies');

// gets all the companies
router.get('/', (request,response) => {
    response.json(companies);
});

// get single compnay info
router.get('/:id', (request, response)=>{
    const found = companies.some( (company) => company.id === parseInt(request.params.id) );
    if( found )
    {
        let companyById = companies.filter( 
            // === not works since company.id is number and request.params.id is string
            (company)=> company.id === parseInt(request.params.id) 
            );
                    
        response.send(companyById);
    }
    else{
        response.status(400).json({message: "Error Found"});
    }
    
});

// create a company
router.post('/', (request, response) => {
    const schema = {
        name: joi.string().min(5).required(),
        category: joi.string().min(3).required(),
        start: joi.number(),
        end: joi.number()
    }
    const result = joi.validate(request.body, schema);
    const { error } = joi.validate(request.body, schema); //error is a property in result
    if(error)
    {
        response.sendStatus(403).send(error.details[0].message);
    }
    const newCompany = {
        id: uuid.v4(),
        name: request.body.name,
        category: request.body.category,
        start: request.body.start,
        end: request.body.end
    }
    if(!newCompany.name && !newCompany.category)
    {
        response.status(400).json({message: "Please Enter the name and category"});
    }
    companies.push(newCompany);
    response.send(newCompany);
    // response.redirect('/');
});

// update the company details
router.put('/:id', (request, response)=>{
    const found = companies.some( (company) => company.id === parseInt(request.params.id) );
    if( found )
    {
        const updatedCompany = request.body;
        companies.forEach( (company)=>{
            if(company.id === parseInt(request.params.id))
            {
                company.name = updatedCompany.name ? updatedCompany.name : company.name;
                company.category = updatedCompany.category ? updatedCompany.category : company.category;
                company.start = updatedCompany.start ? updatedCompany.start : company.start;
                company.end = updatedCompany.end ? updatedCompany.end : company.end;
                response.send({message: "Company data updated", company});
            }
        } );
                    
        response.send(companyById);
    }
    else{
        response.status(400).json({message: "Error Found"});
    }
    
});

// delete a company data
router.delete('/:id', (request, response)=>{
    const found = companies.some( (company) => company.id === parseInt(request.params.id) );
    if( found )
    {
     response.json({
        message: "deleted", 
        updatedData: companies.filter( (company) => company.id !== parseInt(request.params.id) )
     });
    }
    else{
        response.status(400).json({message: "Error Found"});
    }
    
});

module.exports = router;