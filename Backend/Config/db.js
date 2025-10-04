const mongoose= require('mongoose');

const Dbconnection = async()=>{
    try {
        await mongoose
            .connect("mongodb+srv://lokeshwagh675_db_user:3ruf4XT5JLS5vjwS@management.ep03x3n.mongodb.net/?retryWrites=true&w=majority&appName=management")
            console.log("Db connect successFully")
    } catch (error) {
        console.log("Error Occur While Coonect");
    }
            
}

module.exports=Dbconnection;