var express = require('express');
var router = express.Router();
var attempt = 0;



//import the content
var Content = require('./content.js');
var content = Content.content;

var hasBen;
var dd;

var resetAll = function () {

    content.updateContent("D");
    content.hasBen = 'no';
    console.log(hasBen);
    
};



// Route index page
router.get('/', function (req, res) {
    var hasBen;
  resetAll();
  res.render('index');
    console.log(hasBen);
});

router.get(/index/, function (req, res) {
  var hasBen;
    resetAll();
  res.render('index');
    console.log(hasBen);
});

router.get('/challenge/verify/attempt-handler/', function (req, res) {
    
    var result = attempt++;
    
    console.log(result);
    
  if (result == 2) {
    res.redirect('fail');
  }
 else {
    res.redirect('nextGo');
  }
});

router.get('/', function (req, res) {
  attempt = 0;
  res.render('index');
});

router.get(/index/, function (req, res) {
  attempt = 0;
  res.render('index');
});

router.get(/instalment-handler/, function (req, res) {
  if (req.query.plan == "2") {
    account.instalments = 6;
    plan = 172;
  } else {
    account.instalments = 12;
    plan = 86;
  }
  res.redirect('dates');
});

router.get('/payments/dd/contact-handler/', function (req, res) {
  hasText = false;
  hasEmail = false;
  hasLetter = false;
  if (req.query.text == 'true') {
    hasText = true;
  }
  if (req.query.email == 'true') {
    hasEmail = true;
  }
  if (req.query.letter == 'true') {
    hasLetter = true;
  }
  if (hasText) {
    res.redirect('text-value');
  } else if (hasEmail) {
     res.redirect('mail-value');
  } else if (hasLetter) {
     res.redirect('valueAddress');
  } else {
    hasText = false;
    hasEmail = false;
    hasLetter = false;
    res.redirect('yourplan');
  }
});


router.get('/contentImprov/challengeOptions/contact-handler/', function (req, res) {
  hasText = false;
  hasEmail = false;
  hasLetter = false;
  if (req.query.text == 'true') {
    hasText = true;
  }
  if (req.query.email == 'true') {
    hasEmail = true;
  }
  if (req.query.letter == 'true') {
    hasLetter = true;
  }
  if (hasText) {
    res.redirect('infoPage');
  } else if (hasEmail) {
     res.redirect('infoPage');
  } else if (hasLetter) {
     res.redirect('infoPageChallenge');
  } else {
    hasText = false;
    hasEmail = false;
    hasLetter = false;
    res.redirect('infoPageChallenge');
  }
});


// ADDRESS HANDLER FOR DIRECT DEBITS //////////////////////////////////////////////////////////////

router.get('/breakdown/dd/update-address-handler/', function (req, res) {
  if (req.query.exemption == 'yes') {
    res.redirect('summary12mth');
  }
  else if (req.query.exemption == 'no') {
    res.redirect('manualAddress');
  }
  else {
    res.redirect('summary12mth');
  }
});

router.get('/payments/dd_v2/update-address-handler/', function (req, res) {
  if (req.query.exemption == 'yes') {
    res.redirect('address-error');
  }
  else if (req.query.exemption == 'no') {
    res.redirect('manualAddress');
  }
  else {
    res.redirect('summary');
  }
});

router.get('/payments/dd_decs/update-address-handler/', function (req, res) {
  if (req.query.exemption == 'yes') {
    res.redirect('summary');
  }
  else if (req.query.exemption == 'no') {
    res.redirect('manualAddress');
  }
  else {
    res.redirect('summary');
  }
});

router.get('/payments/dd_v2_test/update-address-handler/', function (req, res) {
  if (req.query.exemption == 'yes') {
    res.redirect('summary');
  }
  else if (req.query.exemption == 'no') {
    res.redirect('manualAddress');
  }
  else {
    res.redirect('summary');
  }
});


router.get('/payments/rp/contact-handler/', function (req, res) {
  hasText = false;
  hasEmail = false;
  if (req.query.text == 'true') { 
    hasText = true;
  }
  if (req.query.email == 'true') {
    hasEmail = true;
  }
  if (hasText) {
    res.redirect('text-value');
  } else if (hasEmail) {
     res.redirect('mail-value');
  } else {
    hasText = false;
    hasEmail = false;
    res.redirect('accept');
  }
});

