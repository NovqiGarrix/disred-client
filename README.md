# DiSred - Key-Value Memory Database

## DiSred Client - Connect your Node.js Application to your beloved DiSred memory Database.

This repository is DiSred Client repository. This client is use to fetch your data in DiSred Database Server.

## How to use

```typescript
import { DisredClient } from "@novqigarrix/disred-client";

const connectionURL = "http://localhost:9090?dbname=your_db_name";
const client = new DisredClient(connectionURL);

(async function () {
  const alldata = await client.get_all();
  console.log(alldata);

  const data = await client.get("/key");
  console.log(data);
})();
```

## That's it

Hope you find it usefull. Happy Coding [^^]
