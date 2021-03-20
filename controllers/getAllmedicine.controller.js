const medicineModel=require('../models/medicine.model');
module.exports.getAllMedicine=async (req,res)=>{
    
    let medicine=await medicineModel.find({}).select("medicineName price");
 res.json(medicine);
}


module.exports.addMedicine=async (req,res)=>{
    let medicineName=['PANDERMAL OINT. 15 GM','mesna','VITAMAX 30 CAPSULES','ASPIRIN 500mg 10tab.','BETASERC 24 mg 20 tab.','BIOTENE (250ml) mouthwash','CARDURA XL4mg prolonged release tabs.','CATAFAST 50mg sachet','DIASTOP 60ml susp.',
'EBASTINE-BORG 10mg f.c. tabs.','ELASTICIN DS 10f.c.tablet','FUTASOLE 2% oint.','ACNE ZINC topical solution 20 ML','AMLOZAPRIL 10/20mg hard gelatin 10Caps.','CONCOR 5mg 30 F.C. TABS','CONGESTAL 10 TABLETS',
'POWER Caps 20 Caps.','PANADOL EXTRA 24 f.c. tab.','TRIAMINIC ORAL COLD DROPS 15 ML','ISOPTO CETAMIDE 150mg/ml eye drops','NAPHCON A eye drops','OCUSUL 20% eye drops','C-VIT drops 10 gm/100 ml 15 ml',
'VITAMIN E 1000mg soft gelatin cap.	','VITAMIN C 500mg C.R.caps.','B12 DEPOT 1000mcg amp.','OMEGA-3 PLUS 20 CAPSULES','PANTOMX TOPICAL CREAM 30 GM','HEMOCURE 0.5% gel',
'WELEVON 10 CAPS.','JUVIEX SYRUP 120 ML','XEFO 8mg/2ml vial for I.M./I.V. inj.','ACCOLATE 20mg 28 tab.','BETACORE 80mg 30 tab.','MYOLASTAN 50mg coated 20tab.','EPIFENAC 0.1% eye drops	','ZOFRAN 4mg/2ml 5 amp. For I.V/I.M inj.','VITACID C 500mg eff. Gran. In sachets',
'1,2,3 (One Two Three) 20 f.c.tab.','YAZ 28 TABLETS	','GREENY 20 SOFT GELATIN CAPS.	','KEMIFORGE 5mg/320mg 10 F.C. tab.	','BECLOSONE 0.025% 20gram cream','MAA GHARIBE BAMBINO SYRUP 120 ML	','LEVAMISOLE 40mg 3tab.',
'SORDEVAN 160 mg 7f.c.tab.','PANTHO EVA 5% emulgel','GENTAMICIN 40mg/ml Solution for I.M/I.V injection	','MINIRIN 10mcg/dose nasal spray','CITALO 2mg/ml oral solution','DIAMOND 200ML HAIR LOTION','ECODERM 1% topical lotion','GAPTIN 250mg/5ml oral solution']
    for(let i=0;i<medicineName.length;i++){
        // var r = Math.floor(Math.random() * 100) + 1;
        // console.log(r);
        function check_rand(){
            var rand = Math.floor(Math.random() * 100) + 1;
            if(rand<10||rand>150){
                check_rand();
            }
            else{
                return rand
            }
        }
      //  var generated_rand=check_rand();
            medicineModel.insertMany({medicineName:medicineName[i],price:check_rand()})
    }
    res.json('Success');
}