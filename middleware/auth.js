const jwt=require('jsonwebtoken');
const axios=require('axios');
//wants to like a post
//click the like button =>auth middleware(NEXT)=>like constroller...
const googleSecret="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";
const auth=async (req,res,next)=>{
    try{
        // console.log(req.headers.authorization,'hiii')
        const token=req.headers.authorization.split(" ")[1];
        let decodedData;
        try{
            console.log('hiii')
            decodedData=jwt.verify(token,'test');
            req.userId=decodedData?.id;
        }catch(err){
            console.log('byee')
            const data=await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
            // console.log(data);
            req.userId=data.data.user_id;
            // console.log(req.userId,'hiiiiii');
        }
        next();
    }catch(err){
        console.log(err)
    }
}
module.exports=auth;