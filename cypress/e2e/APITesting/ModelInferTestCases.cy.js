

describe('Testing THe API for Model Version Infer', () => {

    let accessData;
       before(() => {
        cy.fixture("testData").then((data)=> {
                accessData=data;
            })
            
     
    })


    it('Gettings Model ID to for future test Cases', () => {
      cy.request({
        method: 'POST',
        url: `/models/`,
        headers:{},
        qs:{},
        body: {
          "name": accessData.modelinfer.modelname,
          "owner": accessData.modelinfer.owner
        }
      }).then((response) => {
        expect(response.status).to.eq(200);

        // Verifying the data
        expect(response.body.name).to.eq(accessData.modelinfer.modelname);
        expect(response.body.owner).to.eq(accessData.modelinfer.owner);


        // Saving the modelID for future use
        const modelId = response.body.id;
        Cypress.env('modelId', modelId);  
      });
    });


    it('Gettings Model Version ID to for future test Cases', () => {
      const modelId = Cypress.env('modelId'); 
      cy.request({
        method: 'POST',
        url: `/models/${modelId}/versions`, 
        headers:{},
        qs:{},
        body: {
          "name":  accessData.modelinfer.name,
          "hugging_face_model":  accessData.modelinfer.hugging_face_model, // hugging_face_model is present but name is missing
        },
        }).then((response) => {
        expect(response.status).to.eq(200);

        // Verifying the data
        expect(response.body.name).to.eq(accessData.modelinfer.name);
        expect(response.body.hugging_face_model).to.eq(accessData.modelinfer.hugging_face_model);

        // Saving the modelID for future use
        const modelVersionId = response.body.id;
        Cypress.env('modelVersionId', modelVersionId);
        });
    });


    it('Adding the data for Model Version Infer', () => {
      const modelId = Cypress.env('modelId');  // Retrieve modelId from previous test cases
      const modelVersionId = Cypress.env('modelVersionId');
      cy.request({
        method: 'POST',
        url: `/models/${modelId}/versions/${modelVersionId}/infer`, 
        headers:{},
        qs:{},
        body: {
            "text": accessData.modelinfer.text, 
            "apply_template": false,
            "max_new_tokens": 256,
            "do_sample": true,
            "temperature": 0.7,
            "top_k": 50,
            "top_p": 0.95
        },
      }).then((response) => {
        expect(response.status).to.eq(200); 
      });
    });


    it('Deleting the data from Model Version', () => {
      const modelId = Cypress.env('modelId');  // Retrieve modelId from previous test cases
      const modelVersionId = Cypress.env('modelVersionId');
      cy.request({
        method: 'DELETE',
        url: `/models/${modelId}/versions/${modelVersionId}`, 
      }).then((response) => {
        expect(response.status).to.eq(200); 
      });
    });


    it('Deleting the data from Model', () => {
      const modelId = Cypress.env('modelId');  // Retrieve modelId from previous test cases
      cy.request({
        method: 'DELETE',
        url: `/models/${modelId}`, 
      }).then((response) => {
        expect(response.status).to.eq(200); 
      });
    });


});