router.get('/payments/so/contact-handler/', function (req, res) {
  hasText = false;
  hasEmail = false;
  if (req.query.text == 'true') {
    hasText = true;
  }
  if (req.query.email == 'true') {
    hasEmail = true;
  }
  if (hasText) {
    res.redirect('text-value');
  } else if (hasEmail) {
     res.redirect('mail-value');
  } else {
    hasText = false;
    hasEmail = false;
    res.redirect('accept');
  }
});

router.get(/haha-handler/, function (req, res) {
  if (hasEmail) {
    res.redirect('mail-value');
  } else {
     res.redirect('yourplan');
  }
});

router.get(/pregnancy-handler/, function (req, res) {
  
  if (req.query.pregnant == 'yes'){ 
    content.pregnant = 'yes';
      res.redirect('mat-ben');
  } else {
      content.pregnant = 'no';
    res.redirect('cant-find-cert-decs');
  }
});

router.get(/mat-ben/, function (req, res) {
  res.render('hc3/lower2/mat-ben', {
    title : content.title,
      pregnant : content.pregnant,
      hasBen : content.hasBen,
      bens: req.query.benefits
  });
});

router.get(/endHc3/, function (req, res) {
  res.render('hc3/lower2/endHc3', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/dwpDecisionDecs/, function (req, res) {
  res.render('hc3/lower2/dwpDecisionDecs', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/mat-ben/, function (req, res) {
  res.render('hc3/higher/mat-ben', {
    title : content.title,
      pregnant : content.pregnant,
      hasBen : content.hasBen,
      bens: req.query.benefits
  });
});

router.get(/endHc3/, function (req, res) {
  res.render('hc3/higher/endHc3', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/dwpDecisionDecs/, function (req, res) {
  res.render('hc3/higher/dwpDecisionDecs', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/mat-ben/, function (req, res) {
  res.render('hc3/noPayment/mat-ben', {
    title : content.title,
      pregnant : content.pregnant,
      hasBen : content.hasBen,
      bens: req.query.benefits
  });
});

router.get(/endHc3/, function (req, res) {
  res.render('hc3/noPayment/endHc3', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/dwpDecisionDecs/, function (req, res) {
  res.render('hc3/noPayment/dwpDecisionDecs', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/mat-ben/, function (req, res) {
  res.render('hc3/same/mat-ben', {
    title : content.title,
      pregnant : content.pregnant,
      hasBen : content.hasBen,
      bens: req.query.benefits
  });
});

router.get(/endHc3/, function (req, res) {
  res.render('hc3/same/endHc3', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/dwpDecisionDecs/, function (req, res) {
  res.render('hc3/same/dwpDecisionDecs', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/dwp-exemptions-handler/, function (req, res) {
  var bens = req.query.benefits;
  var topCat;
    var hasBen;

    if (bens == "is") {
      topCat = "IS";
        content.updateContent(topCat);
        res.redirect('dwpDecisionDecs');
    } else if (bens == "esa") {
      topCat = "ESA";
        content.updateContent(topCat);
        res.redirect('dwpDecisionDecs');
    } else if (bens == "jsa") {
      topCat = "JSA";
        content.updateContent(topCat);
        res.redirect('dwpDecisionDecs');
    } else if (bens == "pc") {
      topCat = "PC";
        content.updateContent(topCat);
        res.redirect('dwpDecisionDecs');
    } else if (bens == "no") {
        res.redirect('pregnant');
    }      

    
});


router.get(/dwp-type/, function (req, res) {
  res.render('breakdown/dwp-challenge/dynamic-pages/dwp-check-name', {
    title : content.title,
    benType : content.benType
  });
});

router.get(/dwp-new-handler/, function (req, res) {
  var bens = req.query.benefits;
  var topCat;
    var hasBen;

    if (bens == "is") {
      topCat = "IS";
        content.updateContent(topCat);
        res.redirect('dwp-type');
    } else if (bens == "esa") {
      topCat = "ESA";
        content.updateContent(topCat);
        res.redirect('dwp-type');
    } else if (bens == "uc") {
      topCat = "UC";
        content.updateContent(topCat);
        res.redirect('dwp-type');
    }else if (bens == "jsa") {
      topCat = "JSA";
        content.updateContent(topCat);
        res.redirect('dwp-type');
    } else if (bens == "pc") {
      topCat = "PC";
        content.updateContent(topCat);
        res.redirect('dwp-type');
    } else
      res.redirect('dwp-we-need-proof-pecs');
    });

    router.get(/dwp-type/, function (req, res) {
      res.render('breakdown/dwp-challenge/dynamic-pages/update-name', {
        title : content.title,
        benType : content.benType
      });
    });


    router.get(/change-name/, function (req, res) {
      if (req.query.details == 'yes') {
        res.redirect('dwp-check-dob');
      }
      else if (req.query.details == 'no') {
        res.redirect('update-name');
      }
    });

    router.get(/change-dob/, function (req, res) {
      if (req.query.details == 'yes') {
        res.redirect('dwp-check-address');
      }
      else if (req.query.details == 'no') {
        res.redirect('update-dob');
      }
    });

    router.get(/change-address/, function (req, res) {
      if (req.query.details == 'yes') {
        res.redirect('check-your-answers');
      }
      else if (req.query.details == 'no') {
        res.redirect('update-address');
      }
    });

    router.get(/claim-isa/, function (req, res) {
      if (req.query.details == 'yes') {
        var benefits = "Income Support";
  var topCat = "Income Support";

        content.updateContent("Income Support");
        res.redirect('dwp-check-name');
      }
      else if (req.query.details == 'no') {
        res.redirect('dwp-bsa-exemptions');
      }
    });

    
    
        router.get(/dwp-type/, function (req, res) {
          res.render('breakdown/dwp-challenge/dynamic-pages/update-name', {
            title : content.title,
            benType : content.benType
          });
        });



        //////////////////////////
        // PECS ENQUIRY JOURNEY //
        //////////////////////////

        router.get(/taxcredit-handler/, function (req, res) {
        if (req.query.taxcredit == 'yes') {
          res.redirect('cert-number');
        }
         else if (req.query.taxcredit == 'no') {
         res.redirect('dwp-did-you-bsa');;
         }
       });
       router.get(/dwpclaiming-isa/, function (req, res) {
        if (req.query.exemptionbenefit == 'yes') {
          res.redirect('dwp-check-name-uc');
        }
         else if (req.query.exemptionbenefit == 'no') {
         res.redirect('dwp-did-you-bsa');;
         }
       });
       router.get(/bsa-handler/, function (req, res) {
        if (req.query.bsa == 'yes') {
          res.redirect('dwp-check-name-uc');
        }
        else if (req.query.bsa == 'mat') {
          res.redirect('dwp-check-name-uc');
        }
        else if (req.query.bsa == 'ppc') {
          res.redirect('dwp-check-name-uc');
        }
         else if (req.query.bsa == 'med') {
           res.redirect('dwp-check-name-uc');
         }
         else if (req.query.bsa== 'hc2') {
           res.redirect('dwp-check-name-uc');
         }
         else if (req.query.bsa == 'tc') {
           res.redirect('dwp-check-name-uc');
         }
         else if (req.query.bsa == 'no') {
           res.redirect('dwp-exemptions-pecs');
         }
       });
       router.get(/dwpexemptions-handler/, function (req, res) {
        if (req.query.benefitsdwp == 'yes') {
          res.redirect('dwp-check-name-uc');
        }
        else if (req.query.benefitsdwp == 'is') {
          res.redirect('dwp-check-name-uc');
        }
        else if (req.query.benefitsdwp == 'jsa') {
          res.redirect('dwp-check-name-uc');
        }
         else if (req.query.benefitsdwp == 'uc') {
           res.redirect('dwp-check-name-uc');
         }
         else if (req.query.benefitsdwp == 'pc') {
           res.redirect('dwp-check-name-uc');
         }
        
         else if (req.query.benefitsdwp == 'no') {
           res.redirect('dwp-we-need-proof-pecs');
         }
       });
       router.get(/updatename/, function (req, res) {
        if (req.query.details == 'yes') {
          res.redirect('dwp-check-dob');
        }
         else if (req.query.details == 'no') {
         res.redirect('dwp-update-name');;
         }
       });

       router.get(/checkdob/, function (req, res) {
        if (req.query.detailsdob == 'yes') {
          res.redirect('dwp-check-address-pecs');
        }
         else if (req.query.detailsdob == 'no') {
         res.redirect('dwp-update-dob');;
         }
       });

       router.get(/checkaddress/, function (req, res) {
        if (req.query.detailsaddress == 'yes') {
          res.redirect('dwp-check-your-answers');
        }
         else if (req.query.detailsaddress == 'no') {
         res.redirect('dwp-update-address-uc-pecs');;
         }
       });

       

// Postcode route
router.get(/postcode-handler/, function (req, res) {
  if (req.query.postcode == 'NE1 3JA') {
    res.redirect('view-dwp-challenge-pecs');
  } else if (req.query.postcode == 'NE2 4XL') {
    res.redirect('view-dwp-challenge-pecs-copy');;
  }
  else {
    res.redirect('unable-to-confirm-id');
  }
});  





//////////////////
// DECS JOURNEY //
//////////////////

router.get(/taxcredit-handler-copy/, function (req, res) {
  if (req.query.taxcredit == 'yes') {
    res.redirect('cert-number');
  }
   else if (req.query.taxcredit == 'no') {
   res.redirect('dwp-did-you-bsa');;
   }
 });
 router.get(/dwpclaiming-isa-copy/, function (req, res) {
  if (req.query.exemptionbenefit == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.exemptionbenefit == 'no') {
   res.redirect('dwp-did-you-bsa');;
   }
 });
 router.get(/bsa-handler-copy/, function (req, res) {
  if (req.query.bsa == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.bsa == 'mat') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.bsa == 'ppc') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.bsa == 'med') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa== 'hc2') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa == 'tc') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa == 'no') {
     res.redirect('dwp-exemptions-decs');
   }
 });
 router.get(/dwpexemptions-handler-copy/, function (req, res) {
  if (req.query.benefitsdwp == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.benefitsdwp == 'is') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.benefitsdwp == 'jsa') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.benefitsdwp == 'uc') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.benefitsdwp == 'pc') {
     res.redirect('dwp-check-name-uc');
   }
  
   else if (req.query.benefitsdwp == 'no') {
     res.redirect('dwp-we-need-proof-decs');
   }
 });
 router.get(/updatename-copy/, function (req, res) {
  if (req.query.details == 'yes') {
    res.redirect('dwp-check-dob');
  }
   else if (req.query.details == 'no') {
   res.redirect('dwp-update-name');;
   }
 });

 router.get(/checkdob-copy/, function (req, res) {
  if (req.query.detailsdob == 'yes') {
    res.redirect('dwp-check-address-decs');
  }
   else if (req.query.detailsdob == 'no') {
   res.redirect('dwp-update-dob');;
   }
 });

 router.get(/checkaddress-copy/, function (req, res) {
  if (req.query.detailsaddress == 'yes') {
    res.redirect('dwp-check-your-answers');
  }
   else if (req.query.detailsaddress == 'no') {
   res.redirect('dwp-update-address-uc-decs');;
   }
 });


// Postcode route
router.get(/postcodehandler-copy/, function (req, res) {
if (req.query.postcode == 'NE1 3JA') {
res.redirect('view-dwp-challenge-decs');
} else if (req.query.postcode == 'NE2 4XL') {
res.redirect('view-dwp-challenge-decs-copy');;
}
else {
res.redirect('unable-to-confirm-id');
}
});  





//////////////////////
// PECS PCN JOURNEY //
//////////////////////


router.get(/taxcredit-handler-pcn/, function (req, res) {
  if (req.query.taxcredit == 'yes') {
    res.redirect('cert-number');
  }
   else if (req.query.taxcredit == 'no') {
   res.redirect('dwp-did-you-bsa');;
   }
 });
 router.get(/dwpclaiming-isa-pcn/, function (req, res) {
  if (req.query.exemptionbenefit == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.exemptionbenefit == 'no') {
   res.redirect('dwp-did-you-bsa');;
   }
 });
 router.get(/bsa-handler-pcn/, function (req, res) {
  if (req.query.bsa == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.bsa == 'mat') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.bsa == 'ppc') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.bsa == 'med') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa== 'hc2') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa == 'tc') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa == 'no') {
     res.redirect('dwp-exemptions-pecs');
   }
 });
 router.get(/dwpexemptions-pcn/, function (req, res) {
  if (req.query.benefitsdwp == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.benefitsdwp == 'is') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.benefitsdwp == 'jsa') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.benefitsdwp == 'uc') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.benefitsdwp == 'pc') {
     res.redirect('dwp-check-name-uc');
   }
  
   else if (req.query.benefitsdwp == 'no') {
     res.redirect('cant-find-cert-pecs');
   }
 });
 router.get(/updatename-pcn/, function (req, res) {
  if (req.query.details == 'yes') {
    res.redirect('dwp-check-dob');
  }
   else if (req.query.details == 'no') {
   res.redirect('dwp-update-name');;
   }
 });

 router.get(/checkdob-pcn/, function (req, res) {
  if (req.query.detailsdob == 'yes') {
    res.redirect('dwp-check-address-pecs');
  }
   else if (req.query.detailsdob == 'no') {
   res.redirect('dwp-update-dob');;
   }
 });

 router.get(/checkaddress-pcn/, function (req, res) {
  if (req.query.detailsaddress == 'yes') {
    res.redirect('dwp-check-your-answers');
  }
   else if (req.query.detailsaddress == 'no') {
   res.redirect('dwp-update-address-uc-pecs');;
   }
 });

 

