import { DisredClient } from ".."

describe('DiSred Client Unit Testing', () => {

    const connectionURL = "http://localhost:9090?dbname=mydb"
    const client = new DisredClient(connectionURL);

    describe("Get All Data", () => {

        it("Should return all available data", async () => {
            const data = await client.get_all();
            expect(data).toEqual({});
        })

    })

})