
const TaskModel=require('../Models/Task.Model.js');



exports.createTask=async(req,res)=>{




    try{

let reqBody=req.body
 reqBody.email=req.headers['email'];
 let result=await TaskModel.create(reqBody);
 res.status(200).json({status:'Success', data:result})


    }catch(e){
res.status(200).json({status:'Failed', data:e})
    }
}


exports.deleteTask=async(req,res)=>{


try{


    let id=id.params.id;
    let Query={_id:id}
    let result= await TaskModel.deleteOne(Query);

    res.status(200).json({status:"Success", data:result})
}catch(e){

    res.status(200).json({status:"Failed", data:e})
}

}


exports.updateTask=async(req,res)=>{


    try{
let id=req.params.id;
let status=req.params.status;
let Query={_id:id};
let reqBody={status:status}
let result= await TaskModel.updateOne(Query,reqBody)

res.status(200).json({status:"Success", data:result})


    }catch(e){


res.status(200).json({status:"Failed", data:e})
    }

}

exports.listTaskByStatus=async(req,res)=>{



try{

let status=req.params.status;
let email=req.headers['email'];
let result= await TaskModel.find({ email:email,status:status})

res.status(200).json({status:"Success", data:result})





}catch(e){

res.status(200).json({status:"Failed", data:e})


}


}


exports.taskStatusCount=async(req,res)=>{


    let email= req.headers['email'];
    let result= await TaskModel.aggregate([

        {$match:{email:email}},
        {$group:{_id:'$status',sum:{$count:{}} }}

    ])
}







