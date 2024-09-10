
describe('Testing THe API for Model', () => {

    let accessData;
       before(() => {
        cy.fixture("testData").then((data)=> {
                accessData=data;
            })
            
     
    })

    it('Should fail to add a model with missing owner', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/models',
        headers:{},
        qs:{},
        body: {
          "name": accessData.name, // name is present but Owner is missing
        },
        failOnStatusCode: false // Prevent Cypress from failing the test automatically
      }).then((response) => {
        expect(response.status).to.eq(422); 
      });
    });

    it('Should fail to add a model with missing name', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/models',
        headers:{},
        qs:{},
        body: {
          "owner": accessData.owner,  // owner is present but Name is missing
        },
        failOnStatusCode: false // Prevent Cypress from failing the test automatically
      }).then((response) => {
        expect(response.status).to.eq(422); 
      });
    });


    it('Should add a new model with Valid name and Owner', () => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/models',
          headers:{},
          qs:{},
          body: {
            "name": accessData.model.name,
            "owner": accessData.model.owner
          }
        }).then((response) => {
          expect(response.status).to.eq(200);

          // Verifying the data
          expect(response.body.name).to.eq(accessData.model.name);
          expect(response.body.owner).to.eq(accessData.model.owner);

          // Saving the response in JSON file for future Use
          cy.writeFile("cypress\\fixtures\\results\\modelAPI.json",response)

          // Saving the modelID for future use
          const modelId = response.body.id;
          Cypress.env('modelId', modelId);  
        });
      });

      it('Gettings the Data for Models', () => {
        cy.request({
            method:'GET',
            url:'http://localhost:8000/models',
            headers:{},
            qs:{},
            body:{}
        })
        .then((response) => {
            cy.log(response.body)
            expect(response.status).to.eq(200)
            // Verifying the proper data are present or not
            expect(response.body[0].name).to.eq(accessData.model.name);
            expect(response.body[0].owner).to.eq(accessData.model.owner);
     
        });
     
    });

    it('Deleting the data from Model', () => {
      const modelId = Cypress.env('modelId');  // Retrieve modelId from previous test cases
      cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/models/${modelId}`, 
      }).then((response) => {
        expect(response.status).to.eq(200); 
      });
    });
  
   
});

