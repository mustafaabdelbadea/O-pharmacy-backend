module.exports.reportProblem=async(req,res)=>{
  const nodemailer = require("nodemailer");

  try {
          
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "OpharmacyTeam@gmail.com", // generated ethereal user
                pass: "OPharmacy@123", // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: req.body.email, // sender address
              to: "OpharmacyTeam@gmail.com", // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: `
     
       <div style="background-color:#000;color:#fff; padding:100px">
       
     <h1 style="margin:50px">  Sender: ${ req.body.email}</h1>
     <h2 style="margin:50px">  role: ${ req.body.role}</h2>
     <h2 style="margin:50px"> phone   ${ req.body.phone}</h2>
     <p style="margin:50px"> problem:   ${ req.body.problem}</p>

       </div>
   
   
       `, // html body

            }, (error) => {

              if (error)
                console.log(error);
              else
               res.json({message:'email sent'});
            });
          
  } catch (error) {
    console.log(error)
  }
       
}