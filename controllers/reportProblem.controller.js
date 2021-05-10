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
              to: ["OpharmacyTeam@gmail.com",req.body.email], // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: `
          
      <div style=" background-color: #f3f8ff; width: 75%; margin: auto; text-align: center; padding: 1.5rem; font-size: 1.5rem;  ">            
          <h3 style="color:#000" class="text-white mb-4" >report problem </h3>
          <h3 style="color:#000" class="text-white mb-4" >O-Pharmacy just received a problem from ${ req.body.role} ${req.body.name}</h3>
          <h4 style="color:#000; margin-bottom: 1.5rem;">problem details :"${req.body.problem}"</h4>
          <h5 style="color:#000" >and we will contact with ${req.body.role} ${req.body.name} in sooner time as possible on <br> phone :"${ req.body.phone}" , email:"${req.body.email}"</h5>
          <p style=" margin-bottom: 1.5rem; font-size: medium; color:#000"> Thanks you for interest. <br> <span style="font-size: large; font-weight: bold;">O-Pharmacy</span> hope you enjoy your account and your problem will take in consideration.</p>
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