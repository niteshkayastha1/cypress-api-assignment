

describe('Testing THe API for Model Version', () => {

    let accessData;
       before(() => {
        cy.fixture("testData").then((data)=> {
                accessData=data;
            })
            
     
    })


    it('Gettings Model ID to for future test Cases', () => {
      cy.request({
        method: 'POST',
        url: '/models',
        headers:{},
        qs:{},
        body: {
          "name": accessData.modelVersion.modelname,
          "owner": accessData.modelVersion.owner
        }
      }).then((response) => {
        expect(response.status).to.eq(200);

        // Verifying the data
        expect(response.body.name).to.eq(accessData.modelVersion.modelname);
        expect(response.body.owner).to.eq(accessData.modelVersion.owner);

        // Saving the response in JSON file for future Use
        cy.writeFile("cypress\\fixtures\\results\\modelVersionAPI.json",response)

        // Saving the modelID for future use
        const modelId = response.body.id;
        Cypress.env('modelId', modelId);  
      });
    });


  
    it('Should fail to add a model Version with missing name', () => {
      const modelId = Cypress.env('modelId'); 
      cy.request({
        method: 'POST',
        url: `/models/${modelId}/versions`, 
        headers:{},
        qs:{},
        body: {
          "name":  accessData.modelVersion.name, // name is present but hugging_face_model is missing
        },
        failOnStatusCode: false // Prevent Cypress from failing the test automatically
      }).then((response) => {
        expect(response.status).to.eq(422); 
      });
    });

    it('Should fail to add a model Version with missing hugging_face_model', () => {
      const modelId = Cypress.env('modelId'); 
      cy.request({
        method: 'POST',
        url: `/models/${modelId}/versions`, 
        headers:{},
        qs:{},
        body: {
          "hugging_face_model":  accessData.modelVersion.hugging_face_model, // hugging_face_model is present but name is missing
        },
        failOnStatusCode: false // Prevent Cypress from failing the test automatically
      }).then((response) => {
        expect(response.status).to.eq(422); 
      });
    });


    it('Should add a model Version with Valid name and hugging_face_model', () => {
      const modelId = Cypress.env('modelId'); 
      cy.request({
        method: 'POST',
        url: `/models/${modelId}/versions`, 
        headers:{},
        qs:{},
        body: {
          "name":  accessData.modelVersion.name,
          "hugging_face_model":  accessData.modelVersion.hugging_face_model, // hugging_face_model is present but name is missing
        },
        }).then((response) => {
        expect(response.status).to.eq(200);

        // Verifying the data
        expect(response.body.name).to.eq(accessData.modelVersion.name);
        expect(response.body.hugging_face_model).to.eq(accessData.modelVersion.hugging_face_model);

        // Saving the response in JSON file for future Use
        cy.writeFile("cypress\\fixtures\\results\\modelVersion2API.json",response)

        // Saving the modelID for future use
        const modelVersionId = response.body.id;
        Cypress.env('modelVersionId', modelVersionId);
        });
    });

    it('Gettings the Data for ModelVersion', () => {
      const modelId = Cypress.env('modelId'); 
      cy.request({
          method:'GET',
          url: `/models/${modelId}/versions`, 
          headers:{},
          qs:{},
          body:{}
        })
      .then((response) => {
          cy.log(response.body)
          expect(response.status).to.eq(200)
          // Verifying the proper data are present or not
          expect(response.body[0].name).to.eq(accessData.modelVersion.name);
          expect(response.body[0].hugging_face_model).to.eq(accessData.modelVersion.hugging_face_model);
   
        });
    });

    it('Deleting the data from Model', () => {
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

