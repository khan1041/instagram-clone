




import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title:{
    type:String,
},


Blogimage:{

        type: String,
        required: true,
      
},

category: {
    type: String,
    required: true,
  },
 about: {
    type: String,
    required: true,
  
  },

// adiminname:{

//  type:String,
//  required:true

// },
// adiminphoto:{
 
//     type:String,
//     required:true

// },


//  createdby: {   
//        type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// }
});
export const Blog = mongoose.model ("Blog", blogSchema);












