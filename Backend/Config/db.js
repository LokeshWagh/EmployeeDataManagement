const mongoose= require('mongoose');

const Dbconnection = async()=>{
    mongoose
            .connect("")
            .then((conn)=>`The hosting is ${conn.connection.host}`)
            .catch(err =>{
                console.log(err);
            }) 
            
}

module.exports=Dbconnection;