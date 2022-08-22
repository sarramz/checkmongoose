
//install and set up mongoose
const mongoose=require('mongoose');
// let validator=require('validator');
//create a person model

//this is how we create a schema 
const personSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
        favoriteFoods:[{
            type:String
        }]

    }
);

module.exports=mongoose.model('Person',personSchema);