// Postcode route
router.get(/postcodehandler-pcn/, function (req, res) {
if (req.query.postcode == 'NE1 3JA') {
res.redirect('penalty-view-pecs');
} else if (req.query.postcode == 'NE2 4XL') {
res.redirect('penalty-view-pecs-copy');;
}
else {
res.redirect('unable-to-confirm-id');
}
});  


//////////////////////
// DECS PCN JOURNEY //
//////////////////////


router.get(/taxcredit-handler-pcn-decs/, function (req, res) {
  if (req.query.taxcredit == 'yes') {
    res.redirect('cert-number');
  }
   else if (req.query.taxcredit == 'no') {
   res.redirect('dwp-did-you-bsa');;
   }
 });
 router.get(/dwpclaiming-isa-pcn-decs/, function (req, res) {
  if (req.query.exemptionbenefit == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.exemptionbenefit == 'no') {
   res.redirect('dwp-did-you-bsa');;
   }
 });
 router.get(/bsa-pcndecs/, function (req, res) {
  if (req.query.bsa == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.bsa == 'mat') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.bsa == 'ppc') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.bsa == 'med') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa== 'hc2') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa == 'tc') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.bsa == 'no') {
     res.redirect('dwp-exemptions-decs');
   }
 });

 router.get(/dwpexemptions-decs-pcn/, function (req, res) {
  if (req.query.benefitsdwp == 'yes') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.benefitsdwp == 'is') {
    res.redirect('dwp-check-name-uc');
  }
  else if (req.query.benefitsdwp == 'jsa') {
    res.redirect('dwp-check-name-uc');
  }
   else if (req.query.benefitsdwp == 'uc') {
     res.redirect('dwp-check-name-uc');
   }
   else if (req.query.benefitsdwp == 'pc') {
     res.redirect('dwp-check-name-uc');
   }
  
   else if (req.query.benefitsdwp == 'no') {
     res.redirect('cant-find-cert-decs');
   }
 });



 router.get(/updatename-pcn-decs/, function (req, res) {
  if (req.query.details == 'yes') {
    res.redirect('dwp-check-dob');
  }
   else if (req.query.details == 'no') {
   res.redirect('dwp-update-name');;
   }
 });

 router.get(/dob-pcn-decs/, function (req, res) {
  if (req.query.detailsdob == 'yes') {
    res.redirect('dwp-check-address-decs');
  }
   else if (req.query.detailsdob == 'no') {
   res.redirect('dwp-update-dob');;
   }
 });

 router.get(/address-decs-pcn/, function (req, res) {
  if (req.query.detailsaddressdecs == 'yes') {
    res.redirect('dwp-check-your-answers');
  }
   else if (req.query.detailsaddressdecs == 'no') {
   res.redirect('dwp-update-address-uc-decs');;
   }
 });

 

// Postcode route
router.get(/postcode-pcn-decs/, function (req, res) {
if (req.query.postcode == 'NE1 3JA') {
res.redirect('penalty-view-decs');
} else if (req.query.postcode == 'NE2 4XL') {
res.redirect('penalty-view-decs-copy');;
}
else {
res.redirect('unable-to-confirm-id');
}
});  


module.exports = router;