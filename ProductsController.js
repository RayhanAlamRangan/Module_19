

const ProductModel=require('../Models/ProductModel');

// create

exports.createProduct=async(req,res)=>{

    let reqBody=req.body;
let result=await ProductModel.create(reqBody);

try{

    res.status(200).json({status:'Product Created Successfully', data:result})
}catch(e){
    res.status(400).json({status:'Failed to Data', data:e})
}
}

/*
if(err){
    res.status(400).json({status:'Failed',data:err})
}else{
res.status(200).json({status:'Product Created Successfully', data:data})

}*/





// Read All Product
exports.readProducts=async(req,res)=>{
    try{
    
        let Query={}
        let Projection="ProductName ProductCode Img UnitPrice Qty TotalPrice "  
        let result= await ProductModel.find(Query,Projection);
        res.status(200).json({status:'Success All Product Showed', data:result});
    }catch(e){
    res.status(400).json({status:'Failed',status:result});
    
    }
       
        
    }

exports.updateProduct=async(req,res)=>{

    try{
    let id=req.params.id;
    let Query={_id:id};
    let reqBody=req.body;

  let result= await ProductModel.updateOne(Query,reqBody);
  res.status(200).json({status:'Product Update Successfully',data:result})
    }catch(e){

        res.status(400).json({status:'Product Update Failed', data:e})
    }



}

//Delete Product

exports.deleteProduct=async(req,res)=>{


    try{
let id=req.params.id;
let  Query={_id:id}

let result= await ProductModel.remove(Query);
res.status(200).json({status:'Product Delete Successfully', data:result})
}catch(e){

    res.status(200).json({status:'Product Not Delete',data:e})
}

}
    